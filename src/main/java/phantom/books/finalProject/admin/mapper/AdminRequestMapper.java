package phantom.books.finalProject.admin.mapper;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.searchBookPage.dto.Book;

@Mapper
public interface AdminRequestMapper {

	// 발주요청 메일 발송 후 정보 저장
	int insertRequestList(Book book);

}
