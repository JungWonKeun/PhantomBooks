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

    // 입력된 아이디와 비밀번호 로그 확인
    log.debug("로그인 시도 - ID: " + memberId + ", PW: " + memberPw);
		
    String encPw = encorder.encode(memberPw);
		// 1. memberId가 일치하는 회원의 정보를 DB에서 조회
		Member loginMember = mapper.login(memberId);

    log.debug("DB 조회된 Member: " + loginMember);
    log.debug("암호화된 비밀번호 : " + encPw);

    
		// 이메일(id)이 일치하는 회원 정보가 없을 경우
		if (loginMember == null) {
      log.debug("로그인 실패 - 회원 정보 없음");
			return null;
		}

		// DB에서 조회된 비밀번호와, 입력 받은 비밀번호가 같은지 확인
		if (!encorder.matches(memberPw, loginMember.getMemberPw())) {
      log.debug("로그인 실패 - 비밀번호 불일치");
			return null;
		}
		
		// DB에서 조회된 회원의 authority가 2인 경우 (관리자)
		if (loginMember.getAuthority() == 2) {
			loginMember = mapper.adminLogin(loginMember.getMemberNo());
			
			log.debug("로그인 성공 - 로그인한 회원: " + loginMember);
			return loginMember;
		}
		
		// id와 비밀번호가 모두 같을 경우 loginDate를 현재 시간으로 수정
		int updateCount = mapper.updateLoginDate(loginMember.getMemberNo());
		if (updateCount == 0) {
			throw new RuntimeException("로그인 날짜 업데이트에 실패했습니다.");
		}

    // 로그인 성공
    log.debug("로그인 성공 - 로그인한 회원: " + loginMember);
    return loginMember;
	}
	
	/** 회원가입
	 * @param inputMember
	 * @return 
	 */
	@Override
	public int signUp(Member inputMember) {
		
		// 1) 비밀번호 암호화(BCrypt)
		String encPw = encorder.encode(inputMember.getMemberPw());
		inputMember.setMemberPw(encPw);
		
		// 2) 생일, 주소 미입력("") 시 null로 변경
		if(inputMember.getBirthDate().equals("")) {
			inputMember.setBirthDate(null);
		}
		
		if(inputMember.getZip().equals("")) {
			inputMember.setZip(null);
		}
		if(inputMember.getAddress().equals("")) {
			inputMember.setAddress(null);
		}
		if(inputMember.getDetailAddress().equals("")) {
			inputMember.setDetailAddress(null);
		}
		
		// 3) mapper 호출 후 결과 반환
		return mapper.signUp(inputMember);
	}
	
	
	
	/** 아이디 중복 검사
	 * @return 0 : 아이디 중복 없음, 1 : 아이디 중복
	 */
	@Override
	public int idCheck(String memberId) {
		return mapper.idCheck(memberId);
	}

}
