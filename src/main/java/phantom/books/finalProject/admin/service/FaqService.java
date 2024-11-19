package phantom.books.finalProject.admin.service;

import java.util.Map;

public interface FaqService {

	// FAQ 리스트 조회 
	Map<String, Object> faqList(String key, int cp);

}
