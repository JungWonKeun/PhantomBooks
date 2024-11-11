package phantom.books.finalProject.searchBookPage.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("searchBookPage")
public class SearchBookPageController {

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
