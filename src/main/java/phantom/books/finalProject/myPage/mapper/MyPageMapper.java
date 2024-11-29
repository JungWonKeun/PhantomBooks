package phantom.books.finalProject.myPage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.myPage.dto.Category;
import phantom.books.finalProject.myPage.dto.Preference;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.query.dto.Query;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.dto.Review;

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

	// 새로운 선호 카테고리 저장
	int insertCategory(@Param("memberNo") int memberNo, @Param("categoryNo") int categoryNo);

	// 특정 회원의 기존 선호 취향 삭제
	int deletePreferenceByMemberNo(int memberNo);

	// 새로운 선호 취향 저장
	int insertPreference(@Param("memberNo") int memberNo, @Param("preferenceNo") int preferenceNo);

	// 취향 조사 여부 업데이트
	int updateCategoryYn(int memberNo);
	
	List<Category> getCategoryByMemberId(int memberNo);

	List<Preference> getPreferenceByMemberId(int memberNo);

	// 암호화된 비밀번호 조회
	String getEncryptedPassword(int memberNo);

	//회원 정보 수정
	int changeInfo(Member inputMember);

	//수정된 회원 정보 조회
	Member loginMemberByMemberNo(int memberNo);

	//비밀번호 변경
	void updatePassword(
			@Param("memberNo") int memberNo, 
			@Param("encryptedPw") String encryptedPw);

	
	// 로그인한 회원의 선호 카테고리 불러오기
	List<Category> selectCategory(int memberNo);

	// 로그인한 회원의 선호 취향 불러오기
	List<Preference> selectPreference(int memberNo);

	
	// 로그인한 회원의 구매 내역 불러오기
	List<OrderBookDto> buyList(int memberNo);
	
	// 로그인한 회원의 리뷰 작성 내역 불러오기
	List<Review> writeReview(int memberNo);
	
	// 로그인한 회원의 찜 목록 불러오기
	List<Book> wishList(int memberNo);

	// 로그인한 회원의 문의 목록 불러오기
	List<Query> queryList(int memberNo);
}
