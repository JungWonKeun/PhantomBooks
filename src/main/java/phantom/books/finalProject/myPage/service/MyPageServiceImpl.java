package phantom.books.finalProject.myPage.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.myPage.dto.Category;
import phantom.books.finalProject.myPage.dto.Preference;
import phantom.books.finalProject.myPage.mapper.MyPageMapper;

@Transactional
@Service
@RequiredArgsConstructor
public class MyPageServiceImpl implements MyPageService {

	private final MyPageMapper mapper;

	/**
	 * 카테고리 전체 목록 불러오기
	 *
	 */
	@Override
	public List<Category> getCategories() {
		return mapper.getCategories();
	}

	/**
	 * 취향 전체 목록 불러오기
	 *
	 */
	@Override
	public List<Preference> getPreference() {
		return mapper.getPreference();
	}

	@Override
	public void saveCategory(int memberNo, List<Integer> categoryNo) {
		mapper.deleteCategoryByMemberNo(memberNo);

		for (int category : categoryNo) {
			mapper.insertCategory(memberNo, category);
		}
	}

	@Override
	public void savePreference(int memberNo, List<Integer> preferenceNo) {
		mapper.deletePreferenceByMemberNo(memberNo);

		for (int preference : preferenceNo) {
			mapper.insertPreference(memberNo, preference);
		}
	}

	@Override
	public List<Category> getCategoryByMemberId(int memberNo) {
		return mapper.getCategoryByMemberId(memberNo);
	}

	@Override
	public List<Preference> getPreferenceByMemberId(int memberNo) {
		return mapper.getPreferenceByMemberId(memberNo);
	}

	@Override
	public boolean checkPassword(int memberNo, String password) {
		// 저장된 암호화된 비밀번호 조회
		String encryptedPassword = mapper.getEncryptedPassword(memberNo);

		// BCryptPasswordEncoder를 사용하여 비밀번호 비교
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		return encoder.matches(password, encryptedPassword);
	}

	@Override
	public Member changeInfo(Member inputMember) {
		mapper.changeInfo(inputMember);
		
	return mapper.loginMemberByMemberNo(inputMember.getMemberNo());
		
	}

}
