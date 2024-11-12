package phantom.books.finalProject.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.mapper.AdminMapper;
import phantom.books.finalProject.pagination.Pagination;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{
	
	private final AdminMapper mapper;
	
	// 메인 페이지 회원 목록 조회
	@Override
	public Map<String, Object> memberList(int cp, String sort) {
		
		int countMemberList = mapper.countMemberList(cp, sort);
		Pagination pagination = new Pagination(cp, countMemberList, 10, 5);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<Member> memberList = mapper.memberList(bounds);
		
		Map<String, Object> map = new HashMap<>();
    map.put("memberList", memberList);
    map.put("pagination", pagination);
		
		return map;
	}
	
}
