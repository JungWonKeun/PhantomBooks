package phantom.books.finalProject.main;

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
	
	
    /** 오늘의 추천도서
     * @param model : 
     * @return
     */
    @GetMapping("/daily")
    public String getDailyRecommendedBooks(Model model) {

    	// 추천 도서로 사용될 전체 도서 리스트
    	List<Book> books = service.getDailyRecommendedBooks();
        
        
        model.addAttribute("books", books);
        
        return "dailyRecommendation";
    }

    /** 취향별 추천 도서
     * @param model : 얻어와야 하는 DTO들의 집합
     * @param loginMember
     * @return
     */
    @GetMapping("/preferences")
    public String getBooksByUserPreference(
    			Model model,
    			@SessionAttribute("loginMember") Member loginMember
    		) {
    	
    	int memberNo = loginMember.getMemberNo();
        List<Book> books = service.getBooksByUserPreference(memberNo);
        model.addAttribute("books", books);
        return "preferenceRecommendation";
    }
	
}
