package phantom.books.finalProject.searchBookPage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.dto.Review;
import phantom.books.finalProject.searchBookPage.mapper.SearchBookPageMapper;

@Service
@RequiredArgsConstructor
public class SearchBookPageServiceImpl implements SearchBookPageService {

	private final SearchBookPageMapper mapper;

	/*
	 * @Override public List<Book> allBook(int cp) {
	 * 
	 * int bookCount = mapper.allBook();
	 * 
	 * Pagination pagination = new Pagination(cp, bookCount, 10, 5);
	 * 
	 * int limit = pagination.getLimit(); int offset = (cp-1) * limit;
	 * 
	 * RowBounds bounds = new RowBounds(offset, limit);
	 * 
	 * List<Book> bookList = mapper.allBook(bounds);
	 * 
	 * Map<String, Object> map = new HashMap<>(); map.put("bookCount", bookCount);
	 * map.put("pagination", pagination); map.put("bookList", bookList);
	 * 
	 * return map; }
	 */

	
	// 책 제목/옵션 조회
	/*
	 * @Override public List<Book> searchBooks(String query, List<String>
	 * categories, List<String> preferences, int cp) { // 검색 조건을 기반으로 책 목록 조회
	 * Map<String, Object> params = new HashMap<>(); params.put("query", query);
	 * params.put("categories", categories); params.put("preferences", preferences);
	 * params.put("cp", cp);
	 * 
	 * return mapper.searchBooks(params); }
	 */

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
	
	@Override
	public Map<String, Object> searchBooks(String searchTitle, int[] categories, int[] preferences, int cp) {
	    // 전체 책 개수 조회
	    int totalCount = mapper.countBooks(searchTitle, categories, preferences);

	    // 페이지네이션 계산
	    Pagination pagination = new Pagination(cp, totalCount, 10, 5);

	    // RowBounds를 활용한 페이징 처리
	    int limit = pagination.getLimit();
	    int offset = (cp - 1) * limit;

	    RowBounds bounds = new RowBounds(offset, limit);

	    // 책 목록 조회
	    List<Book> bookList = mapper.searchBooks(searchTitle, categories, preferences, bounds);

	    // 결과를 담을 Map 생성
	    Map<String, Object> result = new HashMap<>();
	    result.put("pagination", pagination);
	    result.put("totalCount", totalCount);
	    result.put("bookList", bookList);

	    return result;
	}


	@Override
	public List<Review> getReviewsByBookNo(int bookNo) {
		return mapper.getReviewsByBookNo(bookNo);
	}

}
