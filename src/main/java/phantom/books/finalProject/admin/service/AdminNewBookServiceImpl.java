package phantom.books.finalProject.admin.service;

import java.awt.print.Book;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.dto.Request;
import phantom.books.finalProject.admin.mapper.AdminNewBookMapper;
import phantom.books.finalProject.pagination.Pagination;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AdminNewBookServiceImpl implements AdminNewBookService {
	
	private final AdminNewBookMapper mapper;
	
	// 새 책 요청 목록
	@Override
	public Map<String, Object> newBookList() {

		int countNewBook = mapper.countNewBook();
		
		Pagination pagination = new Pagination(1, countNewBook, 20, 5);
		
		int limit = pagination.getLimit();
		int offset = (1-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<Request> newBookList = mapper.newBookList(bounds);
		
		Map<String, Object> map = new HashMap<>();
		map.put("pagination", pagination);
		map.put("newBookList", newBookList);
		
		
		return map;
	}
	
	// 등록 상태 변경
	@Override
	public int insertRequest(int bookNo) {
		int result = 0;
		int updateResult = 0; //
		
		int selectBook = mapper.selectBook(bookNo);
		log.debug("selectBook : {}", selectBook);
		
		int requestNo = mapper.selectRequestNo(bookNo);
		log.debug("requestNo : {}", requestNo);
				
		if(selectBook > 0) {
			
			// 기존 책 수량 변경
			updateResult = mapper.updateManager(bookNo, requestNo);
			log.debug("updateResult : {}", updateResult);
			}else {
				
				int selectRequest = mapper.selectRequest(bookNo);
				log.debug("selectRequest : {}", selectRequest);
				
				if(selectRequest == 0) {
					result = 0;// 아무것도 없으면 0 반환
				}else {
					
					// request에 bookNo 존재 === book에 신간 발주내용 삽입
					updateResult = mapper.insertRequest(bookNo);
					log.debug("updateResult : {}", updateResult);
				}

				
		}
		
		if(updateResult > 0) {
			result = mapper.updateRequest(requestNo);
			log.debug("result : {}", result);
			
		}else {
				result = 0;
		}
			
		return result;
	}
}
