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

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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
			@RequestParam(value = "categories", required = false) int[] categories, // int[]로 받기
			@RequestParam(value = "preferences", required = false) int[] preferences, // int[]로 받기
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp, Model model) {

		// categories와 preferences는 int[]로 받았으므로, 바로 사용 가능
		// 원하는 작업을 처리합니다.

		log.debug("searchTitle: {}", searchTitle);
		log.debug("categories: {}", Arrays.toString(categories)); // int[]을 배열로 출력
		log.debug("preferences: {}", Arrays.toString(preferences)); // int[]을 배열로 출력

		// 서비스 호출
		Map<String, Object> map = service.searchBooks(searchTitle, categories, preferences, cp);

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
	public String bookDetail(
	        Model model,
	        @PathVariable("bookNo") int bookNo,
	        @SessionAttribute(value = "loginMember", required = false) Member loginMember,
	        @RequestParam(value = "cp", required = false, defaultValue = "1") int cp
	) {
	    if (loginMember != null) {
	        model.addAttribute("memberId", loginMember.getMemberId());
	    }

	    // 책 정보 가져오기
	    Book book = service.bookDetail(bookNo);
	    model.addAttribute("book", book);

	    // 리뷰 정보 가져오기 및 페이지네이션
	    int countReview = service.getReviewCount(bookNo);
	    Pagination pagination = new Pagination(cp, countReview);

	    // 리뷰 가져오기
	    List<Review> reviews = service.getReviewsByBookNo(bookNo, cp);
	    if (reviews == null) {
	        reviews = new ArrayList<>(); // null 방어
	    }

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
	  @PostMapping("/writeReview/{bookNo}") public boolean writeReview(
	  @PathVariable("bookNo") int bookNo, // URL 경로에서 bookNo 가져오기
	  @SessionAttribute("loginMember") Member loginMember, // 로그인한 사용자 정보
	  @RequestParam("rating") double score,
	  @RequestParam("title") String title,
	  @RequestParam("content") String content,
	  @RequestParam(value = "reviewImage", required = false) MultipartFile file,
	  RedirectAttributes ra ) { // 서비스 호출
		  
	 return service.writeReview(bookNo, title,
	  content, score, loginMember.getMemberNo(), file);
	  
	  }
	 
	  // 리뷰 수정
	  @ResponseBody
	  @PostMapping("/updateReview/{reviewNo}") public String updateReview(
	  @PathVariable("reviewNo") int reviewNo,
	  @SessionAttribute("loginMember") Member loginMember, // 로그인한 사용자 정보
	  @RequestParam("rating") double score,
	  @RequestParam("reviewTitle") String title,
	  @RequestParam("reviewContent") String content,
	  @RequestParam(value = "image", required = false) MultipartFile file,
	  RedirectAttributes ra) {
	  
	  return service.updateReview(reviewNo, title, content, score,
	  loginMember.getMemberNo(), file);
	 
	  }
	  
	  // 리뷰 삭제 
	  @ResponseBody
	  @PostMapping("/deleteReview/{reviewNo}")
	  public String deleteReview(
	      @PathVariable("reviewNo") int reviewNo,
	      @SessionAttribute(value = "loginMember", required = false) Member loginMember
	  ) {
	      if (loginMember == null) {
	          return "login_required"; // 로그인 필요
	      }

	      try {
	          int deleteCount = service.deleteReview(reviewNo, loginMember.getMemberNo());

	          // 삭제된 행이 1개 이상이면 성공
	          if (deleteCount > 0) {
	              return "success";
	          } else {
	              return "not_found_or_unauthorized"; // 리뷰가 없거나 권한 없음
	          }
	      } catch (Exception e) {
	          e.printStackTrace(); // 서버 로그 출력
	          return "error"; // 예외 발생 시 처리
	      }
	  }


	 

}
