package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.admin.dto.Chart;
import phantom.books.finalProject.member.dto.Member;

@Mapper
public interface AdminMapper {

	// 전체 회원수 카운트
	int countMember();

	// 탈퇴 회원 수 조회
	int countDelFl();
	
	// 메인페이지 페이지네이션
	int countMemberList(@Param("cp") int cp, @Param("term") String term, @Param("sort") String sort, @Param("date") String date);

	// 회원리스트
	List<Member> memberList(@Param("cp") int cp, @Param("term") String term, @Param("sort") String sort, @Param("date") String date, RowBounds bounds);

	// 회원 삭제
	int deleteMember(int memberNo);

	// 6개월 이상 로그인 안 한 회원 수 조회
  int countInactiveMember();

  // admin계정 조회
  int selectAdmin();

  // Member Table 관리자 계정 자동생성
  int insertMember(@Param("memberId") int memberId,
  								@Param("encPw") String encPw);
  
  int insertAdmin(int memberId);

  // 리스트 조회
	String adminList(int memberId);

	// 계정 정보 수정
	int updateAdmin(@Param("memberNo") int memberNo,
									@Param("adminName") String adminName,
									@Param("adminEmail") String adminEmail);

	// 계정 삭제
	int deleteAdmin(int memberNo);

	// 차트에 사용할 데이터
	List<Chart> chartData(@Param("cp") int cp,
												@Param("term") String term, 
												@Param("sort") String sort,
												@Param("date") String date);
	
	

}
