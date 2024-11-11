package phantom.books.finalProject.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("admin")
public class AdminController {

	@GetMapping("")
	public String admin() {
		return "admin/main";
	}
	
	@GetMapping("schedule")
	public String schedule() {
		return "admin/schedule";
	}
	

	@GetMapping("sales")
	public String sales() {
		return "admin/sales";
	}
		
	@GetMapping("manager")
	public String manager() {
		return "admin/manager";
	}
	

}
