package phantom.books.finalProject.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.mapper.ManagerMapper;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.searchBookPage.dto.Book;

@Slf4j
@Service
@RequiredArgsConstructor
public class ManagerServiceImpl implements ManagerService {
	
	private final ManagerMapper mapper;
	
	// 관리자 재고 관리 페이지 리스트
	@Override
	public Map<String, Object> manager(int cp, String sort, int view1, String text) {

		int countBookList = mapper.countBookList(sort, text);
		Pagination pagination = new Pagination(cp, countBookList, view1, 5);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<Book> bookList = mapper.bookList(sort,text, bounds);
		log.debug("bookList : {}", bookList);
		
		Map<String, Object> map = new HashMap<>();
		map.put("countBookList", countBookList);
		map.put("pagination", pagination);
		map.put("bookList", bookList);
		
		
		return map;
	}
	
	// 등록 여부 수정
	@Override
	public int insert(int bookNo) {
		return mapper.insert(bookNo);
	}
	
}
