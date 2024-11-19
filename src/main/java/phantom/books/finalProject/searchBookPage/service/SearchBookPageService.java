package phantom.books.finalProject.searchBookPage.service;

import java.util.List;
import java.util.Map;


import phantom.books.finalProject.searchBookPage.dto.Book;

public interface SearchBookPageService {

	
	/*
	 * // 모든 책 조회 인터페이스 List<Book> allBook(int cp);
	 */

	// 검색한 책 조회
	/* List<Book> searchBooks(String query, String sortOption, int cp); */

	
	// 책 상세 조회
	Book bookDetail(int bookNo);
	
	// 선택한 책 장바구니 담기
	int putCart(Map<String, Object> map);


	// 검색 페이지에서 선택한 책 장바구니 담기
	int putSingleCart(int memberNo, int bookNo);

	// 책 상세조회 장바구니
	int detailCart(int memberNo, int bookNo);


	// 옵션이랑 쿼리 데이터를 이용한 검색
	Map<String, Object> searchBooks(String searchTitle, int[] categories, int[] preferences, int cp);
	
	 

	

	
	

	
	



	
	

	

	

	
	

}
