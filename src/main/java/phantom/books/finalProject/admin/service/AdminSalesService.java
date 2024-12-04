package phantom.books.finalProject.admin.service;

import java.util.List;
import java.util.Map;

import phantom.books.finalProject.admin.dto.ChartSales;

public interface AdminSalesService {

	// 매출 리스트 조회
	Map<String, Object> salesList(int cp, String sort, String term, String date, String text);

	List<ChartSales> chartdata(int cp, String sort, String term, String date, String text);

}
