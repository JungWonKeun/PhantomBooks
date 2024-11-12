package phantom.books.finalProject.searchBookPage.service;

import java.util.List;

import org.springframework.ui.Model;

import phantom.books.finalProject.searchBookPage.dto.Book;

public interface SearchBookPageService {

	
	// 모든 책 조회 인터페이스
	List<Book> allBook();

	// 책 상세 페이지
	Book bookDetail(int bookNo);

	
	

}
