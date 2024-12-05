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

public class AdminFilter implements Filter {
  @Override
  public void doFilter(ServletRequest request, ServletResponse response, 
          FilterChain chain) throws IOException, ServletException {
      
      HttpServletRequest httpRequest = (HttpServletRequest) request;
      HttpServletResponse httpResponse = (HttpServletResponse) response;
      HttpSession session = httpRequest.getSession();
      
      String role = (String) session.getAttribute("role");
      
      if ("ADMIN".equals(role)) {
          chain.doFilter(request, response);
      } else {
          httpResponse.sendRedirect("/");  // 권한 없으면 메인으로
      }
  }
}
