package phantom.books.finalProject.myPage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.myPage.dto.Category;
import phantom.books.finalProject.myPage.dto.Preference;

@Mapper
public interface MyPageMapper {

	/** 카테고리 전체 목록 불러오기
	 *
	 */
	List<Category> getCategories();
	
	/** 취향 전체 목록 불러오기
	 *
	 */
	List<Preference> getPreference();
}
