package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.member.dto.Member;

@Mapper
public interface AdminMapper {

	// 메인페이지 페이지네이션
	int countMemberList(String sort);

	
	// 회원리스트
	List<Member> memberList(String sort, RowBounds bounds);


	// 회원 삭제
	int deleteMember(int memberNo);


	int countMember();
	
	

}
