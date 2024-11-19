package phantom.books.finalProject.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
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
	private static final long CODE_VALIDITY_PERIOD = 5 * 60 * 1000; // 5분 동안 인증 코드 유효 (밀리초 단위)

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
	

	// 로그아웃 처리
	@GetMapping("logout")
	public String logout(SessionStatus status) {
		status.setComplete(); // 세션 종료
		return "redirect:/"; // 홈 페이지로 리다이렉트
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

	// 임시로 인증 성공시키기
	// 전화번호 인증 코드 요청
	@PostMapping("/requestVerification")
	public ResponseEntity<Map<String, String>> requestVerification(@RequestParam("telNo") String telNo) {
		// 4자리 인증 코드 생성
		String verificationCode = String.valueOf((int) ((Math.random() * 9000) + 1000)); // 1000~9999 사이의 랜덤 숫자 생성
		Map<String, String> response = new HashMap<>();
		response.put("status", "success");
		response.put("verificationCode", verificationCode);

		// 전화번호와 인증 코드 저장
		verificationCodes.put(telNo, verificationCode); // 전화번호와 인증 코드 저장
		verificationTimestamps.put(telNo, System.currentTimeMillis()); // 인증 코드 발송 시간 저장

		return ResponseEntity.ok(response);
		/*
		 * // 전화번호 인증 코드 요청
		 * 
		 * @PostMapping("/requestVerification") public ResponseEntity<String>
		 * requestVerification(@RequestParam("telNo") String telNo) { // 4자리 인증 코드 생성
		 * String verificationCode = String.valueOf((int) ((Math.random() * 9000) +
		 * 1000)); // 1000~9999 사이의 랜덤 숫자 생성 // CoolSMS SDK를 사용해 인증 코드 발송 try {
		 * DefaultMessageService messageService = NurigoApp.INSTANCE.initialize(apiKey,
		 * apiSecret, apiUrl);
		 * 
		 * Message message = new Message(); message.setFrom(senderNumber); // 발신자 번호
		 * (CoolSMS 계정에 등록된 번호여야 함) message.setTo(telNo); // 수신자 번호
		 * message.setText("인증 코드: " + verificationCode); // 인증 코드 메시지
		 * 
		 * messageService.send(message); // SMS 발송 요청
		 * 
		 * verificationCodes.put(telNo, verificationCode); // 전화번호와 인증 코드 저장
		 * verificationTimestamps.put(telNo, System.currentTimeMillis()); // 인증 코드 발송 시간
		 * 저장 return ResponseEntity.ok("인증 코드가 발송되었습니다."); } catch
		 * (NurigoMessageNotReceivedException exception) { // 발송 실패한 메시지 처리
		 * System.out.println(exception.getFailedMessageList());
		 * System.out.println(exception.getMessage()); return
		 * ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).
		 * body("인증 코드 발송에 실패했습니다."); } catch (Exception e) { e.printStackTrace(); // 기타
		 * 오류 로그 출력 return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).
		 * body("인증 코드 발송에 실패했습니다."); }
		 */
	}

	// 인증 코드 확인
	@PostMapping("/verifyCode")
	public ResponseEntity<String> verifyCode(@RequestParam("telNo") String telNo, @RequestParam("code") String code) {
		String storedCode = verificationCodes.get(telNo); // 저장된 인증 코드 가져오기
		Long timestamp = verificationTimestamps.get(telNo); // 저장된 발송 시간 가져오기

		// 유효 시간 확인
		if (timestamp != null && (System.currentTimeMillis() - timestamp > CODE_VALIDITY_PERIOD)) {
			verificationCodes.remove(telNo); // 유효 시간이 지난 인증 코드는 제거
			verificationTimestamps.remove(telNo); // 발송 시간 정보도 제거
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증 코드가 만료되었습니다.");
		}

		if (storedCode != null && storedCode.equals(code)) {
			verificationCodes.remove(telNo); // 인증 완료 후 코드 제거
			verificationTimestamps.remove(telNo); // 인증 시간 제거
			return ResponseEntity.ok("인증 성공");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증 코드가 일치하지 않습니다.");
		}
	}

}
