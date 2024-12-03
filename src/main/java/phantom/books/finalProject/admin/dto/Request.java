package phantom.books.finalProject.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Request {
	
  private int bookNo;            	// 책 번호
  private String bookTitle;       // 책 제목
  private String bookContent;     // 책 내용
  private String bookCover;       // 책 표지 이미지 경로
  private String bookWriter;      // 지은이
  private String companyName;     // 출판사
  private String bookTalt;        // 옮긴이
  private String bookPrice;       // 가격
  private int bookPageCount;      // 페이지 수
  private String bookDate;        // 출간일
  private String insertDate;      // 등록일자

  /* 책 관리 테이블 정보*/
  private int currentCount;				// 책 개수
  private int basicCount; 				// 기본 책 수량
  
	/* 발주요청 테이블 정보*/
  private int requestNo;					// 발주요청 번호
  private int requestCount;				// 발주요청 수량
  private String requestPrice;		// 발주요청 가격
  private String requestDate; 		// 발주요청일
  
	/* 출판사 정보 */
  private String email;    				// 출판사 이메일
  private String tel;							// 출판사 전화번호
  
  // 신간 등록 : request DTO로 받아와서
  // 						 신규 책 등록(newBookRequest)에 저장
  //						 등록 버튼 클릭 시 book 테이블 저장
}
