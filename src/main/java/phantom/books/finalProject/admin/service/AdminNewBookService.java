package phantom.books.finalProject.admin.service;

import java.util.Map;

public interface AdminNewBookService {

	// 새 책 요청 목록 조회
	Map<String, Object> newBookList();
	
	// 새 책 요청 삽입
	int insertRequest(int bookNo);

	// 요청 삭제
	int deleteRequest(int requestNo);

}
