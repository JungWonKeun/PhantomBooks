package phantom.books.finalProject.searchBookPage.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.service.SearchBookPageService;

@Controller
@RequiredArgsConstructor
@RequestMapping("searchBookPage")
public class SearchBookPageController {

	private final SearchBookPageService service;
	
	// 모든 책 페이지 조회
	@GetMapping("/allBook")
	public String allBook(Model model) {
	    // 모든 책 조회 서비스 호출
	    List<Book> allBook = service.allBook();
	    model.addAttribute("allBook", allBook);  // 조회된 책 목록을 모델에 추가
	    return "searchBookPage/allBook";  // HTML 페이지로 이동
	}
	
//	검색후 페이지
	@GetMapping("searchBook")
	public String searchBook() {
		
		
		return "searchBookPage/searchBook";
	}
	
	
// 상세조회
	@GetMapping("bookDetail")
	public String bookDetail() {
		
		
		return "searchBookPage/bookDetail";
	}
	
}
