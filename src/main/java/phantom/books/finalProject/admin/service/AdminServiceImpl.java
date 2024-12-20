package phantom.books.finalProject.admin.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.management.Query;

import org.apache.ibatis.session.RowBounds;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.dto.Chart;
import phantom.books.finalProject.admin.mapper.AdminMapper;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.pagination.Pagination;
import phantom.books.finalProject.searchBookPage.dto.Review;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class AdminServiceImpl implements AdminService{
	
	private final AdminMapper mapper;
	private final BCryptPasswordEncoder encorder;
	
	
	// 메인 페이지 회원 목록 조회
	@Override
	public Map<String, Object> memberList(int cp, String term, String sort, String date) {
		
		// 전체 회원 수 조회
		int countMember = mapper.countMember();
		
		// 탈퇴한 회원 수 조회
		int countDelFl = mapper.countDelFl();
		
		// 6개월 이상 로그인 안 한 회원 수 조회
		int countInactiveMember = mapper.countInactiveMember();

		// sort 조건 만족하는 회원 수 조회
		int countMemberList = mapper.countMemberList(cp, term, sort, date);
		
		List<Chart> chartData = mapper.chartData(cp, term, sort, date);
		
		log.debug("조회된 값 : {}", countMemberList);
		
		Pagination pagination = new Pagination(cp, countMemberList, 10, 5);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<Member> memberList = mapper.memberList(cp, term, sort, date, bounds);
		log.debug("조회된 값 : {}", memberList);
		
		
		Map<String, Object> map = new HashMap<>();
		map.put("countMember", countMember);
		map.put("countDelFl", countDelFl);
		map.put("countMemberList", countMemberList);
		
    map.put("memberList", memberList);
    map.put("pagination", pagination);
    
    map.put("countInactiveMembers", countInactiveMember);
    map.put("chartData", chartData);
		
		return map;
	}
	
	// 회원 삭제
	@Override
	public int deleteMember(int memberNo) {
		return mapper.deleteMember(memberNo);
	}
	
	// 6개월 이상 로그인 안 한 회원 수 조회
	@Override
    public int countInactiveMember() {
        return mapper.countInactiveMember();
    }
	
	// 관리자 계정 자동 생성
	@Override
	public String adminSignUp() {
		
		int selectAdmin = mapper.selectAdmin();
		
		int memberId = selectAdmin + 1; 
		
		log.debug("memberId : {}", memberId);
		
		String encPw = encorder.encode("pass01!");
		
		int insertMember = mapper.insertMember(memberId, encPw);
		
		if(insertMember == 0) {
			return null;
		}
		
		log.debug("insertAdmin : {}", insertMember);
		int insertAdmin = mapper.insertAdmin(memberId);
		
		String adminList = mapper.adminList(memberId);
		log.debug("adminList : {}", adminList);
		return adminList;
	}

	// 계정정보 수정
	@Override
	public int updateAdmin(int memberNo, String adminName, String adminEmail) {
		return mapper.updateAdmin(memberNo, adminName, adminEmail);
	}
	
	// 계정 삭제
	@Override
	public int deleteAdmin(int memberNo) {
		
		int result = 0;
		
		result = mapper.deleteAdmin(memberNo);
		
		if(result > 0) {
			result = mapper.deleteMember(memberNo);
		}
		return result;
	}
	
	// 회원정보 조회
	@Override
	public Member memberInfo(int memberNo) {
		return mapper.memberInfo(memberNo);
	}
	
	// 회원 등급 변경
	@Override
	public int updateMemberRank(int memberNo, String rankName) {
		return mapper.updateMemberRank(memberNo, rankName);
	}
	
	// 구매목록 받아오기
	@Override
	public Map<String, Object> selectOrderList(int cp, int memberNo) {
		
		Map<String, Object> map = new HashMap<>();
		
		int countOrderList = mapper.countOrderList(memberNo);
		Pagination pagination = new Pagination(cp, countOrderList, 5, 5);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<OrderBookDto> orderList = mapper.selectOrderList(bounds, memberNo);
		map.put("orderList", orderList);
		map.put("pagination", pagination);
		
		return map;
	}
	
	@Override
	public Map<String, Object> selectReviewList(int cp, int memberNo) {

		Map<String, Object> map = new HashMap<>();
		
		int countReview = mapper.countReview(memberNo);
		
		Pagination pagination = new Pagination(cp, countReview, 5, 5);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<Review> reviewList = mapper.selectReviewList(bounds, memberNo);
		map.put("reviewList", reviewList);
		map.put("pagination", pagination);
		
		return map;
	}
	
	// 문의 내역
	@Override
	public Map<String, Object> selectQueryList(int cp, int memberNo) {
		
		Map<String, Object> map = new HashMap<>();
		
		int countQuery = mapper.countQuery(memberNo);
		
		Pagination pagination = new Pagination(cp, countQuery, 5, 5);
		
		int limit = pagination.getLimit();
		int offset = (cp-1) * limit;
		
		RowBounds bounds = new RowBounds(offset, limit);
		
		List<Query> queryList = mapper.selectQueryList(bounds, memberNo);
		map.put("queryList", queryList);
		map.put("pagination", pagination);
		
		return map;
	}
	
	// 차트 데이터 받아오기
	@Override
	public List<Chart> chartData(int cp, String sort, String term, String date) {
		return mapper.chartData(cp, term, sort, date);
	}
}
