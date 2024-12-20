package phantom.books.finalProject.myPage.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.myPage.dto.Category;
import phantom.books.finalProject.myPage.dto.Preference;
import phantom.books.finalProject.myPage.service.MyPageService;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.query.dto.Query;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.dto.Review;

@SessionAttributes({ "loginMember" })
@Controller
@RequestMapping("myPage")
@RequiredArgsConstructor
@Slf4j
public class MyPageController {

	private final MyPageService service;

	/**
	 * 마이페이지 메인화면
	 * 
	 * @return
	 */
	@GetMapping("/index")
	public String myPage(HttpSession session, Model model) {
		Member loginMember = (Member) session.getAttribute("loginMember");

		if (loginMember == null) {
			return "redirect:/";
		}

		int memberNo = (loginMember.getMemberNo());

		// 선택한 카테고리 이름 가져오기
		List<Category> selectCategory = service.selectCategory(memberNo);
		// 선택한 취향 이름 가져오기
		List<Preference> selectPreference = service.selectPreference(memberNo);

		// 구매 내역 가져오기
		List<OrderBookDto> buyList = service.buyList(memberNo);

		// 내가 쓴 리뷰 목록 조회
		List<Review> writeReview = service.writeReview(memberNo);

		// 내가 찜한 목록 조회
		List<Book> wishList = service.wishList(memberNo);

		// 내 문의 목록 조회
		List<Query> queryList = service.queryList(memberNo);

		System.out.println(queryList);
		model.addAttribute("member", loginMember);
		model.addAttribute("category", selectCategory); // 카테고리 리스트
		model.addAttribute("preference", selectPreference); // 취향 리스트
		model.addAttribute("buyList", buyList); // 구매 내역
		model.addAttribute("writeReview", writeReview); // 리뷰 리스트
		model.addAttribute("wishList", wishList); // 찜 리스트
		model.addAttribute("queryList", queryList); // 문의 내역
		return "myPage/index";
	}

	/**
	 * 마이 페이지(내 주문 목록 페이지)
	 * 
	 * @return
	 */
	@GetMapping("myOrder")
	public String myOrder(HttpSession session, Model model, @RequestParam(value = "page", defaultValue = "1") int page) {
		Member loginMember = (Member) session.getAttribute("loginMember");

		if (loginMember == null) {
			return "redirect:/";
		}

		int memberNo = loginMember.getMemberNo();

		// 전체 구매 내역 가져오기
		List<OrderBookDto> allBuyList = service.buyList(memberNo);

		// totalPrice 합계 계산
		int totalPriceSum = 0;
		for (OrderBookDto order : allBuyList) {
			totalPriceSum += order.getTotalPrice();
		}

		// 페이징 처리
		int totalItems = allBuyList.size();
		int itemsPerPage = 8;
		int totalPages = (int) Math.ceil((double) totalItems / itemsPerPage);

		// 현재 페이지에 해당하는 아이템만 추출
		int start = (page - 1) * itemsPerPage;
		int end = Math.min(start + itemsPerPage, totalItems);
		List<OrderBookDto> pagedBuyList = allBuyList.subList(start, end);

		// 모델에 추가
		model.addAttribute("totalPriceSum", totalPriceSum);
		model.addAttribute("buyList", pagedBuyList);
		model.addAttribute("currentPage", page);
		model.addAttribute("totalPages", totalPages);

		return "myPage/myOrder";
	}

	/**
	 * 마이 페이지(내가 찜한 목록 페이지)
	 * 
	 * @return
	 */
	@GetMapping("myWishList")
	public String myWishList(HttpSession session, Model model,
			@RequestParam(value = "page", defaultValue = "1") int page) {
		Member loginMember = (Member) session.getAttribute("loginMember");

		if (loginMember == null) {
			return "redirect:/";
		}

		int memberNo = loginMember.getMemberNo();

		// 내가 찜한 목록 조회
		List<Book> wishList = service.wishList(memberNo);

		// 페이징 처리
		int totalItems = wishList.size();
		int itemsPerPage = 5;
		int totalPages = (int) Math.ceil((double) totalItems / itemsPerPage);

		// 현재 페이지에 해당하는 아이템만 추출
		int start = (page - 1) * itemsPerPage;
		int end = Math.min(start + itemsPerPage, totalItems);
		List<Book> pagedWishList = wishList.subList(start, end);

		model.addAttribute("wishList", pagedWishList);
		model.addAttribute("currentPage", page);
		model.addAttribute("totalPages", totalPages);

		return "myPage/myWishList";
	}

