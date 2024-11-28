package phantom.books.finalProject.member.service;

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



	void updateCategoryYn(int memberNo);


}
