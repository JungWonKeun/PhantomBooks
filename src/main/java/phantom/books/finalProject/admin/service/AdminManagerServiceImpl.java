package phantom.books.finalProject.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.admin.mapper.AdminManagerMapper;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.pagination.Pagination;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminManagerServiceImpl implements AdminManagerService {
	
	private final AdminManagerMapper mapper;
	
	@Override
	public Map<String, Object> adminManager(int cp) {
		
		
		int countAdmin = mapper.countAdmin();
		
		Pagination pagination = new Pagination(cp, countAdmin, 10, 5);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<Member> adminList = mapper.adminList(bounds);
		
		Map<String, Object> map = new HashMap<>();
		
    map.put("memberList", adminList);
    map.put("pagination", pagination);
		
		return map;
	}
	
	
}
