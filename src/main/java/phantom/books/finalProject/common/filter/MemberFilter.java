package phantom.books.finalProject.common.filter;

import java.io.IOException;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import phantom.books.finalProject.member.dto.Member;

public class MemberFilter implements Filter {
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest httpRequest = (HttpServletRequest) request;
		HttpServletResponse httpResponse = (HttpServletResponse) response;
		HttpSession session = httpRequest.getSession();

		Member loginMember = (Member) session.getAttribute("loginMember");
		String requestURI = httpRequest.getRequestURI();

		// excludedUrls 파라미터 가져오기
		String excludedUrls = request.getServletContext().getInitParameter("excludedUrls");

		// 제외된 URL인 경우 필터링하지 않음
		if (excludedUrls != null && requestURI.equals(excludedUrls)) {
			chain.doFilter(request, response);
			return;
		}

		boolean isAjax = "XMLHttpRequest".equals(httpRequest.getHeader("X-Requested-With"));


		// 로그인한 사용자가 회원가입 페이지 접근 시 메인으로 리다이렉트
		if (loginMember != null && requestURI.equals("/member/signUp")) {
			if (isAjax) {
				httpResponse.setStatus(HttpServletResponse.SC_FORBIDDEN);
				httpResponse.setContentType("application/json;charset=UTF-8");
				httpResponse.getWriter().write("{\"status\":\"error\",\"message\":\"이미 로그인된 상태입니다.\"}");
			} else {
				httpResponse.sendRedirect("/");
			}
			return;
		}

		// 기존 로직
		if (loginMember != null) {
			chain.doFilter(request, response);
		} else {
			if (isAjax) {
				// AJAX 요청일 경우 401 상태 코드와 JSON 응답
				httpResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				httpResponse.setContentType("application/json;charset=UTF-8");
				httpResponse.getWriter().write("{\"status\":\"error\",\"message\":\"로그인이 필요합니다.\"}");
			} else {
				// 일반 요청일 경우 로그인 페이지로 리다이렉트
				httpResponse.sendRedirect("/?showLoginModal=true");
			}
		}
	}
}