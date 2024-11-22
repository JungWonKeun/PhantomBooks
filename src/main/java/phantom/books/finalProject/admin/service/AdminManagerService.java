package phantom.books.finalProject.admin.service;

import java.util.Map;

import phantom.books.finalProject.member.dto.Member;

public interface AdminManagerService {

	// 관리자 페이지 리스트
	Map<String, Object> adminManager(int cp);

	// 이메일 중복 검사
	int emailCheck(String adminEmail);

	// 관리자 정보 수정
	int updateAdmin(Member member);

}
