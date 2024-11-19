package phantom.books.finalProject.myPage.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.myPage.dto.Category;
import phantom.books.finalProject.myPage.dto.Preference;
import phantom.books.finalProject.myPage.mapper.MyPageMapper;

@Transactional
@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

	private final MyPageMapper mapper;
	

	/** 카테고리 전체 목록 불러오기
	 *
	 */
	@Override
	public List<Category> getCategories() {
		return mapper.getCategories(); 
	}
	/** 취향 전체 목록 불러오기
	 *
	 */
	@Override
	public List<Preference> getPreference() {
		return mapper.getPreference();
	}


}