package phantom.books.finalProject.myPage.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.myPage.dto.Category;
import phantom.books.finalProject.myPage.dto.Preference;
import phantom.books.finalProject.myPage.service.MyPageService;

@SessionAttributes({ "loginMember" })
@Controller
@RequestMapping("myPage")
@RequiredArgsConstructor
public class MyPageController {

	private final MyPageService service;

	/**
	 * 마이페이지(내정보 페이지) 조회
	 * 
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("info")
	public String info(@SessionAttribute("loginMember") Member loginMember, Model model) {

		model.addAttribute("loginMember", loginMember);
		return "myPage/info";
	}

	/**
	 * 마이페이지(내취향 페이지)
	 * 
	 * @param loginMember
	 * @param model
	 * @return
	 */
	@GetMapping("preference")
	public String preference(Model model) {
		// 전체 카테고리와 취향 각각 조회
		List<Category> categoryList = service.getCategories();
		List<Preference> preferenceList = service.getPreference();

		
		
		System.out.println("Categories: " + categoryList);
		System.out.println("Preferences: " + preferenceList);
		

		// 모델에 데이터 추가
		model.addAttribute("categoryList", categoryList);
		model.addAttribute("preferenceList", preferenceList);
		return "myPage/preference";
	}


	/**
	 * 선호 카테고리 저장
	 * 
	 * @param category
	 * @param loginMember
	 * @return
	 */
	@PostMapping("saveCategory")
	public ResponseEntity<?> saveCategory(@RequestBody List<Integer> category,
			@SessionAttribute("loginMember") Member loginMember) {

		service.saveCategory(loginMember.getMemberNo(), category);
		return ResponseEntity.ok("Success");
	}

	/** 선호 취향 저장 */
	@PostMapping("savePreference")
	public ResponseEntity<?> savePreference(@RequestBody List<Integer> preference,
			@SessionAttribute("loginMember") Member loginMember) {
		
		service.savePreference(loginMember.getMemberNo(), preference);
		return ResponseEntity.ok("Success");
	}

	/** 선호 카테고리 불러오기 */
	@GetMapping("loadCategory")
	public ResponseEntity<List<Category>> 
	loadCategory(@SessionAttribute("loginMember") Member loginMember) {
		List<Category> category = service.getCategoryByMemberId(loginMember.getMemberNo());
		System.out.println(category);
		return ResponseEntity.ok(category);
	}

	/** 선호 취향 불러오기 */
	@GetMapping("loadPreference")
	@ResponseBody
	public ResponseEntity<List<Preference>> 
	loadPreference(@SessionAttribute("loginMember") Member loginMember) { 
		List<Preference> preference = service.getPreferenceByMemberId(loginMember.getMemberNo());
		System.out.println(preference);
		return ResponseEntity.ok(preference);
	}

}
