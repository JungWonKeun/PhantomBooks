package phantom.books.finalProject.admin.service;

import java.util.List;
import java.util.Map;

import phantom.books.finalProject.searchBookPage.dto.Book;


public interface ManagerService {

	// 관리자 재고 관리 페이지 리스트 조회
	Map<String, Object> manager(int cp, String sort, int view1, String text);

	// 등록 여부 수정
	int insert(int bookNo);


}
