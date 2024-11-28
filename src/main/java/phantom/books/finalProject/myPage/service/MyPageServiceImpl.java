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
	public void saveCategory(int memberNo, String categoryYn, List<Integer> categoryNo) {
		mapper.deleteCategoryByMemberNo(memberNo);
		
		for (int category : categoryNo) {
			mapper.insertCategory(memberNo, category);
		}
		if (categoryYn.equals("N")) {
			mapper.updateCategoryYn(memberNo);
		}
	}

	@Override
	public void savePreference(int memberNo, String categoryYn,List<Integer> preferenceNo) {
		mapper.deletePreferenceByMemberNo(memberNo);

		for (int preference : preferenceNo) {
			mapper.insertPreference(memberNo, preference);			
		}
		
		if (categoryYn.equals("N")) {
			mapper.updateCategoryYn(memberNo);
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

	@Override
  public int changePassword(String currentPw, String newPw, Member loginMember) {
		
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		
      // 1. 로그인한 회원의 비밀번호 가져오기
      String dbPassword = loginMember.getMemberPw();

      // 2. 입력된 현재 비밀번호와 로그인한 회원의 비밀번호 비교
      if (!encoder.matches(currentPw, dbPassword)) {
          return 1; // 현재 비밀번호 불일치
      }

      // 3. 새 비밀번호와 현재 비밀번호가 같은지 확인
      if (encoder.matches(newPw, dbPassword)) {
          return 2; // 새 비밀번호가 현재 비밀번호와 같음
      }

      // 4. 새 비밀번호 암호화 후 DB 업데이트
      int memberNo = loginMember.getMemberNo();
      String encryptedPw = encoder.encode(newPw);
      mapper.updatePassword(memberNo, encryptedPw);
      return 3; // 비밀번호 변경 성공
	}
}
