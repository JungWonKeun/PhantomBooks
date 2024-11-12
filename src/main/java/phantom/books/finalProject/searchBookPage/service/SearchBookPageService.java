package phantom.books.finalProject.searchBookPage.service;

import java.util.List;

import org.springframework.ui.Model;

import phantom.books.finalProject.searchBookPage.dto.Book;

public interface SearchBookPageService {

	// 모든 책 조회
	List<Book> allBook(Model model);

}
