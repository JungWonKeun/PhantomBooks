package phantom.books.finalProject.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.service.AdminRequestService;
import phantom.books.finalProject.common.util.RedisUtil;
import phantom.books.finalProject.searchBookPage.dto.Book;

@Controller
@RequiredArgsConstructor
@RequestMapping("admin/request")
public class AdminRequestController {
	public final RedisUtil redisUtil;
	
	public final AdminRequestService service;
	
	
	/** 이메일 발송
	 * @param email : 입력받은 이메일
	 * @return : 성공 - 1, 실패 - 0
	 */
	@ResponseBody
	@PostMapping("")
	public int requestEmail(
			@RequestBody Book book
			) {
		
		
		return service.requestEmail("request", book);
	}
	
}
