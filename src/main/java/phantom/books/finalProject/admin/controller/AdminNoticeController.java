package phantom.books.finalProject.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.service.AdminNoticeService;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.pagination.Pagination;

@Controller
@RequiredArgsConstructor
@RequestMapping("/admin/notice")
@Slf4j
public class AdminNoticeController {

	private final AdminNoticeService service;
	
	@GetMapping("")
	public String notice(
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "key", required = false, defaultValue = "all") String key,
			Model model
			) {
		
		Map<String, Object> map = service.notice(cp, key);
		
		List<Notice> noticeList = (List<Notice>)map.get("noticeList");
		Pagination pagination = (Pagination)map.get("pagenation");
		
		model.addAttribute("noticeList", noticeList);
		model.addAttribute("pagination", pagination);
		
		log.debug("공지사항 리스트 : {}", noticeList.get(0));
		
		return "admin/adminNotice";
	}
}
