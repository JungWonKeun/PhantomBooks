package phantom.books.finalProject.searchBookPage.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.member.dto.Member;
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
	public String searchBooks(
	        @RequestParam(value = "searchTitle", required = false) String searchTitle,
	        @RequestParam(value = "categories", required = false) int[] categories,  // int[]로 받기
	        @RequestParam(value = "preferences", required = false) int[] preferences,  // int[]로 받기
	        @RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
	        Model model) {

	    // categories와 preferences는 int[]로 받았으므로, 바로 사용 가능
	    // 원하는 작업을 처리합니다.

	    log.debug("searchTitle: {}", searchTitle);
	    log.debug("categories: {}", Arrays.toString(categories));  // int[]을 배열로 출력
	    log.debug("preferences: {}", Arrays.toString(preferences));  // int[]을 배열로 출력

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
	public String bookDetail(Model model, @PathVariable("bookNo") int bookNo) {
		Book book = service.bookDetail(bookNo);

		model.addAttribute("book", book);
		
		 Review review = service.getReviewByBookNo(bookNo); // 리뷰를 가져오는 서비스 호출
		    if (review != null) {
		        model.addAttribute("review", review);
		    } else {
		        model.addAttribute("review", new Review()); // 비어 있는 리뷰 객체를 전달
		    }
		return "searchBookPage/bookDetail";
	}

	// 선택한 책을 장바구니에 담기
	@ResponseBody
	@PutMapping("/addCart")
	public String addCart(@RequestBody Map<String, List<Integer>> paramMap, @SessionAttribute("loginMember") Member loginMember) {

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
		  
		  if(addCart>0)message="추가 성공";
		  
		return "redirect:/searchBookPage/searchBooks";
	}
	
	@ResponseBody
	@PutMapping("/singleCart")
	public String singleCart(@SessionAttribute("loginMember") Member loginMember, @RequestBody Map<String, Object> requestData) {
	    int memberNo = loginMember.getMemberNo();
	    int bookNo = (int) requestData.get("bookNo");

	    log.debug("memberNo : {}", memberNo);
	    log.debug("bookNo : {}", bookNo);

	    int addCart = service.putSingleCart(memberNo, bookNo);

	    String message = addCart > 0 ? "추가 성공" : "추가 실패";

	    return message;
	}

	@ResponseBody
	@PutMapping("/detailCart")
	public String detailCart(@SessionAttribute("loginMember") Member loginMember, @RequestBody Map<String, Object> requestData) {
	    int memberNo = loginMember.getMemberNo();
	    int bookNo = (int) requestData.get("bookNo");

	    log.debug("memberNo : {}", memberNo);
	    log.debug("bookNo : {}", bookNo);

	    int addCart = service.detailCart(memberNo, bookNo);

	    String message = addCart > 0 ? "추가 성공" : "추가 실패";

	    return message;
	}

	

}
