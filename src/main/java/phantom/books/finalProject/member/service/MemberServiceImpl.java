package phantom.books.finalProject.member.service;

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
public class MemberServiceImpl implements MemberService{
	
	private final MemberMapper mapper;
	
	@Override
	public Member login(String memberId, String memberPw) {
		
		Member login = mapper.login(memberId);
	
		/*
		 * if( !encorder.matches(memberPw, memberLogin.getMemberPw()) ){ return null; }
		 */
		
		return null;
	}
	
}
