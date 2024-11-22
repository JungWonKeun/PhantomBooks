package phantom.books.finalProject.admin.service;

import java.util.List;
import java.util.Map;

import phantom.books.finalProject.member.dto.Member;

public interface AdminService {

	/** 메인 페이지 회원 목록
	 * @param cp
	 * @return
	 */
	Map<String, Object> memberList(int cp, String term, String sort);

	/** 회원 삭제
	 * @param memberNo
	 * @return
	 */
	int deleteMember(int memberNo);

	int countInactiveMember();

	/** 관리자 계정 자동 생성
	 * @return
	 */
	String adminSignUp();

	/** 계정 정보수정
	 * @param memberNo
	 * @param adminName
	 * @param adminEmail
	 * @return
	 */
	int updateAdmin(int memberNo, String adminName, String adminEmail);

	
	

}
