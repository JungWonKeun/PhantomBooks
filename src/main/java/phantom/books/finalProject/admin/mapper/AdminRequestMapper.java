package phantom.books.finalProject.admin.mapper;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.admin.dto.Request;
import phantom.books.finalProject.searchBookPage.dto.Book;

@Mapper
public interface AdminRequestMapper {

	// 발주요청 정보 저장
	int insertRequestList(Book book);

	// 신간 요청 정보 저장
	int insertNewBookRequest(Request request);

	// 신간 요청 정보 저장
	int insertNewBookList(Request request);

}
