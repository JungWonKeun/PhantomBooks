package phantom.books.finalProject.main.service;

import java.util.List;

import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.searchBookPage.dto.Book;

public interface MainService {

	// 오늘의 추천도서
	List<Book> todayBooks();

	// 일간 베스트셀러
	List<Book> bestsellerBooks(int memberNo);

	// 취향별 추천 도서
	List<OrderBookDto> getBoughtBooks(int memberNo);
	List<Book> getMyTypeBooks(int memberNo);



}
