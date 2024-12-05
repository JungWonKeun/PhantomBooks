package phantom.books.finalProject.admin.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
import phantom.books.finalProject.searchBookPage.dto.Book;

@Controller
@RequestMapping("/admin/newBook")
@RequiredArgsConstructor
@Slf4j
public class AdminNewBookController {
	
	private final AdminNewBookService service;
	
	@GetMapping("")
	public String newBook(
			@SessionAttribute("loginMember") Member loginMember,
			@RequestParam(value = "key", required = false, defaultValue = "all") String key,
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			Model model) {
		
		Map<String, Object> map = new HashMap<>();
		
		map = service.newBookList(cp, key);
		
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
			@RequestBody int bookNo) {
		
		return service.insertRequest(bookNo);
	}
	
	@DeleteMapping("")
	@ResponseBody
	public int deleteRequest(
			@RequestParam("requestNo") int requestNo) {
		
		return service.deleteRequest(requestNo);
	}
	
	
}
