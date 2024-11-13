package phantom.books.finalProject.admin.service;

import java.util.Map;

public interface ManagerService {

	// 관리자 재고 관리 페이지 리스트 조회
	Map<String, Object> manager(int cp, String sort, String text);

	// 등록 여부 수정
	int insert(int bookNo);

}
