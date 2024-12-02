package phantom.books.finalProject.admin.service;

import java.util.Map;

public interface AdminSalesService {

	// 매출 리스트 조회
	Map<String, Object> salesList(int cp, String sort, String term, String date);

}
