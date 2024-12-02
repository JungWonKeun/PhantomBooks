package phantom.books.finalProject.admin.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "sort", required = false, defaultValue = "all") String sort,
			@RequestParam(value = "term", required = false) String term,
			@RequestParam(value = "date", required = false) String date
			) {
		return service.salesList(cp, sort, term, date);
	}
}
