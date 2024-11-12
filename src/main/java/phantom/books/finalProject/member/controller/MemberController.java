package phantom.books.finalProject.member.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.member.service.MemberService;

@SessionAttributes({ "loginMember" })
@Controller
@RequestMapping("member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

	private final MemberService service;

	/**
	 * 로그인 모달로 로그인 처리
	 * 
	 * @param memberId
	 * @param memberPw
	 * @param model
	 * @param ra
	 * @param session
	 * @return 성공 시 비동기로 로그인 후 모달 창 삭제, 실패 시 메세지 출력 후 로그인 모달 유지
	 */
	@PostMapping("login")
	@ResponseBody
	public Member login(
			@RequestParam("memberId") String memberId, 
			@RequestParam("memberPw") String memberPw,
			HttpSession session) {

		Member loginMember = service.login(memberId, memberPw);

		if (loginMember == null) {
			return null;
		} else {
      
			session.setAttribute("loginMember", loginMember);
			return loginMember;
		}
	}
	
	/** 회원 가입 페이지 전환
	 * @return 회원 가입 페이지
	 */
	@GetMapping("signUp")
	public String signUp() {
		return "member/signUp";
	}
	
	
}
