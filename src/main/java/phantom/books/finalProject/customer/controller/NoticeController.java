package phantom.books.finalProject.customer.controller;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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
		    // 조회수 증가
		    int result = service.updateReadCount(noticeId);

		    if (result > 0) {
		        // 동기화 된 조회수를 반영하기
		        notice.setView(notice.getView() + 1);
		    }
		    System.out.println("최종 조회수:" + notice.getView());
		}

		
		model.addAttribute("notice", notice);
		return "customer/noticeDetail";
	}
}
