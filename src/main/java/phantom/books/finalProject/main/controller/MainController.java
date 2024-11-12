package phantom.books.finalProject.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/")
@Controller
public class MainController {

	@RequestMapping("")
	public String main() {
		return "main/main";
	}
	
	
}
