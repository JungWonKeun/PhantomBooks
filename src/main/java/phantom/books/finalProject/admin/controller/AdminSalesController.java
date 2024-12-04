package phantom.books.finalProject.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.dto.ChartSales;
import phantom.books.finalProject.admin.service.AdminSalesService;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("admin/sales")
public class AdminSalesController {
	
	private final AdminSalesService service;
	
	// 매출 리스트 조회
	@GetMapping("salesList")
	@ResponseBody
	public Map<String, Object> salesList(
			@RequestParam(value = "cp") int cp,
			@RequestParam(value = "sort") String sort,
			@RequestParam(value = "term", required = false, defaultValue = "year") String term,
			@RequestParam(value = "date", required = false) String date,
			@RequestParam(value = "text", required = false) String text
			) {
		log.debug("cp : {}", cp);
		log.debug("sort : {}", sort);
		log.debug("term : {}", term);
		log.debug("date : {}", date);
		log.debug("text : {}", text);
		
		return service.salesList(cp, sort, term, date, text);
	}
	
	@GetMapping("chartData")
	@ResponseBody
	public List<ChartSales> chartData(
			@RequestParam(value = "cp") int cp,
			@RequestParam(value = "sort") String sort,
			@RequestParam(value = "term", required = false, defaultValue = "year") String term,
			@RequestParam(value = "date", required = false) String date,
			@RequestParam(value = "text", required = false) String text){
		return service.chartdata(cp, sort, term, date, text);
	}
}