	/**
	 * 마이 페이지(내 리뷰 페이지)
	 * 
	 * @return
	 */
	@GetMapping("myReview")
	public String myReview(HttpSession session, Model model, @RequestParam(value = "page", defaultValue = "1") int page) {
		Member loginMember = (Member) session.getAttribute("loginMember");

		if (loginMember == null) {
			return "redirect:/";
		}

		int memberNo = loginMember.getMemberNo();

		// 내가 쓴 리뷰 목록 조회
		List<Review> writeReview = service.writeReview(memberNo);

		// 페이징 처리
		int totalItems = writeReview.size();
		int itemsPerPage = 4;
		int totalPages = (int) Math.ceil((double) totalItems / itemsPerPage);

		// 현재 페이지에 해당하는 아이템만 추출
		int start = (page - 1) * itemsPerPage;
		int end = Math.min(start + itemsPerPage, totalItems);
		List<Review> pagedReview = writeReview.subList(start, end);

		model.addAttribute("writeReview", pagedReview);
		model.addAttribute("currentPage", page);
		model.addAttribute("totalPages", totalPages);

		return "myPage/myReview";
	}

	/**
	 * 비밀번호 확인
	 * 
	 * @param request
	 * @param loginMember
	 * @param session
	 * @return
	 */
	@PostMapping("/checkPassword")
	@ResponseBody
	public ResponseEntity<?> checkPassword(@RequestBody Map<String, String> request,
			@SessionAttribute("loginMember") Member loginMember, HttpSession session) {

		String password = request.get("password");

		if (service.checkPassword(loginMember.getMemberNo(), password)) {
			session.setAttribute("passwordChecked", true);

			return ResponseEntity.ok().build();
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

	/**
	 * 비밀번호 확인 페이지
	 * 
	 * @return
	 */
	@GetMapping("checkPw")
	public String checkPw() {
		return "myPage/checkPw";
	}

	/**
	 * 마이페이지(내정보 페이지) 조회 / 변경
	 * 
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("info")
	public String info(@SessionAttribute("loginMember") Member loginMember,
			@SessionAttribute(value = "passwordChecked", required = false) Boolean passwordChecked, Model model) {

		// 비밀번호 확인
		if (passwordChecked == null || !passwordChecked) {
			return "redirect:/myPage/checkPw";
		}

		// 생년월일 데이터 가공
		if (loginMember.getBirthDate() != null) {
			loginMember.setBirthDate(formatBirthDate(loginMember.getBirthDate()));
		}

		model.addAttribute("loginMember", loginMember);
		return "myPage/info";
	}

	// 생년월일 변환 메서드
	private String formatBirthDate(String birthDate) {
		// '1992년 04월 05일' -> '19920405'
		if (birthDate == null) {
			return ""; // 기본값
		}
		return birthDate.replaceAll("[년월일\\s]", "");
	}

	@PostMapping("changeInfo")
	public String changeInfo(
			@ModelAttribute Member inputMember, 
			@SessionAttribute("loginMember") Member loginMember,
			HttpSession session,
			Model model, 
			RedirectAttributes ra) {

		// 현재 로그인된 회원의 번호를 입력된 정보에 세팅
		inputMember.setMemberNo(loginMember.getMemberNo());

		log.debug("inputMember: {}", inputMember);

		// 서비스 호출 후 업데이트된 회원 정보 반환 받기
		Member updateMember = service.changeInfo(inputMember);

		log.debug("updateMember: {}", updateMember);

		// 업데이트된 회원 정보를 모델에 추가
		if (updateMember != null) { // 성공
			// 생년월일 데이터 가공
			String birthDate = updateMember.getBirthDate();
			if (birthDate != null) {
				updateMember.setBirthDate(formatBirthDate(birthDate));
			} else {
				updateMember.setBirthDate(""); // null일 경우 기본값 설정
			}

      // 세션에 최신화된 회원 정보 저장
			session.setAttribute("loginMember", updateMember);
			log.debug("Updated session loginMember: {}", session.getAttribute("loginMember"));

      
			// 모델에 최신화된 회원 정보 추가
			model.addAttribute("loginMember", updateMember);
			ra.addFlashAttribute("message", "회원 정보가 수정되었습니다.");
			
		} else { // 실패
			ra.addFlashAttribute("message", "회원 정보 수정 실패");
		}
			
		return "redirect:/myPage/info";
	}

	/**
	 * 마이페이지(비밀번호 변경 페이지)
	 * 
	 * @param loginMember
	 * @return
	 */
	@GetMapping("changePw")
	public String changePw(@SessionAttribute("loginMember") Member loginMember) {
		return "myPage/changePw";
	}

	@PostMapping("checkTelNo")
	public ResponseEntity<Map<String, String>> checkTelNo(@RequestParam("telNo") String telNo,
			@SessionAttribute("loginMember") Member loginMember) {

		log.debug("telNo: {}", telNo);
		log.debug("logintelNo: {}", loginMember.getTelNo());

		Map<String, String> response = new HashMap<>();

		// 로그인된 회원의 전화번호와 입력된 전화번호 비교
		if (!loginMember.getTelNo().equals(telNo)) {
			response.put("status", "error");
			return ResponseEntity.ok(response);
		}

		response.put("status", "success");
		return ResponseEntity.ok(response);
	}

	@PostMapping("changePw")
	public ResponseEntity<Map<String, String>> changePw(@RequestParam("currentPw") String currentPw,
			@RequestParam("memberPw") String newPw, @SessionAttribute("loginMember") Member loginMember) {
		Map<String, String> response = new HashMap<>();

		// 서비스 호출
		int result = service.changePassword(currentPw, newPw, loginMember);

		// 결과에 따른 응답 처리
		switch (result) {
		case 1:
			response.put("status", "fail");
			response.put("message", "현재 비밀번호가 일치하지 않습니다.");
			response.put("type", "1");
			break;
		case 2:
			response.put("status", "fail");
			response.put("message", "새 비밀번호는 현재 비밀번호와 다르게 설정해주세요.");
			response.put("type", "2");
			break;
		case 3:
			response.put("status", "success");
			response.put("message", "비밀번호 변경이 완료되었습니다.");
			break;
		default:
			response.put("status", "fail");
			response.put("message", "오류가 발생했습니다.");
			break;
		}

		return ResponseEntity.ok(response);
	}

	/**
	 * 마이페이지(내 취향 페이지)
	 * 
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("preference")
	public String preference(Model model) {
		// 전체 카테고리와 취향 각각 조회
		List<Category> categoryList = service.getCategories();
		List<Preference> preferenceList = service.getPreference();

		System.out.println("Categories: " + categoryList);
		System.out.println("Preferences: " + preferenceList);

		// 모델에 데이터 추가
		model.addAttribute("categoryList", categoryList);
		model.addAttribute("preferenceList", preferenceList);
		return "myPage/preference";
	}

	/**
	 * 선호 카테고리 저장
	 * 
	 * @param category
	 * @param loginMember
	 * @return
	 */
	@PostMapping("saveCategory")
	public ResponseEntity<?> saveCategory(@RequestBody List<Integer> category,
			@SessionAttribute("loginMember") Member loginMember) {

		service.saveCategory(loginMember.getMemberNo(), loginMember.getCategoryYn(), category);
		return ResponseEntity.ok("Success");
	}

	/** 선호 취향 저장 */
	@PostMapping("savePreference")
	public ResponseEntity<?> savePreference(@RequestBody List<Integer> preference,
			@SessionAttribute("loginMember") Member loginMember) {

		service.savePreference(loginMember.getMemberNo(), loginMember.getCategoryYn(), preference);
		return ResponseEntity.ok("Success");
	}

	/** 선호 카테고리 불러오기 */
	@GetMapping("loadCategory")
	public ResponseEntity<List<Category>> loadCategory(@SessionAttribute("loginMember") Member loginMember) {
		List<Category> category = service.getCategoryByMemberId(loginMember.getMemberNo());
		System.out.println(category);
		return ResponseEntity.ok(category);
	}

	/** 선호 취향 불러오기 */
	@GetMapping("loadPreference")
	@ResponseBody
	public ResponseEntity<List<Preference>> loadPreference(@SessionAttribute("loginMember") Member loginMember) {
		List<Preference> preference = service.getPreferenceByMemberId(loginMember.getMemberNo());
		System.out.println(preference);
		return ResponseEntity.ok(preference);
	}

	/** 회원 탈퇴 페이지 */
	@GetMapping("withdrawal")
	public String withdrawal() {
		return "myPage/withdrawal";
	}
	
	/** 회원 탈퇴 처리 */
	@PostMapping("withdrawalProcess")
	@ResponseBody
	public ResponseEntity<?> processWithdrawal(
	        @RequestBody Map<String, String> request,
	        @SessionAttribute("loginMember") Member loginMember) {
	    
	    try {
	        // 비밀번호 확인 및 탈퇴 처리
	        boolean result = service.withdrawMember(
	            loginMember.getMemberNo(), 
	            request.get("password")
	        );
	        
	        if (result) {
	            return ResponseEntity.ok().build();
	        } else {
	            return ResponseEntity.badRequest().body("비밀번호가 일치하지 않습니다.");
	        }
	        
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                           .body("탈퇴 처리 중 오류가 발생했습니다.");
	    }
	}
}

