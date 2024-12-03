package phantom.books.finalProject.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.dto.ChartSales;
import phantom.books.finalProject.admin.mapper.AdminSalesMapper;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.searchBookPage.dto.Book;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class AdminSalesServiceImpl implements AdminSalesService {
	
	private final AdminSalesMapper mapper;
	
	// 매출 리스트 조회
	@Override
	public Map<String, Object> salesList(int cp, String sort, String term, String date,String text) {

		int countSales = mapper.countSales(cp, sort, term, date, text);
		
		Pagination pagination = new Pagination(cp, countSales, 5, 5);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<ChartSales> salesList = mapper.salesList(cp, sort, term, date, text, bounds);
		List<ChartSales> chartData = mapper.chartData(cp, sort, term, date, text);
		
		int totalOrderPrice = 0;
		int totalRequestPrice = 0;
		int salesPrice = 0;
		
		for (ChartSales sales : chartData) {
			totalOrderPrice += sales.getOrderPrice();
			totalRequestPrice += sales.getRequestPrice();
			salesPrice += (sales.getOrderPrice() - sales.getRequestPrice());
		}
		
		log.debug("totalOrderPrice : {}", totalOrderPrice);
		log.debug("totalRequestPrice : {}", totalRequestPrice);
		log.debug("salesPrice : {}", salesPrice);
		log.debug("chartData : {}", chartData);
		
		Map<String, Object> map = new HashMap<>();
		map.put("salesList", salesList);
		map.put("pagination", pagination);
		map.put("chartData", chartData);
		map.put("totalOrderPrice", totalOrderPrice);
		map.put("totalRequestPrice", totalRequestPrice);
		map.put("salesPrice", salesPrice);
		
		return map;
	}
}
