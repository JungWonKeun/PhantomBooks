package phantom.books.finalProject.customer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.service.CustomerService;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.query.dto.Query;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
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
	public String getInquiryList(
	        @RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
	        @RequestParam(value = "status", required = false, defaultValue = "-1") int status, 
	        @RequestParam(value = "startDate", required = false, defaultValue = "default") String startDate,
	        @RequestParam(value = "endDate", required = false, defaultValue = "default") String endDate,
	        @SessionAttribute("loginMember") Member loginMember,
	        Model model) {

	    int memberNo = loginMember.getMemberNo();

	    // 사용자별 문의 내역 조회
	    Map<String, Object> map = customerService.getInquiryListByMember(cp, memberNo, status, startDate, endDate);
	    
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
	public Map<String, Object> getquiryList(
			@RequestParam(value = "cp", required = false, defaultValue = "1") int cp,
			@RequestParam(value = "status", required = false, defaultValue = "-1") int status, 
			@RequestParam(value = "startDate", required = false, defaultValue = "default") String startDate,
			@RequestParam(value = "endDate", required = false, defaultValue = "default") String endDate,
			@SessionAttribute("loginMember") Member loginMember,
			Model model) {
		
		int memberNo = loginMember.getMemberNo();
		
		
		return customerService.getInquiryListByMember(cp, memberNo, status, startDate, endDate);
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


	
	/** 문의글 수정하기
	 * @param queryNo
	 * @param model
	 * @return
	 */
	@GetMapping("/customer/inquiry/{queryNo}")
	public String updateInquiry(@PathVariable("queryNo") int queryNo, Model model) {
		
	    Query inquiry = customerService.updateInquiry(queryNo);
	    model.addAttribute("inquiry", inquiry);
	    return "customer/inquiryModify";
	}
	

}
