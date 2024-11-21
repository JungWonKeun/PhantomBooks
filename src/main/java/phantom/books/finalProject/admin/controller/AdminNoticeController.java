package phantom.books.finalProject.admin.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.service.AdminNoticeService;
import phantom.books.finalProject.member.dto.Member;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/notice")
public class AdminNoticeController {

	private final AdminNoticeService service;
	
	@GetMapping("")
	public String notice(
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "key", required = false, defaultValue = "all") String key,
			@SessionAttribute("loginMember") Member loginMember,
			Model model
			) {
		
		Map<String, Object> map = service.notice(cp, key);
		
		model.addAttribute("noticeList", map.get("noticeList"));
		model.addAttribute("pagination", map.get("pagination"));
		model.addAttribute("loginMember", loginMember);
		
		
		
		return "admin/adminNotice";
	}
}
