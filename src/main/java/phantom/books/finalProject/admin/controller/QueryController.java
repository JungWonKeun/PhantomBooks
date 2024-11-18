package phantom.books.finalProject.admin.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.service.QueryService;

@RestController
@RequiredArgsConstructor
@RequestMapping("admin/query")
public class QueryController {

	private final QueryService service;
	
	@GetMapping("queryList")
	@ResponseBody
	public Map<String , Object> queryList(
			@RequestParam("cp") int cp,
			@RequestParam("sort") String sort
			){
		return service.queryList(cp, sort);
	}
	
	
	@PutMapping("")
	@ResponseBody
	public int insertReply(
			@RequestParam("queryNo") int queryNo,
			@RequestBody String inputReply
			) {
		return service.insertReply(queryNo, inputReply);
	}
	
	@DeleteMapping("")
	@ResponseBody
	public int deleteQuery(
			@RequestParam("queryNo") int queryNo
			) {
		return service.deleteQuery(queryNo);
	}
}
;