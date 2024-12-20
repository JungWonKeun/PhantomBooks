package phantom.books.finalProject.customer.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.customer.mapper.CustomerMapper;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.query.dto.Query;

@Service
@RequiredArgsConstructor
@Transactional
public class CustomerServiceImpl implements CustomerService {

	private final CustomerMapper customerMapper;

	@Override
	public List<Notice> getNoticeList() {
		return customerMapper.selectNoticeList();
	}

	@Override
	public int submitQuery(Query query) {
		return customerMapper.submitQuery(query);
	}

	@Override
	public List<FAQ> getFaqList() {
		return customerMapper.getFaqList();
	}
	
	
	@Override
	public Map<String, Object> getFAQPaginaion(int cp) {
	    // FAQ 전체 개수 조회
	    int listCount = customerMapper.countFAQList();
	    List<FAQ> faqList = customerMapper.getFaqList();
	    
	    Map<String, Object> map = new HashMap<>();
	    map.put("listCount", listCount);
	    map.put("faqList", faqList);
	    
	    return map;
	    
	}
	@Override
	public String getResultInquiry(Query queryNo) {
		return customerMapper.getresultInquiry(queryNo);
	}

	@Override
	public Query getResultInquiry(int queryNo) {
		return customerMapper.getResultInquiry(queryNo);
	}

	@Override
	public Map<String, Object> getInquiryListByMember(int cp, int memberNo, int status, String startDate,
			String endDate, int project) {

		// 조건 만족하는 문의리스트 수 조회
		int countQueryList = customerMapper.countQueryList(cp, memberNo, status, startDate, endDate, project);

		// 페이지네이션
		Pagination pagination = new Pagination(cp, countQueryList, 5, 5);

		int limit = pagination.getLimit();
		int offset = (cp - 1) * limit;

		RowBounds bounds = new RowBounds(offset, limit);

		List<Query> queryList = customerMapper.queryList(cp, memberNo, status, startDate, endDate, project, bounds);

		Map<String, Object> map = new HashMap<>();

		map.put("queryList", queryList);
		map.put("pagination", pagination);

		return map;
	}

	@Override
	public int updateInquiry(int queryNo, int memberNo) {
		return customerMapper.updateInquiry(queryNo, memberNo);
	}

	@Override
	public void updateInquiry(Query query) {
		customerMapper.updateInquiry(query);
	}

	@Override
	public int deleteInquiry(int queryNo, int memberNo) {
		return customerMapper.deleteInquiry(queryNo, memberNo);
	}
	
	@Override
	public List<Notice> supportNoticeList() {
		return customerMapper.supportNoticeList();
	}
}