package phantom.books.finalProject.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import oracle.jdbc.proxy.annotation.Post;
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
		
		log.debug("공지사항 리스트 : {}", noticeList);
		
		return "admin/adminNotice";
	}
	
	@GetMapping("noticeList")
	@ResponseBody
	public Map<String, Object> noticeList(
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "key", required = false, defaultValue = "all") String key
			){
		return service.notice(cp, key);
	}
	
	// 공지사항 작성
	@PutMapping("")
	@ResponseBody
	public int insertNotice(
			@RequestBody Notice notice) {
		return service.insertNotice(notice);
	}
	
	// 공지사항 수정
	@PostMapping("")
	@ResponseBody
	public int updateNotice(
			@RequestBody Notice notice) {
		
		return service.updateNotice(notice);
	}

	// 공지사항 삭제
	@DeleteMapping("")
	@ResponseBody
	public int deleteNotice(
			@RequestParam("noticeId") int noticeId) {
		
		return service.deleteNotice(noticeId);
	}
	
	@PostMapping("status")
	@ResponseBody
	public int changeStatus(
			@RequestParam("noticeId") int noticeId) {
		return service.updateStatus(noticeId);
	}
	
}
