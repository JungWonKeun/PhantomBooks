package phantom.books.finalProject.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/")
@Controller
public class MainController {

	@GetMapping("")
	public String main() {
		return "main/main";
	}
	
//	@GetMapping("support")
//	public String query() {
//		return "customer/support";
//	}
}
