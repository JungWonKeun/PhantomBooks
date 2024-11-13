package phantom.books.finalProject.searchBookPage.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.mapper.SearchBookPageMapper;

@Service
@RequiredArgsConstructor
public class SearchBookPageServiceImpl implements SearchBookPageService{

	private final SearchBookPageMapper mapper;
	
	// 입력된 값 없을시 책 전체 조회
	@Override
	public List<Book> allBook() {
		
		return mapper.allBook();
	}
	
	//  책 제목 조회
	@Override
	public List<Book> searchBooksByTitle(String query) {
		return mapper.searchBooksByTitle(query);
	}
	
	
	@Override
	public Book bookDetail(int bookNo) {
		return mapper.bookDetail(bookNo);
	}
	
}
