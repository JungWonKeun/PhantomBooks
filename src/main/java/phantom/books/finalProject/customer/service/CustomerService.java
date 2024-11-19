package phantom.books.finalProject.customer.service;

import java.util.List;
import java.util.Map;

import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.query.dto.Query;

public interface CustomerService {
	List<FAQ> getFAQList();

	List<FAQ> searchFAQ(String query);

	List<Notice> getNoticeList();

	int submitQuery(Query query);

	List<FAQ> getFaqList();

//	List<Query> getInquiries();

	String getResultInquiry(Query queryNo);

	Query getResultInquiry(int queryNo);

	// 문의 리스트 조회
	Map<String, Object> getInquiryList(int cp);
}
