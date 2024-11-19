package phantom.books.finalProject.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.service.FaqService;
import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.pagination.Pagination;

@Controller
@RequestMapping("admin/faq")
@RequiredArgsConstructor
public class FaqController {
	
	private final FaqService service;
	
	@GetMapping("")
	public String faqList(
			@RequestParam(value = "key", required = false, defaultValue = "all") String key,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			Model model
			) {
		
		Map<String, Object> map = service.faqList(key, cp);
		
		List<FAQ> faqList = (List<FAQ>) map.get("faqList");
		Pagination pagination = (Pagination) map.get("pagination");
		
		model.addAttribute("faqList", faqList);
		model.addAttribute("pagination", map.get("pagination"));
		
		
		 return "admin/faq";
	}
}
