package phantom.books.finalProject.customer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.customer.service.CustomerService;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.query.dto.Query;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
@Slf4j
public class CustomerController {

	private final CustomerService customerService;

	/**
	 * 고객 지원 페이지로 이동
	 * 
	 * @param model - View에 데이터를 전달하기 위한 Model 객체
	 * @return 고객지원 페이지 템플릿 경로("customer/support")
	 */
	@GetMapping("/support")
	public String customerSupportPage(Model model) {
		
	    // FAQ 목록 조회
	    List<FAQ> faqList = customerService.getFaqList();
	    log.debug("FAQ 목록: {}", faqList);  // 로그 추가
	    // 공지사항 목록 조회
	    List<Notice> noticeList = customerService.supportNoticeList();
	    log.debug("공지사항 목록: {}", noticeList);  // 로그 추가
	    
	    model.addAttribute("faqList", faqList);
	    model.addAttribute("noticeList", noticeList);
	    
		return "customer/support";
	}

	/**
	 * 1:1 문의 작성 페이지로 이동
	 * 
	 * @param model - View에 데이터를 전달하기 위한 Model 객체
	 * @return 1:1 문의 페이지의 템플릿 경로("customer/query")
	 */
	@GetMapping("/customer/query")
	public String customerQueryPage(Model model) {
		return "customer/query";
	}

	/**
	 * 1:1 문의 제출 처리
	 * 
	 * @param query
	 * @param loginMember
	 * @return
	 */
	@PostMapping("/customer/query/submit")
	@ResponseBody
	public int submitQuery(@RequestBody Query query, @SessionAttribute("loginMember") Member loginMember) {

		query.setMemberNo(loginMember.getMemberNo());

		// DB에 삽입
		int result = customerService.submitQuery(query);

		return result;
	}

	// FAQ 데이터를 HTML 페이지로 전달하는 메서드
	@GetMapping("/customer/qna")
	public String faq(Model model) {
		List<FAQ> faqList = customerService.getFaqList();
		model.addAttribute("faqList", faqList);
		return "customer/qna";
	}

	/**
	 * 1:1문의 내역 페이지로 이동
	 * 
	 * @param model - View에 데이터를 전달하기 위한 Model 객체
	 * @return 1:1 문의 내역 페이지 템플릿 경로("customer/inquiry")
	 */
	@GetMapping("/customer/inquiry")
	public String getInquiryList(@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "status", required = false, defaultValue = "-1") int status,
			@RequestParam(value = "startDate", required = false, defaultValue = "default") String startDate,
			@RequestParam(value = "endDate", required = false, defaultValue = "default") String endDate,
			@RequestParam(value = "project", required = false, defaultValue = "1") int project,
			@SessionAttribute("loginMember") Member loginMember, Model model) {

		int memberNo = loginMember.getMemberNo();

		// 사용자별 문의 내역 조회
		Map<String, Object> map = customerService.getInquiryListByMember(cp, memberNo, status, startDate, endDate,
				project);

		model.addAttribute("inquiryList", map.get("queryList"));
		model.addAttribute("pagination", map.get("pagination"));

		return "customer/inquiry";
	}

	/**
	 * 1:1문의 내역 페이지로 이동
	 * 
	 * @param model - View에 데이터를 전달하기 위한 Model 객체
	 * @return 1:1 문의 내역 페이지 템플릿 경로("customer/inquiry")
	 */
	@GetMapping("/customer/inquiry/queryList")
	@ResponseBody
	public Map<String, Object> getquiryList(@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "status", required = false, defaultValue = "-1") int status,
			@RequestParam(value = "startDate", required = false, defaultValue = "default") String startDate,
			@RequestParam(value = "endDate", required = false, defaultValue = "default") String endDate,
			@RequestParam(value = "project", required = false, defaultValue = "1") int project,
			@SessionAttribute("loginMember") Member loginMember, Model model) {

		int memberNo = loginMember.getMemberNo();

		return customerService.getInquiryListByMember(cp, memberNo, status, startDate, endDate, project);
	}

	/**
	 * 특정 문의 내역을 조회하여 상세 페이지로 이동
	 * 
	 * @param queryNo 조회할 문의의 고유 번호입니다. (PathVariable로 전달됨)
	 * @param model   조회된 문의 데이터를 뷰에 전달하기 위해 사용됩니다.
	 * @return 문의 상세 정보를 보여주는 뷰 이름 ("customer/inquiryDetail")
	 */
	@GetMapping("/customer/inquiryDetail/{queryNo}")
	public String getResultInquiry(@PathVariable("queryNo") int queryNo, Model model) {

		Query inquiry = customerService.getResultInquiry(queryNo);

		model.addAttribute("inquiry", inquiry);

		return "customer/inquiryDetail";
	}

	/**
	 * 문의글 수정하기
	 * 
	 * @param queryNo     : 문의글 번호
	 * @param loginMember : 로그인된 사용자 정보
	 * @return
	 */
	@GetMapping("/customer/inquiryUpdate/{queryNo}")
	public String getInquiryUpdatePage(@PathVariable("queryNo") int queryNo, Model model) {
		Query query = customerService.getResultInquiry(queryNo); // 수정할 데이터 조회
		model.addAttribute("query", query); // 뷰에 데이터 전달
		return "customer/inquiryUpdate";
	}

	@PostMapping("/customer/inquiryUpdate")
	public String updateInquiry(@ModelAttribute Query query, @SessionAttribute("loginMember") Member loginMember) {
		query.setMemberNo(loginMember.getMemberNo()); // 로그인된 회원 정보 추가
		customerService.updateInquiry(query); // 서비스 호출로 업데이트 처리
		return "redirect:/customer/inquiry"; // 수정 완료 후 목록으로 리디렉션
	}

	@DeleteMapping("/customer/inquiryDetail")
	@ResponseBody
	public int deleteInquiry(@RequestParam("queryNo") int queryNo,
			@SessionAttribute("loginMember") Member loginMember) {
		log.debug("queryNo : {}", queryNo);
		int memberNo = loginMember.getMemberNo();

		return customerService.deleteInquiry(queryNo, memberNo);
	}

}