package phantom.books.finalProject.admin.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.service.AdminManagerService;
import phantom.books.finalProject.member.dto.Member;
import retrofit2.http.GET;

@Controller
@RequiredArgsConstructor
@Slf4j
@RequestMapping("admin/adminManager")
public class AdminManagerController {

	private final AdminManagerService service;
	
	//관리자 관리페이지
	@GetMapping("adminList")
	@ResponseBody
	public Map<String, Object> adminManager(@RequestParam("cp") int cp) {
		
		return service.adminManager(cp);	
	}
	
	// 이메일 중복 검사
	@GetMapping("emailCheck")
	@ResponseBody
	public int emailCheck(@RequestParam("adminEmail") String adminEmail) {
		return service.emailCheck(adminEmail);
	}
	
	@PostMapping("updateAdmin")
	public String updateAdmin(
			@ModelAttribute Member member,
			@SessionAttribute("loginMember") Member loginMember,
			RedirectAttributes ra,
			SessionStatus status,
			HttpSession session
			) {
		log.debug("로그인 정보 : {}", loginMember);
		log.debug("입력 정보 : {}", member);
		
		int memberNo = loginMember.getMemberNo();
		
		member.setMemberNo(memberNo);
		
		log.debug("memberNo 입력 정보 : {}", member);
		
		int result = service.updateAdmin(member);
		
		String message = null;
		String path = null;
		
		if(result > 0) {
			
			status.setComplete();
			
			if (session != null) {
				session.removeAttribute("passwordChecked"); // passwordChecked 속성 삭제
				session.invalidate(); // 전체 세션 무효화
			}
			
			path = "redirect:/";
			
			message = member.getAdminName() + "님의 정보를 변경하였습니다. 다시 로그인을 해주세요";
		}else {
			path = "/admin/adminMyPage";
			message = "정보 변경이 되지 않았습니다.";
		}
			ra.addFlashAttribute("message", message);
		
		return path;
	}
	

	@GetMapping("logout")
	@ResponseBody
	public String logout(SessionStatus status, HttpSession session) {
		
		status.setComplete(); 
		
		if (session != null) {
			session.removeAttribute("passwordChecked"); 
			session.invalidate(); 
		}
		
		return "redirect:/"; 
	}

}
