package phantom.books.finalProject.customer.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.customer.mapper.CustomerMapper;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.query.dto.Query;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

	private final CustomerMapper customerMapper;

	@Override
	public List<FAQ> getFAQList() {
		return customerMapper.selectFAQList();
	}

	@Override
	public List<FAQ> searchFAQ(String query) {
		return customerMapper.searchFAQ(query);
	}

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

	// 1:1 문의 리스트 조회
	@Override
	public Map<String, Object> getInquiryList(int cp) {
		Map<String, Object> map = null;
		
		int countQueryList = customerMapper.countQueryList(cp);
		Pagination pagination = new Pagination(1, countQueryList, 10, 5);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<Query> queryList = customerMapper.queryList(cp, bounds);
		
		map = new HashMap<>();
		map.put("queryList", queryList);
		map.put("pagination", pagination);
		
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
}
