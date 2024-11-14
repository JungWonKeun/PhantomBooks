package phantom.books.finalProject.searchBookPage.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.service.SearchBookPageService;

@Controller
@RequiredArgsConstructor
@RequestMapping("searchBookPage")
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
	
}
