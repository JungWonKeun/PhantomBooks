package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.member.dto.Member;

@Mapper
public interface AdminMapper {

	// 전체 회원수 카운트
	int countMember();

	// 탈퇴 회원 수 조회
	int countDelFl();
	
	// 메인페이지 페이지네이션
	int countMemberList(@Param("term") String term, @Param("sort") String sort);

	// 회원리스트
	List<Member> memberList(@Param("term") String term, @Param("sort") String sort, RowBounds bounds);

	// 회원 삭제
	int deleteMember(int memberNo);



	
	

}
