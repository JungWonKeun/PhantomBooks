package phantom.books.finalProject.myPage.service;

import java.util.List;

import phantom.books.finalProject.myPage.dto.Category;
import phantom.books.finalProject.myPage.dto.Preference;

public interface MyPageService {


	// 카테고리 전체 목록 불러오기
	List<Category> getCategories();
	
	// 취향 전체 목록 불러오기
	List<Preference> getPreference();

	// 로그인한 회원의 선호 카테고리 저장
	void saveCategory(int memberNo, List<Integer> categoryNo);
	
	// 로그인한 회원의 선호 취향 저장
	void savePreference(int memberNo, List<Integer> preferenceNo);

	// 로그인한 회원의 선호 카테고리 불러오기
	List<Category> getCategoryByMemberId(int memberNo);

	// 로그인한 회원의 선호 취향 불러오기	
	List<Preference> getPreferenceByMemberId(int memberNo);


}
