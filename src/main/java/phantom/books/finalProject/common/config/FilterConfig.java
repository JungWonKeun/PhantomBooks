package phantom.books.finalProject.common.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import phantom.books.finalProject.common.filter.AdminFilter;
import phantom.books.finalProject.common.filter.MemberFilter;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<AdminFilter> adminFilter() {
        FilterRegistrationBean<AdminFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new AdminFilter());
        registrationBean.addUrlPatterns("/admin/*");  // 관리자 페이지 URL 패턴
        registrationBean.setOrder(1);
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<MemberFilter> memberFilter() {
        FilterRegistrationBean<MemberFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new MemberFilter());
        
        // 특정 URL 패턴만 필터 적용
        registrationBean.addUrlPatterns(
            "/member/updateCategoryYn/*",
            "/member/logout/*",
            "/member/deleteWishlist/*",
            "/order/*",
            "/myPage/*",
            "/cart/*",
            "/customer/inquiry/*",
            "/customer/query/*",
            "/customer/inquiryDetail/*"
        );
        
        registrationBean.setOrder(2);
        return registrationBean;
    }
}
