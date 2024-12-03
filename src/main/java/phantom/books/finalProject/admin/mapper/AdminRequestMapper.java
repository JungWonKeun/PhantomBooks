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

	// 신간 요청 출판사 정보 기입
	void updateCompany(Request request);

	// 이메일 변경 대비 이메일  수정
	void updateEmail(String email, String companyName);
}
