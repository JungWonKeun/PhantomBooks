package phantom.books.finalProject.admin.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	/** 관리자 문의 관리 페이지 forward
	 * @return
	 */
	@GetMapping("query")
	public String query() {
		return "admin/query";
	}
	
	/** 관리자 리뷰 관리 페이지 forward
	 * @return
	 */
	@GetMapping("review")
	public String review() {
		return "admin/review";
	}

	/** 관리자 FAQ 관리 페이지 forward
	 * @return
	 */
	@GetMapping("faq")
	public String faq() {
		return "admin/faq";
	}

	
//----------------------------------------------------------------------------------------------------------------------------
	
	@GetMapping("memberList")
	@ResponseBody
	public Map<String, Object> memberList(
	    @RequestParam("cp") int cp,
	    @RequestParam("sort") String sort,
	    @RequestParam(value = "term", required = false, defaultValue = "year") String term
	) {
	    return service.memberList(cp, term, sort);
	}
	
	/** 회원 삭제
	 * @param memberNo
	 * @return
	 */
	@DeleteMapping("delete")
	@ResponseBody
	public int deleteMember(
			@RequestBody int memberNo) {
		return service.deleteMember(memberNo);
	}
	

	
}
