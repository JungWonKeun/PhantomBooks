package phantom.books.finalProject.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.RowBounds;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
	private final BCryptPasswordEncoder encorder;
	
	
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
	
	// 이메일 중복검사
	@Override
	public int emailCheck(String adminEmail) {
		return mapper.emailCheck(adminEmail);
	}
	
	// 관리자 정보 수정
	@Override
	public int updateAdmin(Member member) {
		
		String memberPw = encorder.encode(member.getMemberPw());
		String AdminName = member.getAdminName();
		String AdminEmail = member.getAdminEmail();
		int memberNo = member.getMemberNo();
		int result = 0;
		
		result = mapper.updatePw(memberPw, memberNo);
		
		if(result > 0) {
		 result = mapper.updateName(AdminName, memberNo);
		}
		
		if(result > 0) {
			 result = mapper.updateEmail(AdminEmail, memberNo);
			}
		
		return result;
	}
}
