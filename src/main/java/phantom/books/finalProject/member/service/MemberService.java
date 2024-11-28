package phantom.books.finalProject.member.service;

import java.util.List;

import phantom.books.finalProject.member.dto.Member;

public interface MemberService {

	/** 로그인 서비스
	 * @param memberId
	 * @param memberPw
	 * @return loginMember 또는 null(email 또는 pw 불일치)
	 */
	Member login(String memberId, String memberPw);

	
	
	/** 아이디 중복검사
	 * @param memberId
	 * @return 
	 */
	int idCheck(String memberId);



	/** 회원 가입
	 * @param inputMember
	 * @return result
	 */
	int signUp(Member inputMember);



	/** 다시 보지 않기를 체크한 회원번호에 맞는 회원의 categoryYn를 Y로 변경
	 * @param memberNo
	 */
	void updateCategoryYn(int memberNo);



	/** 전화번호로 아이디 찾기
	 * @param telNo
	 * @return
	 */
	List<String> findIdByTelNo(String telNo);



	/** 아이디와 전화번호가 일치하는 회원 확인
	 * @param telNo
	 * @param memberId
	 */
	void checkIdAndTel(String telNo, String memberId);


	
	/** 비밀번호 변경
	 * @param memberId
	 * @param memberPw
	 */
	void updatePassword(String memberId, String memberPw);


}
