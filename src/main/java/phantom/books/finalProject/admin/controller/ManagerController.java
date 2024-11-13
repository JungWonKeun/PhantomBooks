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
import phantom.books.finalProject.admin.service.ManagerService;
import phantom.books.finalProject.searchBookPage.dto.Book;

@Controller
@RequiredArgsConstructor
@RequestMapping("admin/manager")
public class ManagerController {

	private final ManagerService managerService;
	
	
	@GetMapping("bookList")
	@ResponseBody
	public Map<String, Object> manager(
			@RequestParam("cp") int cp,
			@RequestParam("sort") String sort,
			@RequestParam(value = "text", required = false) String text) {
		
		return managerService.manager(cp, sort, text);
	}
	
	@PutMapping("insert")
	@ResponseBody
	public int insert(
			@RequestBody int bookNo) {
		return managerService.insert(bookNo);
	}
	
	
	@GetMapping("inputText")
	@ResponseBody
	public List<Book> inputText(
			@RequestParam("sort") String sort,
			@RequestParam("text") String text) {
		return managerService.inputText(sort, text);
	}
	
}
