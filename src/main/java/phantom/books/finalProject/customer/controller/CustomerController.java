package phantom.books.finalProject.customer.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.customer.service.CustomerService;

@Controller
@RequestMapping("/")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;


    /** 고객 지원 페이지로 이동
     * @param model - View에 데이터를 전달하기 위한 Model 객체
     * @return 고객지원 페이지 템플릿 경로("customer/support")
     */
    @GetMapping("/support")
    public String customerSupportPage(Model model) {
        return "customer/support";
    }

    /** 전체 FAQ 리스트를 JSON 형태로 반환하는 메서드
     * @return 활성화된 FAQ 리스트
     */
    @GetMapping("/customer/faq")
    @ResponseBody
    public List<FAQ> getFAQList() {
        return customerService.getFAQList();
    }

    /** 특정 키워드가 포함된 FAQ 리스트를 검색하여 JSON 형태로 반환하는 메서드
     * @param query - 검색할 키워드
     * @return 검색된 FAQ 리스트
     */
    @GetMapping("/customer/faq/search")
    @ResponseBody
    public List<FAQ> searchFAQ(@RequestParam("query") String query) {
        return customerService.searchFAQ(query);
    }

    /** 공지사항 리스트를 JSON 형태로 반환
     * @return 활성화된 공지사항 리스트
     */
    @GetMapping("/customer/notice")
    @ResponseBody
    public List<Notice> getNoticeList() {
        return customerService.getNoticeList();
    }
    
}
