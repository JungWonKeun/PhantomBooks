package phantom.books.finalProject.myPage.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.myPage.dto.Category;
import phantom.books.finalProject.myPage.dto.Preference;
import phantom.books.finalProject.myPage.service.MyPageService;

@SessionAttributes({"loginMember"}) 
@Controller
@RequestMapping("myPage")
@RequiredArgsConstructor
public class MyPageController {

	private final MyPageService service;
	
	
	
	/** 마이페이지(내정보 페이지) 조회
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("info")
	public String info(
		@SessionAttribute("loginMember") Member loginMember,
		Model model) {
		
		
		
		model.addAttribute("loginMember", loginMember);
		return "myPage/info";
	}
	
	
	
	
	/** 마이페이지(내취향 페이지)
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("preference")
	public String preference(
//		@SessionAttribute("loginMember") Member loginMember,
		Model model
		) {
    // 카테고리와 선호도 각각 조회
		List<Category> categoryList = service.getCategories();
    List<Preference> preferenceList = service.getPreference();

    System.out.println("Categories: " + categoryList);
    System.out.println("Preferences: " + preferenceList);
    
    // 모델에 데이터 추가
    model.addAttribute("categoryList", categoryList);
    model.addAttribute("preferenceList", preferenceList);
		// model.addAttribute("loginMember", loginMember);
		return "myPage/preference";
	}
	
}
