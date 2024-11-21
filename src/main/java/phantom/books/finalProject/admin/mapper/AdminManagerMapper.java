package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.member.dto.Member;

@Mapper
public interface AdminManagerMapper {

	// 관리자 계정 count
	int countAdmin();

	// 관리자 계정 리스트 조회
	List<Member> adminList(RowBounds bounds);
	
}
