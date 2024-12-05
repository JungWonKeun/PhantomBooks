package phantom.books.finalProject.searchBookPage.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.cart.dto.CartDto;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.dto.Review;
import phantom.books.finalProject.searchBookPage.service.SearchBookPageService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@RequiredArgsConstructor
@RequestMapping("searchBookPage")
@Slf4j
public class SearchBookPageController {

	private final SearchBookPageService service;

	@GetMapping("/searchBooks")
	public String searchBooks(@RequestParam(value = "searchTitle", required = false) String searchTitle,
			@RequestParam(value = "categories", required = false) int[] categories,
			@RequestParam(value = "preferences", required = false) int[] preferences,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "sortOption", required = false) String sortOption,
			@SessionAttribute(value = "loginMember", required = false) Member loginMember,
			Model model) {
		
		if(loginMember != null) {
			int memberNo = loginMember.getMemberNo();
			List<Integer> wishList = service.getWishList(memberNo);
	        model.addAttribute("wishList", wishList);
	        log.debug("wishList: {}", wishList);
		}
		
		// categories와 preferences는 int[]로 받았으므로, 바로 사용 가능
		// 원하는 작업을 처리합니다.

		log.debug("searchTitle: {}", searchTitle);
		log.debug("categories: {}", Arrays.toString(categories)); // int[]을 배열로 출력
		log.debug("preferences: {}", Arrays.toString(preferences)); // int[]을 배열로 출력
		log.debug("sortOption: {}", sortOption);
		// 서비스 호출
		Map<String, Object> map = service.searchBooks(searchTitle, categories, preferences, cp, sortOption);

		log.debug("sortOption: {}", sortOption);
		// 모델에 데이터 추가
		model.addAttribute("bookList", map.get("bookList"));
		model.addAttribute("pagination", map.get("pagination"));
		model.addAttribute("totalCount", map.get("totalCount"));
		

		return "searchBookPage/searchBook";
	}

	/*
	 * @GetMapping("/searchBooks") public String searchBooks(
	 * 
	 * @RequestParam(value = "query", required = false) String query,
	 * 
	 * @RequestParam(value = "sortOption", required = false) List<preference>
	 * sortOption,
	 * 
	 * @RequestParam("cp") int cp, Model model) {
	 * 
	 * return "searchBookPage/searchBook"; // 결과를 보여줄 Thymeleaf 템플릿 }
	 */

	/*
	 * @GetMapping("/searchBooks") public String searchBooks(
	 * 
	 * @RequestParam(value = "query", required = false) String query,
	 * 
	 * @equestParam(value = "sortOption", required = false) String sortOption,
	 * 
	 * @RequestParam("cp") int cp, Model model) { List<Book> books; if ((query ==
	 * null || query.trim().isEmpty()) && (sortOption == null ||
	 * sortOption.isEmpty())) { // 검색어와 정렬 옵션이 모두 없으면 전체 책 조회 books =
	 * service.allBook(cp); } else { // 검색어 또는 정렬 옵션이 있는 경우 검색 수행 books =
	 * service.searchBooks(query, sortOption, cp); } model.addAttribute("allBook",
	 * books); return "searchBookPage/searchBook"; // 결과를 보여줄 Thymeleaf 템플릿 }
	 */

