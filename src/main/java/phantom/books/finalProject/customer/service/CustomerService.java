package phantom.books.finalProject.customer.service;

import java.util.List;
import java.util.Map;

import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.query.dto.Query;

public interface CustomerService {

	List<Notice> getNoticeList();

	int submitQuery(Query query);


//	List<Query> getInquiries();

	String getResultInquiry(Query queryNo);

	Query getResultInquiry(int queryNo);


	List<FAQ> getFaqList();

	Map<String, Object> getInquiryListByMember(int cp, int memberNo, int status, String startDate, String endDate);

	Query updateInquiry(int queryNo);

}
