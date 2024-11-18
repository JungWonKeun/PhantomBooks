package phantom.books.finalProject.member.mapper;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.member.dto.Member;

@Mapper
public interface MemberMapper {

	/** memberId 일치하는 회원 정보 조회
	 * @param memberId
	 * @return loginMember 또는 null
	 */
	Member login(String memberId);

	/** memberNo에 맞는 회원의 loginDate를 현재 시간으로 수정
	 * @param memberNo
	 * @return
	 */
	int updateLoginDate(int memberNo);

	
	/** memberId 중복검사
	 * @param memberId
	 * @return
	 */
	int idCheck(String memberId);

	
	
	/**
	 * @param inputMember
	 * @return
	 */
	int signUp(Member inputMember);
	
	
}
