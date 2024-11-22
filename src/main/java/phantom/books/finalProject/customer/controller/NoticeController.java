package phantom.books.finalProject.customer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.customer.service.NoticeService;
import phantom.books.finalProject.pagination.Pagination;

@Controller
@RequestMapping("/customer")
@RequiredArgsConstructor
@Slf4j
public class NoticeController {

	private final NoticeService service;
	
	@GetMapping("notice")
	public String noticeList(Model model,
							@RequestParam(value = "cp", required = false, defaultValue = "1") int cp) {
		
		Map<String, Object> map = null;
		
		map = service.viewNoticeList(cp);
		
		List<Notice> noticeList = (List<Notice>)map.get("noticeList");
		Pagination pagination = (Pagination)map.get("pagenation");
		
		model.addAttribute("noticeList", noticeList);
		model.addAttribute("pagination", pagination);
		
		return "customer/notice";
	}
	
	@GetMapping("noticeDetail/{noticeId}")
	public String noticeDetail(@PathVariable("noticeId") int noticeId, 
						Model model,
						HttpServletRequest req,
						HttpServletResponse resp) {
		
		Notice notice = service.selectNotice(noticeId);
		
		if (notice != null) {
			// 쿠키를 이용한 조회수 증가 처리
			Cookie plusCookie = null;
			Cookie[] cookies = req.getCookies();
			
			// 기존 쿠키 확인하기
			if(cookies != null) {
				for (Cookie cookie : cookies) {
					if(cookie.getName().equals("readNoticeId")) {
						plusCookie = cookie;
						break;
					}
				}
			}
			
			int result = 0;
			if(plusCookie == null) {
				// 쿠키가 없다면 새로 생성하고 조회수 증가
				plusCookie = new Cookie("readNoticeId", "|" + noticeId + "|");
				result = service.updateReadCount(noticeId);
			} else if (!plusCookie.getValue().contains("|" + noticeId + "|")) {
				// 쿠키에 현재 공지 ID가 없으면 조회수 증가
				plusCookie.setValue(plusCookie.getValue() + "|" + noticeId + "|");
				result = service.updateReadCount(noticeId);
			}
			
			if(result > 0) {
				// 조회 수 증가가 성공 하면 쿠키 속성 설정하기
				plusCookie.setPath("/");
				plusCookie.setMaxAge(60*60*24); // 하루 유지
				resp.addCookie(plusCookie);
				
				// 동기화 된 조회수를 반영하기
				notice.setView(notice.getView() + 1);
			}
			System.out.println("최종 조회수:" + notice.getView());
		}
		
		model.addAttribute("notice", notice);
		return "customer/noticeDetail";
	}
}
