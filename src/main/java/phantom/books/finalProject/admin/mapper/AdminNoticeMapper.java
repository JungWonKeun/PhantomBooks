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

	// 공지사항 작성
	int insertNotice(Notice notice);

	// 공지사항 수정
	int updateNotice(Notice notice);

	// 공지사항 삭제
	int deleteNotice(int noticeId);

	int updateStatus(int noticeId);

	Notice noticeInfo(int noticeId);

}
