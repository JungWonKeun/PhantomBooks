package phantom.books.finalProject.main;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.main.service.MainService;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.searchBookPage.dto.Book;

@RequestMapping("/")
@Controller
@RequiredArgsConstructor
public class MainController {

	private final MainService service;

	@GetMapping("")
	public String main() {
		return "main/main";
	}

	@GetMapping("/main")
	public String getCategoryBookList(
	    Model model,
	    @SessionAttribute(value = "loginMember", required = false) Member loginMember
	) {
	    // 오늘의 추천 도서 (모든 사용자가 볼 수 있음)
	    List<Book> books = service.todayBooks();
	    model.addAttribute("books", books);

	    // 로그인한 사용자만을 위한 데이터
	    if (loginMember != null) {
	        int memberNo = loginMember.getMemberNo();
	        
	        List<Book> bestsellerBooks = service.bestsellerBooks(memberNo);
	        List<OrderBookDto> boughtBooks = service.getBoughtBooks(memberNo);
	        List<Book> myTypeBooks = service.getMyTypeBooks(memberNo);
	        
	        model.addAttribute("bestsellerBooks", bestsellerBooks);
	        model.addAttribute("boughtBooks", boughtBooks);
	        model.addAttribute("myTypeBooks", myTypeBooks);
	    }

	    return "main/main";
	}


}
