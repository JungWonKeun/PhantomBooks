package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.customer.dto.Notice;

@Mapper
public interface AdminNoticeMapper {

	// 리스트 수 조회
	int countNotice(
			@Param("cp") int cp,@Param("key") String key);

	// 리스트 조회
	List<Notice> noticeList(@Param("cp") int cp,@Param("key") String key, RowBounds bounds);

}
