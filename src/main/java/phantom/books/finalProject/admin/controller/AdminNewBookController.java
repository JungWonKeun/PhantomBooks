package phantom.books.finalProject.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.dto.Request;
import phantom.books.finalProject.admin.service.AdminNewBookService;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.pagination.Pagination;

@Controller
@RequestMapping("/admin/newBook")
@RequiredArgsConstructor
@Slf4j
public class AdminNewBookController {
	
	private final AdminNewBookService service;
	
	@GetMapping("")
	public String newBook(
			@SessionAttribute("loginMember") Member loginMember,
			Model model) {
		
		Map<String, Object> map = new HashMap<>();
		
		map = service.newBookList();
		
		Pagination pagination = (Pagination)map.get("pagination");
		List<Request> requestList = (List<Request>)map.get("newBookList");
		log.debug("requestList : {}", requestList);

		model.addAttribute("loginMember", loginMember);
		model.addAttribute("pagination", pagination);
		model.addAttribute("requestList", requestList);
		
		
		return "admin/adminNewBook";
	}
	
	@PostMapping("")
	@ResponseBody
	public int insertRequest(
			@RequestParam("bookNo") int bookNo) {
		
		return service.insertRequest(bookNo);
	}
	
}
