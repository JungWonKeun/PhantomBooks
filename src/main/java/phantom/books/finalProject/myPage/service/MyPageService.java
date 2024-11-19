package phantom.books.finalProject.myPage.service;

import java.util.List;

import phantom.books.finalProject.myPage.dto.Category;
import phantom.books.finalProject.myPage.dto.Preference;

public interface MyPageService {


	// 카테고리 전체 목록 불러오기
	List<Category> getCategories();
	
	// 취향 전체 목록 불러오기
	List<Preference> getPreference();

}
