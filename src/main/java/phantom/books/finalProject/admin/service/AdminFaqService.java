package phantom.books.finalProject.admin.service;

import java.util.Map;

import phantom.books.finalProject.customer.dto.FAQ;

public interface AdminFaqService {

	// FAQ 리스트 조회 
	Map<String, Object> faqList(String key, int cp);

	// FAQ 추가하기
	int insertFaq(FAQ faq);

	// 노출 상태 변경
	int updateFaq(int faqId);

}
