package phantom.books.finalProject.main.service;

import java.util.List;

import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.searchBookPage.dto.Book;

public interface MainService {

	// 오늘의 추천도서
	List<Book> getDailyRecommendedBooks();
	List<OrderBookDto> getDailyRecommendedList();

	// 취향별 추천도서
	List<Book> getBooksByUserPreference(int memberNo);
	
	// 베스트셀러
	List<Book> getBestsellerBooks();



}
