package phantom.books.finalProject.myPage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.myPage.dto.Category;
import phantom.books.finalProject.myPage.dto.Preference;

@Mapper
public interface MyPageMapper {

	/**
	 * 카테고리 전체 목록 불러오기
	 *
	 */
	List<Category> getCategories();

	/**
	 * 취향 전체 목록 불러오기
	 *
	 */
	List<Preference> getPreference();

	// 특정 회원의 기존 선호 카테고리 삭제
	int deleteCategoryByMemberNo(int memberNo);

	// 새로운 선호 카테고리 삽입
	int insertCategory(@Param("memberNo") int memberNo, @Param("categoryNo") int categoryNo);

	// 특정 회원의 기존 선호 취향 삭제
	int deletePreferenceByMemberNo(int memberNo);

	// 새로운 선호 취향 삽입
	int insertPreference(@Param("memberNo") int memberNo, @Param("preferenceNo") int preferenceNo);

	List<Category> getCategoryByMemberId(int memberNo);

	List<Preference> getPreferenceByMemberId(int memberNo);

	// 암호화된 비밀번호 조회
	String getEncryptedPassword(int memberNo);

	//회원 정보 수정
	int changeInfo(Member inputMember);

	//수정된 회원 정보 조회
	Member loginMemberByMemberNo(int memberNo);

}
