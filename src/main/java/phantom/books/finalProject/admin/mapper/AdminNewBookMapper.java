package phantom.books.finalProject.admin.mapper;

import java.awt.print.Book;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.admin.dto.Request;

@Mapper
public interface AdminNewBookMapper {

	// 요청 목록 수
	int countNewBook();

	// 요청 목록
	List<Request> newBookList(RowBounds bounds);

}
