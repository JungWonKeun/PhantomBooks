package phantom.books.finalProject.admin.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.service.ReviewService;

@Controller
@RequiredArgsConstructor
@RequestMapping("admin/review")
public class ReviewController {

	private final ReviewService service;
	
	@GetMapping("reviewList")
	@ResponseBody
	public Map<String, Object> reviewList(
			@RequestParam("cp") int cp,
			@RequestParam("sort") String sort,
			@RequestParam(value = "title", required = false) String title) {
		return service.reviewList(cp, sort, title);
	}
}
