package phantom.books.finalProject.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("admin")
public class AdminController {

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
	
}
