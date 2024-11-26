package phantom.books.finalProject.admin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.service.ManagerService;
import phantom.books.finalProject.searchBookPage.dto.Book;

@Controller
@RequiredArgsConstructor
@RequestMapping("admin/manager")
@Slf4j
public class ManagerController {

	private final ManagerService managerService;
	
	
	@GetMapping("bookList")
	@ResponseBody
	public Map<String, Object> manager(
			@RequestParam("cp") int cp,
			@RequestParam("sort") String sort,
			@RequestParam("view") String view,
			@RequestParam(value = "text", required = false) String text) {
		
		int view1 = Integer.parseInt(view);
		log.debug("view : {}", view);
		log.debug("view1 : {}", view1);
		
		return managerService.manager(cp, sort, view1, text);
	}
	
	@PutMapping("insert")
	@ResponseBody
	public int insert(
			@RequestBody int bookNo) {
		return managerService.insert(bookNo);
	}
	
	
	
}
