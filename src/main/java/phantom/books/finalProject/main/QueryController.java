package phantom.books.finalProject.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/main")
public class QueryController {
	
	@GetMapping("query")
	public String queryPage() {
		return "main/query";
	}
}
