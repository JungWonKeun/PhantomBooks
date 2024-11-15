package phantom.books.finalProject.searchBookPage.service;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.mapper.SearchBookPageMapper;

@Service
@RequiredArgsConstructor
public class SearchBookPageServiceImpl implements SearchBookPageService {

	private final SearchBookPageMapper mapper;

	// 입력된 값 없을시 책 전체 조회
	@Override
	public List<Book> allBook() {

		return mapper.allBook();
	}

	// 책 제목 조회
	@Override
	public List<Book> searchBooksByTitle(String query) {
		return mapper.searchBooksByTitle(query);
	}

	// 책 상세조회
	@Override
	public Book bookDetail(int bookNo) {
		return mapper.bookDetail(bookNo);
	}

	// 선택한 책을 장바구니에 담기
	@Override
	public int putCart(Map<String, Object> map) {

		return mapper.putCart(map);
	}

	// 검색 페이지에서 선택한 책 장바구니 담기
	@Override
	public int putSingleCart(int memberNo, int bookNo) {
		return mapper.putSingleCart(memberNo, bookNo);
	}
	
	// 책 상세조회 장바구니
	@Override
	public int detailCart(int memberNo, int bookNo) {
		return mapper.detailCart(memberNo, bookNo);
	}
}
