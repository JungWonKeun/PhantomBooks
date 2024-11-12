package phantom.books.finalProject.admin.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.service.AdminService;

@Controller
@RequestMapping("admin")
@RequiredArgsConstructor
public class AdminController {
	
	private final AdminService service;
	
	/** 관리자 메인 페이지 forward
	 * @return
	 */
	@GetMapping("")
	public String admin() {
		return "admin/main";
	}
	
	/** 관리자 일정 관리 페이지 forward
	 * @return
	 */
	@GetMapping("schedule")
	public String schedule() {
		return "admin/schedule";
	}
	
	/** 관리자 매출 관리 페이지 forward
	 * @return
	 */
	@GetMapping("sales")
	public String sales() {
		return "admin/sales";
	}
	
	/** 관리자 재고 관리 페이지 forward
	 * @return
	 */
	@GetMapping("manager")
	public String manager() {
		return "admin/manager";
	}

	
//----------------------------------------------------------------------------------------------------------------------------
	
	@GetMapping("memberList")
	@ResponseBody
	public Map<String, Object> memberList(
      @RequestParam("cp") int cp, 
      @RequestParam("sort") String sort
		){
		
			return service.memberList(cp, sort);
		}
	
}
