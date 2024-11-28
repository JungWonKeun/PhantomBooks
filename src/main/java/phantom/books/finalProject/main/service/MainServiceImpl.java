package phantom.books.finalProject.main.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.main.mapper.MainMapper;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.searchBookPage.dto.Book;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {
	
	private final MainMapper mapper;
	@Override
	public List<Book> getBestsellerBooks() {
		return mapper.getBestsellerBooks();
	}
	@Override
	public List<Book> getBooksByUserPreference(int memberNo) {
		return mapper.getBooksByUserPreference(memberNo);
	}
	@Override
	public List<Book> getDailyRecommendedBooks() {
		return mapper.getDailyRecommendedBooks();
	}
	@Override
	public List<OrderBookDto> getDailyRecommendedList() {
		return mapper.getDailyRecommendedList();
	}
}
