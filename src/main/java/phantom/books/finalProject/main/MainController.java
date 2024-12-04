package phantom.books.finalProject.main;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.main.service.MainService;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.searchBookPage.dto.Book;

@RequestMapping("/")
@Controller
@RequiredArgsConstructor
@Slf4j
public class MainController {

	private final MainService service;


	@GetMapping({"/main", ""})
	public String getCategoryBookList(
	    Model model,
	    @SessionAttribute(value = "loginMember", required = false) Member loginMember
	) {
	    // 오늘의 추천 도서 (모든 사용자가 볼 수 있음)
	    List<Book> books = service.todayBooks();
	    log.info("조회된 오늘의 추천 도서:{}", books);
	    model.addAttribute("books", books);
	    List<Book> bestsellerBooks = service.bestsellerBooks();
	    model.addAttribute("bestsellerBooks", bestsellerBooks);
	    // 로그인한 사용자만을 위한 데이터
	    if (loginMember != null) {
	        int memberNo = loginMember.getMemberNo();
	        
	        List<OrderBookDto> boughtBooks = service.getBoughtBooks(memberNo);
	        List<Book> myTypeBooks = service.getMyTypeBooks(memberNo);
	        
	        model.addAttribute("boughtBooks", boughtBooks);
	        model.addAttribute("myTypeBooks", myTypeBooks);
	    }

	    return "main/main";
	}
	
	@GetMapping("about")
    public String showAboutPage() {
        log.info("회사 소개 페이지 요청됨");
        return "common/about";  
    }
	
	@GetMapping("partnership")
	public String showPartnerShipPage() {
		log.info("제휴문의 페이지 요청됨");
		return "common/partnership";  
	}
	
	@GetMapping("/career")
	public String showCareerPage() {
	    log.info("채용 정보 페이지 요청됨");
	    return "common/career";
	}
	
	@GetMapping("/intellectual")
	public String showIntellectualPropertyPage() {
	    log.info("지식재산권 침해 신고 페이지 요청됨");
	    return "common/intellectual";
	}
	
	@GetMapping("/business")
	public String showBusinessInquiryPage() {
	    log.info("기업 고객 문의 페이지 요청됨");
	    return "common/business";
	}

	@GetMapping("/terms")
	public String showTermsPage() {
	    return "common/terms";
	}

	@GetMapping("/privacy")
	public String showPrivacyPage() {
	    return "common/privacy";
	}

	@GetMapping("/youth")
	public String showYouthPage() {
	    return "common/youth";
	}

	@GetMapping("/refund")
	public String showRefundPage() {
	    return "common/refund";
	}

	@GetMapping("/importantPrice")
	public String showBookPricePage() {
	    return "common/importantPrice";
	}
}
