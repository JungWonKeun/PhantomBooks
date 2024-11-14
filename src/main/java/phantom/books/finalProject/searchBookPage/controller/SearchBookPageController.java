package phantom.books.finalProject.searchBookPage.controller;

import java.util.Collections;
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

import jakarta.mail.Session;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.searchBookPage.dto.Book;
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
	public String searchBooks(@RequestParam(value = "query", required = false) String query, Model model) {
		List<Book> books;
		if (query == null || query.trim().isEmpty()) {
			// 검색어가 없으면 전체 책 조회
			books = service.allBook();
		} else {
			// 검색어가 있으면 해당 제목의 책 조회
			books = service.searchBooksByTitle(query);
		}
		model.addAttribute("allBook", books);
		return "searchBookPage/searchBook"; // 결과를 보여줄 Thymeleaf 템플릿
	}

// 상세조회
	@GetMapping("/bookDetail/{bookNo}")
	public String bookDetail(Model model, @PathVariable("bookNo") int bookNo) {
		Book book = service.bookDetail(bookNo);

		model.addAttribute("book", book);
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
	
	@PutMapping("singleCart")
	public String singleCart(@SessionAttribute("loginMember") Member loginMember,@RequestBody Book bookNo) {
		
		int memberNo = loginMember.getMemberNo();
		
		log.debug("memberNo : {}", memberNo);
		log.debug("bookNo2 : {}", bookNo);
	
		
		int addCart = service.putSingleCart(memberNo, bookNo.getBookNo());
		
		String message = null;
		
		if(addCart>0)message="추가 성공";
	
		
		return "redirect:/searchBookPage/searchBooks";
	}
	
	

}
