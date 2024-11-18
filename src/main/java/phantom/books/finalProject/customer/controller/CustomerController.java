package phantom.books.finalProject.customer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
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
	 * 전체 FAQ 리스트를 JSON 형태로 반환하는 메서드
	 * 
	 * @return 활성화된 FAQ 리스트
	 */
	@GetMapping("/customer/faq")
	@ResponseBody
	public List<FAQ> getFAQList() {
		return customerService.getFAQList();
	}

	/**
	 * 특정 키워드가 포함된 FAQ 리스트를 검색하여 JSON 형태로 반환하는 메서드
	 * 
	 * @param query - 검색할 키워드
	 * @return 검색된 FAQ 리스트
	 */
	@GetMapping("/customer/faq/search")
	@ResponseBody
	public List<FAQ> searchFAQ(@RequestParam("query") String query) {
		return customerService.searchFAQ(query);
	}

	/**
	 * 공지사항 페이지로 이동
	 * @return 
	 */
	@GetMapping("/customer/notice")
	public String getNoticeList() {
		return "customer/notice";
	}

	/**
	 * 1:1 문의 페이지로 이동
	 * 
	 * @param model - View에 데이터를 전달하기 위한 Model 객체
	 * @return 1:1 문의 페이지의 템플릿 경로("customer/query")
	 */
	@GetMapping("/customer/query")
	public String customerQueryPage(Model model) {
		// query.html 템플릿을 반환
		return "customer/query";
	}

	/** 1:1 문의 제출 처리
	 * @param query
	 * @param loginMember
	 * @return
	 */
	@PostMapping("/customer/query/submit")
	@ResponseBody
	public int submitQuery(
		@RequestBody Query query, @SessionAttribute("loginMember") Member loginMember) {

		query.setMemberNo(loginMember.getMemberNo());

		// DB에 삽입
		int result = customerService.submitQuery(query);

		return result;
	}
	
	/**
	 * 1:1문의 내역 페이지로 이동
	 * 
	 * @param model - View에 데이터를 전달하기 위한 Model 객체
	 * @return 고객지원 페이지 템플릿 경로("customer/support")
	 */
	@GetMapping("/customer/inquiry")
	public String queryList (Model model) {
		return "customer/inquiry";
	}
	
	/** 자주묻는 질문 페이지로 이동
	 * @param model - 데이터를 전달하기 위한 Model 객체
	 * @return 자주묻는 질문 페이지 템플릿 경로("customer/faq")
	 */
	@GetMapping("/customer/qna")
	public String faq (Model model) {
		return "customer/qna";
	}
}
