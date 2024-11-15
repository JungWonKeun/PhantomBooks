package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.query.dto.Query;

@Mapper
public interface QueryMapper {

	// 문의 목록 수 조회
	int countQueryList(@Param("cp") int cp,  @Param("sort") String sort);

	// 문의 목록 받아오기
	List<Query> queryList(@Param("cp") int cp, @Param("sort") String sort, RowBounds bounds);

	// 문의 답변 등록
	int insertReply(String reply);

}
