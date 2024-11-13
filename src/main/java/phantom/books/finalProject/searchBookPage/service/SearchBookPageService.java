package phantom.books.finalProject.searchBookPage.service;

import java.util.List;

import org.springframework.ui.Model;

import phantom.books.finalProject.searchBookPage.dto.Book;

public interface SearchBookPageService {

	
	// 모든 책 조회 인터페이스
	List<Book> allBook();

	// 검색한 책 조회
	List<Book> searchBooksByTitle(String query);
	
	// 책 상세 조회
	Book bookDetail(int bookNo);

	

	
	

}
