package phantom.books.finalProject.member.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.member.mapper.MemberMapper;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class MemberServiceImpl implements MemberService {

	private final MemberMapper mapper;
	private final BCryptPasswordEncoder encorder;

	@Override
	public Member login(String memberId, String memberPw) {

		// 1. memberEmail이 일치하는 회원의 정보를 DB에서 조회
		Member loginMember = mapper.login(memberId);

		// 이메일(id)이 일치하는 회원 정보가 없을 경우
		if (loginMember == null)
			return null;

		// DB에서 조회된 비밀번호와, 입력 받은 비밀번호가 같은지 확인
		if (!encorder.matches(memberPw, loginMember.getMemberPw()))
			return null;

		// id와 비밀번호가 모두 같을 경우 loginDate를 현재 시간으로 수정
		int updateCount = mapper.updateLoginDate(loginMember.getMemberNo());
		if (updateCount == 0) {
			throw new RuntimeException("로그인 날짜 업데이트에 실패했습니다.");
		}

		// 로그인 결과 반환
		return loginMember;
	}

}
