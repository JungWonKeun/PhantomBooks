package phantom.books.finalProject.admin.mapper;

import java.awt.print.Book;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.session.RowBounds;

import phantom.books.finalProject.admin.dto.Request;

@Mapper
public interface AdminNewBookMapper {

	// 요청 목록 수
	int countNewBook();

	// 요청 목록
	List<Request> newBookList(RowBounds bounds);

	// 기존 책 발주인지 확인
	int selectBook(int bookNo);
	
	// requsetNo 가져오기 
	int selectRequestNo(int bookNo);
	
	// 기존 책 발주수량 추가
	int updateManager(@Param("bookNo") int bookNo, @Param("requestNo") int requestNo);
	
	// BookRequest테이블 정보 변경 
	int updateRequest(int requestNo);
	
	
	// 신간 발주인지 확인
	int selectRequest(int bookNo);
	
	// 신간 발주 내용 book삽입
	int insertRequest(@Param("bookNo")int bookNo);
	// 신간 책 재고 추가
	int updateNewBookManager(int bookNo, int requestNo);
	
	// 요청 삭제
	int deleteRequest(int requestNo);







}
