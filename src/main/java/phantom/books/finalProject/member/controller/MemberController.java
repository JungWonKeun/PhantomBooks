package phantom.books.finalProject.member.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.exception.NurigoUnknownException;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.service.DefaultMessageService;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.member.service.MemberService;

@SessionAttributes({ "loginMember" })
@Controller
@RequestMapping("member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

	private final MemberService service;
	private final Map<String, String> verificationCodes = new HashMap<>(); // 전화번호별로 인증 코드를 저장하기 위한 맵
	private final Map<String, Long> verificationTimestamps = new HashMap<>(); // 전화번호별 인증 코드 발송 시간을 저장하기 위한 맵
	private static final long CODE_VALIDITY_PERIOD = 3 * 60 * 1000; // 3분 동안 인증 코드 유효 (밀리초 단위)

	// CoolSMS API 정보
	@Value("${coolsms.api.key}")
	private String apiKey;

	// CoolSMS API 정보
	@Value("${coolsms.api.secret}")
	private String apiSecret;

	// CoolSMS API 정보
	@Value("${coolsms.api.url}")
	private String apiUrl;

	// CoolSMS API 정보
	@Value("${coolsms.sender.number}")
	private String senderNumber;

	/**
	 * 로그인 모달로 로그인 처리
	 * 
	 * @param memberId
	 * @param memberPw
	 * @param model
	 * @param ra
	 * @param session
	 * @return 성공 시 비동기로 로그인 후 모달 창 삭제, 실패 시 메세지 출력 후 로그인 모달 유지
	 */
	@PostMapping("login")
	@ResponseBody
	public ResponseEntity<?> login(@RequestParam("memberId") String memberId, @RequestParam("memberPw") String memberPw,
			HttpSession session) {
		Member loginMember = service.login(memberId, memberPw);

		if (loginMember == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("{\"error\": \"Invalid credentials\"}");
		} else {
			session.setAttribute("loginMember", loginMember); // 로그인 성공 시 세션에 사용자 정보 저장
			return ResponseEntity.ok(loginMember);
		}
	}

	@PutMapping("/updateCategoryYn")
	@ResponseBody
	public ResponseEntity<String> updateCategoryYn(HttpSession session) {
		Member loginMember = (Member) session.getAttribute("loginMember");

		if (loginMember != null) {
			loginMember.setCategoryYn("Y");
			service.updateCategoryYn(loginMember.getMemberNo());
			session.setAttribute("loginMember", loginMember);
			return ResponseEntity.ok("success");
		}

		return ResponseEntity.badRequest().body("로그인 정보가 없습니다.");
	}

	@GetMapping("logout")
	public String logout(SessionStatus status, HttpSession session) {
		status.setComplete(); // @SessionAttributes 관리 데이터 삭제

		if (session != null) {
			session.removeAttribute("passwordChecked"); // passwordChecked 속성 삭제
			session.invalidate(); // 전체 세션 무효화
		}

		return "redirect:/"; // 홈 페이지로 리다이렉트
	}

	@ResponseBody
	@DeleteMapping("/deleteWishlist")
	public ResponseEntity<String> deleteWishlist(@SessionAttribute("loginMember") Member loginMember,
			@RequestBody List<Integer> bookNoList) {

		Integer memberNo = loginMember.getMemberNo();

		if (memberNo == null || bookNoList == null || bookNoList.isEmpty()) {
			return ResponseEntity.badRequest().body("Invalid request");
		}

		service.deleteWishlist(memberNo, bookNoList);
		return ResponseEntity.ok("Wishlist items deleted successfully");
	}

	/**
	 * 회원 가입 페이지 전환
	 * 
	 * @return 회원 가입 페이지
	 */
	@GetMapping("/signUp")
	public String signUp() {
		return "member/signUp"; // 회원가입 페이지로 이동
	}

	/**
	 * 회원 가입 수행
	 * 
	 * @param inputMember : 입력값이 저장된 Member 객체(커맨드 객체)
	 * @param ra          : 리다이렉트 시 request scope로 값 전달
	 * @return
	 */
	@PostMapping("signUp")
	public String signUp(@ModelAttribute Member inputMember, RedirectAttributes ra) {

		// 회원가입 데이터 검사
		log.debug("회원가입 데이터 검사 : {}", inputMember);

		if (inputMember.getMemberPw() == null || inputMember.getMemberPw().isEmpty()) {
			throw new IllegalArgumentException("Password cannot be null or empty");
		}
		// 회원 가입 서비스 호출
		int result = service.signUp(inputMember);

		// 서비스 결과에 따라 응답 제어
		String path = null;
		String message = null;

		if (result > 0) {
			path = "/?showLoginModal=true";
			message = inputMember.getName() + "님의 가입을 환영합니다😜";
		} else {
			path = "signUp";
			message = "회원 가입 실패...";
		}
		ra.addFlashAttribute("message", message);
		return "redirect:" + path;

	}

	/**
	 * 아이디 중복 검사
	 * 
	 * @param memberId
	 * @return 0 : 아이디 중복 없음, 1 : 아이디 중복
	 */
	@ResponseBody
	@PostMapping("idCheck")
	public int idCheck(@RequestBody Map<String, String> request) {
		String memberId = request.get("memberId");
		return service.idCheck(memberId);
	}

	
	 // 임시로 인증 성공시키기 // 전화번호 인증 코드 요청	 
	 @PostMapping("/temporaryVerification") 
	 public ResponseEntity<Map<String, String>> temporaryVerification(@RequestParam("telNo") String telNo) { // 4자리 인증코드 생성 
	 String verificationCode = String.valueOf((int) ((Math.random() * 9000) + 1000)); // 1000~9999 사이의 랜덤 숫자 생성 
	 Map<String, String> response = new
	 HashMap<>(); response.put("status", "success");
	 response.put("verificationCode", verificationCode); 
	 response.put("telNo", telNo); 
	 log.debug("verificationCode: {}", verificationCode);
	 log.debug("telNo: {}", telNo);
	 
	 // 전화번호와 인증 코드 저장 
	 verificationCodes.put(telNo, verificationCode); // 전화번호와 인증 코드 저장 
	 verificationTimestamps.put(telNo, System.currentTimeMillis()); // 인증 코드 발송 시간 저장
	 
	 return ResponseEntity.ok(response);	 
	 }
	 

	@PostMapping("/requestVerification")
	public ResponseEntity<Map<String, String>> requestVerification(@RequestParam("telNo") String telNo) {
	    Map<String, String> response = new HashMap<>();
	    
	    try {
	        // 4자리 인증 코드 생성
	        String verificationCode = String.valueOf((int) ((Math.random() * 9000) + 1000));

	        // CoolSMS SDK 초기화
	        DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, apiUrl);

	        // 메시지 구성
	        Message message = new Message();
	        message.setFrom(senderNumber);
	        message.setTo(telNo);
	        message.setText("인증 코드: " + verificationCode);

	        // SMS 발송 요청
	        messageService.send(message);

	        // 인증 코드 및 발송 시간 저장
	        verificationCodes.put(telNo, verificationCode);
	        verificationTimestamps.put(telNo, System.currentTimeMillis());

	        response.put("status", "success");
	        response.put("message", "인증 코드가 발송되었습니다.");
	        return ResponseEntity.ok(response);

	    } catch (NurigoUnknownException e) {
	        System.out.println("CoolSMS 오류: " + e.getMessage());
	        response.put("status", "error");
	        response.put("message", "IP가 허용되지 않았습니다.");
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	        
	    } catch (NurigoMessageNotReceivedException exception) {
	        System.out.println("Failed Messages: " + exception.getFailedMessageList());
	        System.out.println("Error: " + exception.getMessage());
	        response.put("status", "error");
	        response.put("message", "인증 코드 발송에 실패했습니다.");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	        
	    } catch (Exception e) {
	        e.printStackTrace();
	        response.put("status", "error");
	        response.put("message", "인증 코드 발송에 실패했습니다.");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
	    }
	}

	
	@PostMapping("/verifyCode")
	public ResponseEntity<Map<String, String>> verifyCode(@RequestParam("telNo") String telNo, @RequestParam("code") String code) {
	    Map<String, String> response = new HashMap<>();
	    String storedCode = verificationCodes.get(telNo);
	    Long timestamp = verificationTimestamps.get(telNo);

	    log.atInfo().log("telNo: {}, code: {}, storedCode: {}, timestamp: {}", telNo, code, storedCode, timestamp);

	    // 유효 시간 확인
	    if (timestamp != null && (System.currentTimeMillis() - timestamp > CODE_VALIDITY_PERIOD)) {
	        verificationCodes.remove(telNo);
	        verificationTimestamps.remove(telNo);
	        response.put("status", "error");
	        response.put("message", "인증 코드가 만료되었습니다.");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }

	    if (storedCode != null && storedCode.equals(code)) {
	        verificationCodes.remove(telNo);
	        verificationTimestamps.remove(telNo);
	        response.put("status", "success");
	        response.put("message", "인증이 완료되었습니다.");
	        return ResponseEntity.ok(response);
	    } else {
	        response.put("status", "error");
	        response.put("message", "인증 코드가 일치하지 않습니다.");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
	    }
	}

	/**
	 * 아이디/비밀번호 찾기 페이지
	 * 
	 * @return
	 */
	@GetMapping("/findId")
	public String findId() {
		return "member/findId";
	}

	/**
	 * 전화번호로 아이디 찾기
	 * 
	 * @param telNo
	 * @return
	 */
	@PostMapping("/findId")
	@ResponseBody
	public ResponseEntity<Map<String, Object>> findIdByTelNo(@RequestParam("telNo") String telNo) {
	    Map<String, Object> response = new HashMap<>();
	    List<String> memberIds = service.findIdByTelNo(telNo);
	    
	    if (memberIds == null || memberIds.isEmpty()) {
	        response.put("status", "fail");
	        response.put("message", "해당 전화번호로 등록된 아이디가 없습니다.");
	        return ResponseEntity.ok(response);
	    }
	    
	    response.put("status", "success");
	    response.put("data", memberIds);
	    response.put("message", "아이디 찾기에 성공했습니다.");
	    return ResponseEntity.ok(response);
	}

	/**
	 * 아이디와 전화번호가 일치하는 회원 찾기
	 * 
	 * @param telNo
	 * @param memberId
	 * @return
	 */
	@PostMapping("/checkIdAndTel")
	@ResponseBody // JSON 응답을 위해 필요
	public ResponseEntity<Map<String, String>> checkIdAndTel(@RequestParam("verifiedTelNo") String telNo,
			@RequestParam("memberId") String memberId) {

		service.checkIdAndTel(telNo, memberId);

		// 성공시 다음 단계로 진행하도록 응답
		Map<String, String> response = new HashMap<>();
		response.put("status", "success");
		response.put("message", memberId + "회원님 새로운 비밀번호를 입력해주세요");
		return ResponseEntity.ok(response);
	}

	/**
	 * 비밀번호 변경
	 * 
	 * @param memberId
	 * @param memberPw
	 * @return
	 */
	@PostMapping("/changePw")
	@ResponseBody
	public ResponseEntity<Map<String, String>> changePw(@RequestParam("memberId") String memberId,
			@RequestParam("memberPw") String memberPw) {

		log.debug("memberId: {}", memberId);
		log.debug("memberPw: {}", memberPw);

		Map<String, String> response = new HashMap<>();

		service.updatePassword(memberId, memberPw);
		response.put("status", "success");
		response.put("message", memberId + "회원님 비밀번호 변경이 완료되었습니다.");
		return ResponseEntity.ok(response);
	}
	
	

}