// 상세조회
	@GetMapping("/bookDetail/{bookNo}")
	public String bookDetail(Model model, @PathVariable("bookNo") int bookNo,
			@SessionAttribute(value = "loginMember", required = false) Member loginMember,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		if (loginMember != null) {
			model.addAttribute("memberId", loginMember.getMemberId());
			
			
		}

		// 책 정보 가져오기
		Book book = service.bookDetail(bookNo);
		model.addAttribute("book", book);

		// 리뷰/페이지네이션 가져오기
		Map<String, Object> map = service.getReviewsByBookNo(bookNo, cp);

		List<Review> reviews = (List<Review>) map.get("reviewList");
		Pagination pagination = (Pagination) map.get("pagination");

		model.addAttribute("reviews", reviews);
		model.addAttribute("pagination", pagination);
		model.addAttribute("currentPage", cp);
		
		return "searchBookPage/bookDetail";
	}

	// 선택한 책을 장바구니에 담기
	@ResponseBody
	@PutMapping("/addCart")
	public String addCart(@RequestBody Map<String, List<Integer>> paramMap,
			@SessionAttribute("loginMember") Member loginMember) {

		int memberNo = loginMember.getMemberNo();

		log.debug("memberNo : {}", memberNo);
		log.debug("paramMap: {}", paramMap);
		List<Integer> bookNo = paramMap.get("bookNo");
		/*
		 * log.debug("books: {}", books); log.debug("books.get(0): {}", books.get(0));
		 * log.debug("books.get(1): {}", books.get(1));
		 */

		Map<String, Object> map = Map.of("bookNo", bookNo, "memberNo", memberNo);

//		  map.put("memberNo", (Integer)loginMember.getMemberNo());
//		  log.debug("map: {}", map);
		int addCart = service.putCart(map);

		String message = null;

		if (addCart > 0)
			message = "추가 성공";

		return "redirect:/searchBookPage/searchBooks";
	}

	// 검색페이지에서 장바구니
	@ResponseBody
	@PutMapping("/singleCart")
	public String singleCart(@SessionAttribute("loginMember") Member loginMember,
			@RequestBody Map<String, Object> requestData) {

		int memberNo = loginMember.getMemberNo();
		int bookNo = (int) requestData.get("bookNo");

		log.debug("memberNo : {}", memberNo);
		log.debug("bookNo : {}", bookNo);

		int addCart = service.putSingleCart(memberNo, bookNo);

		String message = addCart > 0 ? "추가 성공" : "추가 실패";

		return message;
	}

	// 상세조회에서 장바구니 추가
	@ResponseBody
	@PutMapping("/detailCart")
	public String detailCart(@SessionAttribute("loginMember") Member loginMember,
			@RequestBody Map<String, Object> requestData) {
		int memberNo = loginMember.getMemberNo();
		int bookNo = (int) requestData.get("bookNo");

		log.debug("memberNo : {}", memberNo);
		log.debug("bookNo : {}", bookNo);

		int addCart = service.detailCart(memberNo, bookNo);

		String message = addCart > 0 ? "추가 성공" : "추가 실패";

		return message;
	}

	// 리뷰 작성

	@ResponseBody
	@PostMapping("/writeReview/{bookNo}")
	public boolean writeReview(@PathVariable("bookNo") int bookNo, // URL 경로에서 bookNo 가져오기
			@SessionAttribute("loginMember") Member loginMember, // 로그인한 사용자 정보
			@RequestParam("rating") double score, @RequestParam("title") String title,
			@RequestParam("content") String content,
			@RequestParam(value = "reviewImage", required = false) MultipartFile file, 
			RedirectAttributes ra) { 
		
		return service.writeReview(bookNo, title, content, score, loginMember.getMemberNo(), file);

	}

	// 리뷰 수정
	@ResponseBody
	@PostMapping("/updateReview/{reviewNo}")
	public String updateReview(@PathVariable("reviewNo") int reviewNo,
			@SessionAttribute("loginMember") Member loginMember, // 로그인한 사용자 정보
			@RequestParam("rating") double score, @RequestParam("reviewTitle") String title,
			@RequestParam("reviewContent") String content,
			@RequestParam(value = "image", required = false) MultipartFile file, 
			RedirectAttributes ra) {

		return service.updateReview(reviewNo, title, content, score, 
									loginMember.getMemberNo(), file);

	}

	// 리뷰 삭제
	@ResponseBody
	@DeleteMapping("/deleteReview")
	public int deleteReview(@RequestParam("reviewNo") int reviewNo) {

		return service.deleteReview(reviewNo);

	}

	@ResponseBody
	@GetMapping("/myCategoryBringingInBtn")
	public ResponseEntity<List<Integer>> myCategoryBringingIn(
			@SessionAttribute(name = "loginMember", required = false) Member loginMember) {

		if (loginMember == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		log.debug("Member number: {}", loginMember.getMemberNo());

		return service.myCategoryBringingIn(loginMember.getMemberNo());
	}

	@ResponseBody
	@GetMapping("/myPreferenceBringingInBtn")
	public ResponseEntity<List<Integer>> myPreferenceBringingIn(
			@SessionAttribute(name = "loginMember", required = false) Member loginMember) {

		if (loginMember == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		log.debug("Member number: {}", loginMember.getMemberNo());

		return service.myPreferenceBringingIn(loginMember.getMemberNo());
	}

	// 선택한 책을 찜 목록에 담기 기본틀 잡기 보고 수정
	/*
	 * @ResponseBody
	 * 
	 * @PutMapping("/addWishlist") public String addWishlist(@RequestBody
	 * Map<String, List<Integer>> paramMap,
	 * 
	 * @SessionAttribute("loginMember") Member loginMember) {
	 * 
	 * int memberNo = loginMember.getMemberNo();
	 * 
	 * log.debug("memberNo : {}", memberNo); log.debug("paramMap: {}", paramMap);
	 * List<Integer> bookNo = paramMap.get("bookNo");
	 * 
	 * Map<String, Object> map = Map.of("bookNo", bookNo, "memberNo", memberNo);
	 * 
	 * // 찜 목록에 추가하는 서비스 호출 int addWishlist = service.putWishlist(map);
	 * 
	 * String message = null;
	 * 
	 * if (addWishlist > 0) { message = "추가 성공"; }
	 * 
	 * return "redirect:/searchBookPage/searchBooks"; }
	 */
	
	@ResponseBody
	@PutMapping("/addWishlist")
	public Map<String, Object> addWishlist(@RequestBody Map<String, List<Integer>> paramMap,
	                                       @SessionAttribute("loginMember") Member loginMember) {
	    int memberNo = loginMember.getMemberNo();
	    List<Integer> bookNoList = paramMap.get("bookNo");

	    log.debug("memberNo : {}", memberNo);
	    log.debug("paramMap: {}", paramMap);

	    // 기존 찜 목록 조회
	    List<Integer> existingWishlist = service.getWishList(memberNo);

	    // 중복되지 않은 책 번호 필터링
	    List<Integer> booksToAdd = bookNoList.stream()
	                                         .filter(bookNo -> !existingWishlist.contains(bookNo))
	                                         .collect(Collectors.toList());

	    // 새로운 책 번호 삽입
	    Map<String, Object> insertMap = Map.of("bookNo", booksToAdd, "memberNo", memberNo);
	    int insertedCount = 0;
	    if (!booksToAdd.isEmpty()) {
	        insertedCount = service.putWishlist(insertMap);
	    }

	    // 결과 생성
	    Map<String, Object> result = new HashMap<>();
	    result.put("insertedCount", insertedCount);
	    result.put("alreadyExists", bookNoList.size() - booksToAdd.size()); // 중복된 항목 개수
	    return result; // JSON 형태로 반환
	}

	// 책한권 찜 보내기
	@ResponseBody
	@PutMapping("/singleWishlist")
	public String singleWishlist(@SessionAttribute("loginMember") Member loginMember,
	        @RequestBody Map<String, Object> requestData) {

	    int memberNo = loginMember.getMemberNo();
	    int bookNo = (int) requestData.get("bookNo");

	    log.debug("memberNo : {}", memberNo);
	    log.debug("bookNo : {}", bookNo);

	    int addWishlist = service.putSingleWishlist(memberNo, bookNo);

	    String message = addWishlist > 0 ? "추가 성공" : "추가 실패";

	    return message;
	}
	
	@ResponseBody
	@DeleteMapping("/deleteWishlist")
	public String deleteWishlist(@SessionAttribute("loginMember") Member loginMember,
	        @RequestBody Map<String, Object> requestData) {
		

	    int memberNo = loginMember.getMemberNo();
	    int bookNo = (int) requestData.get("bookNo");

	    log.debug("memberNo : {}", memberNo);
	    log.debug("bookNo : {}", bookNo);

	    int addWishlist = service.deleteWishlist(memberNo, bookNo);

	    String message = addWishlist > 0 ? "삭제 성공" : "삭제 실패";

	    return message;
	}


}
