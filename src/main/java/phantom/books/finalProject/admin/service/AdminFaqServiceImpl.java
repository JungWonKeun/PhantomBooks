package phantom.books.finalProject.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.mapper.AdminFaqMapper;
import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.query.dto.Query;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminFaqServiceImpl implements AdminFaqService {

	private final AdminFaqMapper mapper;
	
	// FAQ 리스트 조회
	@Override
	public Map<String, Object> faqList(String key, int cp) {
	// sort 조건 만족하는 문의 리스트 수 조회
		
				int countFaqList = mapper.countFaqList(key);
				
				// 페이지네이션
				Pagination pagination = new Pagination(cp, countFaqList, 10, 5);
				
				int limit = pagination.getLimit();
				int offset = (cp-1) * limit;
				
				RowBounds bounds = new RowBounds(offset, limit);
				
				List<FAQ> faqList = mapper.faqList(cp, key, bounds);
				
				Map<String, Object> map = new HashMap<>();
		    
				map.put("faqList", faqList);
		    map.put("pagination", pagination);
		    
				
				return map;
	}

	// FAQ 추가하기 
	@Override
	public int insertFaq(FAQ faq) {
		return mapper.insertFaq(faq);
	}
	
	// 노출상태 변경
	@Override
	public int updateFaq(int faqId) {
		return mapper.updateFaq(faqId);
	}
	
	// 삭제
	@Override
	public int deleteFaq(int faqId) {
		return mapper.deleteFaq(faqId);
	}
	
}
