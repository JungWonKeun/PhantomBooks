package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.member.dto.Member;

@Mapper
public interface AdminManagerMapper {

	// 관리자 계정 count
	int countAdmin();

	// 관리자 계정 리스트 조회
	List<Member> adminList(RowBounds bounds);

	// 이메일 중복검사
	int emailCheck(String adminEmail);
	
	// 비밀번호 변경
	int updatePw(@Param("memberPw") String memberPw,
							 @Param("memberNo") int memberNo);

	// 이름 변경
	int updateName(@Param("adminName") String adminName,
			 @Param("memberNo") int memberNo);

	// 이메일 변경
	int updateEmail(@Param("adminEmail") String adminEmail,
			 @Param("memberNo") int memberNo);

	
}
