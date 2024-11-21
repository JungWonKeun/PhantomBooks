package phantom.books.finalProject.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.service.AdminFaqService;
import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.pagination.Pagination;

@Controller
@RequestMapping("admin/faq")
@RequiredArgsConstructor
public class AdminFaqController {
	
	private final AdminFaqService service;
	
	@GetMapping("")
	public String faqList(
			@RequestParam(value = "key", required = false, defaultValue = "all") String key,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@SessionAttribute("loginMember") Member loginMember,
			Model model
			) {
		
		Map<String, Object> map = service.faqList(key, cp);
		
		List<FAQ> faqList = (List<FAQ>) map.get("faqList");
		Pagination pagination = (Pagination) map.get("pagination");
		
		model.addAttribute("faqList", faqList);
		model.addAttribute("pagination", map.get("pagination"));
		model.addAttribute("loginMember", loginMember);
		
		
		 return "admin/adminFaq";
	}
	
	
	// FAQ 추가하기 
	@PutMapping("")
	@ResponseBody
	public int insertFaq(
			@RequestBody FAQ faq) {
		
		return service.insertFaq(faq);
	}
	
	// 노출 버튼 클릭시 상태 변경
	@PostMapping("")
	@ResponseBody
	public int updateFaq(
			@RequestParam("faqId") int faqId) {
		
		
				
		
		return service.updateFaq(faqId);
	}
}
