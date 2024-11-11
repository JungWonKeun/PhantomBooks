package phantom.books.finalProject.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.member.service.MemberService;

@SessionAttributes({"loginMember"})
@Controller
@RequestMapping("member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

	private final MemberService service;
	
	
	@PostMapping("login")
	@ResponseBody
	public Map<String, Object> login(
	        @RequestParam("memberId") String memberId,
	        @RequestParam("memberPw") String memberPw,
	        HttpServletRequest request) {
	    
	    Map<String, Object> response = new HashMap<>();
	    Member loginMember = service.login(memberId, memberPw);
	    
	    if (loginMember == null) { // 로그인 실패
	        response.put("success", false);
	        response.put("message", "아이디 또는 비밀번호가 일치하지 않습니다");
	    } else {
	        // 로그인 성공 시 세션에 사용자 정보 저장
	        request.getSession().setAttribute("loginMember", loginMember);
	        response.put("success", true);
	        response.put("loginMember", loginMember);  // DTO 객체가 JSON으로 변환되어 담김
	    }
	    
	    return response; // JSON 응답 반환
	}
	
}
