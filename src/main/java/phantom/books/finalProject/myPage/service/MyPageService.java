package phantom.books.finalProject.myPage.service;

import java.util.List;

import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.myPage.dto.Category;
import phantom.books.finalProject.myPage.dto.Preference;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.query.dto.Query;
import phantom.books.finalProject.searchBookPage.dto.Book;
import phantom.books.finalProject.searchBookPage.dto.Review;

public interface MyPageService {


	// 카테고리 전체 목록 불러오기
	List<Category> getCategories();
	
	// 취향 전체 목록 불러오기
	List<Preference> getPreference();

	// 로그인한 회원의 선호 카테고리 저장
	void saveCategory(int memberNo, String categoryYn, List<Integer> categoryNo);
	
	// 로그인한 회원의 선호 취향 저장
	void savePreference(int memberNo,	String preferenceYn, List<Integer> preferenceNo);

	// 로그인한 회원의 선호 카테고리 불러오기
	List<Category> getCategoryByMemberId(int memberNo);

	// 로그인한 회원의 선호 취향 불러오기	
	List<Preference> getPreferenceByMemberId(int memberNo);
	
	// 정보 조회/수정 페이지 비밀번호 체크
	boolean checkPassword(int memberNo, String password);

	// 정보 변경
	Member changeInfo(Member inputMember);

	// 비밀번호 변경
	int changePassword(String currentPw, String newPw, Member loginMember);

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
