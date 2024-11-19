package phantom.books.finalProject.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.mapper.QueryMapper;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.query.dto.Query;

@Service
@Transactional
@RequiredArgsConstructor
public class QueryServiceImpl implements QueryService{
	
	private final QueryMapper mapper;
	
	// 문의 목록 받아오기
	@Override
		public Map<String, Object> queryList(int cp, String sort) {
			
			// sort 조건 만족하는 문의 리스트 수 조회
			int countQueryList = mapper.countQueryList(cp, sort);
			
			// 페이지네이션
			Pagination pagination = new Pagination(cp, countQueryList, 10, 5);
			
			int limit = pagination.getLimit();
			int offset = (cp-1) * limit;
			
			RowBounds bounds = new RowBounds(offset, limit);
			
			List<Query> queryList = mapper.queryList(cp, sort, bounds);
			
			Map<String, Object> map = new HashMap<>();
	    
			map.put("queryList", queryList);
			map.put("pagination", pagination);
	    
			
			return map;
		}
	
	
	// 문의 답변 등록
	@Override
	public int insertReply( int queryNo, String inputReply) {
		return mapper.insertReply(queryNo, inputReply);
	}
	
	// 문의 삭제
	@Override
	public int deleteQuery(int queryNo) {
		return mapper.deleteQuery(queryNo);
	}

}
