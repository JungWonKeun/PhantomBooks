package phantom.books.finalProject.customer.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.customer.dto.Notice;

@Mapper
public interface NoticeMapper {

	int countNoticeList();

	List<Notice> noticeList(RowBounds bounds);

	Notice selectNotice(int noticeId);

	int updateReadCount(int noticeId);

	
}
