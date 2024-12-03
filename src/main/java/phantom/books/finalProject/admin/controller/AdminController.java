package phantom.books.finalProject.admin.controller;

import java.lang.management.ManagementFactory;
import java.lang.management.OperatingSystemMXBean;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.jaxb.SpringDataJaxb.OrderDto;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.service.AdminService;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.order.dto.OrderBookDto;
import retrofit2.http.PUT;

@Controller
@RequestMapping("admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {
	
	private final AdminService service;
	
	/** 관리자 메인 페이지 forward
	 * @return
	 */
	@GetMapping("")
	public String admin() {
		return "admin/adminMain";
	}
	
	/** 관리자 일정 관리 페이지 forward
	 * @return
	 */
	@GetMapping("schedule")
	public String schedule() {
		return "admin/adminSchedule";
	}
	
	/** 관리자 매출 관리 페이지 forward
	 * @return
	 */
	@GetMapping("sales")
	public String sales() {
		return "admin/adminSales";
	}
	
	/** 관리자 재고 관리 페이지 forward
	 * @return
	 */
	@GetMapping("manager")
	public String manager() {
		return "admin/adminManager";
	}
	
	/** 관리자 문의 관리 페이지 forward
	 * @return
	 */
	@GetMapping("query")
	public String query() {
		return "admin/adminQuery";
	}
	
	/** 관리자 리뷰 관리 페이지 forward
	 * @return
	 */
	@GetMapping("review")
	public String review() {
		return "admin/adminReview";
	}
	
	
	// 관리자 관리페이지
	@GetMapping("adminManager")
	public String adminManager() {
		
		return "admin/adminPage";	
	}
	
	@GetMapping("myPage")
	public String adminMyPage() {
		return "admin/adminMyPage";
	}
	
	@GetMapping("request")
	public String request() {
		return "admin/adminRequest";
	}

	
//----------------------------------------------------------------------------------------------------------------------------
	
	@GetMapping("memberList")
	@ResponseBody
	public Map<String, Object> memberList(
	    @RequestParam("cp") int cp,
	    @RequestParam("sort") String sort,
	    @RequestParam(value = "term", required = false, defaultValue = "year") String term,
	    @RequestParam(value = "date", required = false) String date
	) {
	    return service.memberList(cp, term, sort, date);
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
	
	/** 계정 추가 버튼 클릭 시
	 * @param loginMember 
	 * @return
	 */
	@GetMapping("signUp")
	@ResponseBody
	public String signUp() {
		
		return service.adminSignUp();
	}
	
	/** 계정 정보 수정
	 * @param memberNo
	 * @param adminName
	 * @param adminEmail
	 * @return
	 */
	@PutMapping("adminManager")
	@ResponseBody
	public int updateAdmin(
			@RequestParam("memberNo") int memberNo,
			@RequestBody Member inputAdmin) {
		
		String adminName = inputAdmin.getAdminName();
		String adminEmail = inputAdmin.getAdminEmail();
		
		return service.updateAdmin(memberNo, adminName, adminEmail);
	}
	
	@DeleteMapping("adminManager")
	@ResponseBody
	public int deleteAdmin(
			@RequestParam("memberNo") int memberNo) {
		
		return service.deleteAdmin(memberNo);
	}
	
	@GetMapping("memberInfo")
	@ResponseBody
	public Member memberInfo(
			@RequestParam("memberNo") int memberNo) {
		
		return service.memberInfo(memberNo);
	}
	
	// 회원 등급 변경
	@PutMapping("memberUpdate")
	@ResponseBody
	public int updateMemberRank(
			@RequestBody Member member) {
		int memberNo = member.getMemberNo();
		String rankName = member.getRankName();
		
		return service.updateMemberRank(memberNo, rankName);
	}
	
	// 주문 내역
	@GetMapping("orderList")
	@ResponseBody
	public Map<String, Object> orderList(
			@RequestParam("cp") int cp,
			@RequestParam("memberNo") int memberNo) {
		
		return service.selectOrderList(cp, memberNo);
	}
	
	// 리뷰 내역
	@GetMapping("reviewList")
	@ResponseBody
	public Map<String, Object> reviewList(
			@RequestParam("cp") int cp,
			@RequestParam("memberNo") int memberNo) {
		
		return service.selectReviewList(cp, memberNo);
	}
	
	// 문의 내역
	@GetMapping("queryList")
	@ResponseBody
	public Map<String, Object> queryList(
			@RequestParam("cp") int cp,
			@RequestParam("memberNo") int memberNo) {
		
		return service.selectQueryList(cp, memberNo);
	}
}
