package phantom.books.finalProject.member.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import phantom.books.finalProject.member.dto.Member;

@Mapper
public interface MemberMapper {

	/**
	 * memberId가 일치하는 회원 정보 조회
	 * 
	 * @param memberId
	 * @return loginMember 또는 null
	 */
	Member login(String memberId);

	/**
	 * memberNo에 맞는 회원의 loginDate를 현재 시간으로 수정
	 * 
	 * @param memberNo
	 * @return
	 */
	int updateLoginDate(int memberNo);

	/**
	 * memberId 중복검사
	 * 
	 * @param memberId
	 * @return
	 */
	int idCheck(String memberId);

	/**
	 * @param inputMember
	 * @return
	 */
	int signUp(Member inputMember);

	/**
	 * memberId가 일치하는 관리자 정보 조회
	 * 
	 * @param memberId
	 * @return
	 */
	Member adminLogin(int memberNo);

	/**
	 * 다시 보지 않기를 체크하거나 조사를 완료한 회원번호에 맞는 회원의 categoryYn를 Y로 변경
	 * 
	 * @param memberNo
	 */
	void updateCategoryYn(int memberNo);

	/**
	 * 전화번호로 아이디 찾기
	 * 
	 * @param telNo
	 * @return
	 */
	List<String> findIdByTelNo(String telNo);

	/**
	 * 아이디와 전화번호가 일치하는 회원 확인
	 * 
	 * @param telNo
	 * @param memberId
	 * @return
	 */
	int checkIdAndTel(
			@Param("telNo") String telNo, 
			@Param("memberId") String memberId);

	
	/** 비밀번호 변경
	 * @param memberId
	 * @param encPw
	 * @return 
	 */
	int updatePassword(
			@Param("memberId") String memberId, 
			@Param("encPw") String encPw);


	
	/** 찜 삭제
	 * @param memberNo
	 * @param bookNoList
	 */
	void deleteWishlist(
			@Param("memberNo") int memberNo, 
			@Param("bookNoList") List<Integer> bookNoList);


}
