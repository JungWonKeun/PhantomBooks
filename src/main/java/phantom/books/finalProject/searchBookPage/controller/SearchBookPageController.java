package phantom.books.finalProject.searchBookPage.controller;



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
	
	// 모든 책 페이지 
	@GetMapping("allBook")
	public String allBook(Model model){
		
		List<Book> book = service.allBook(model);
		
		
		return "allBook";
	}
	
	
//	검색후 페이지
	@GetMapping("searchBook")
	public String searchBook() {
		
		
		return "searchBook/searchBook";
	}
	
	
// 상세조회
	@GetMapping("bookDetail")
	public String bookDetail() {
		
		
		return "searchBookPage/bookDetail";
	}
	
}
