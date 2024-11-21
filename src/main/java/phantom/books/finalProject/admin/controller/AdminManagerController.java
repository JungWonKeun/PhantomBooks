package phantom.books.finalProject.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.service.AdminManagerService;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("admin/adminManager")
public class AdminManagerController {

	private final AdminManagerService service;
	
	//관리자 관리페이지
	@GetMapping("adminList")
	@ResponseBody
	public Map<String, Object> adminManager(@RequestParam("cp") int cp) {
		
		return service.adminManager(cp);	
	}
}
