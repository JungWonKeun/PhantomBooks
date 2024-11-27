package phantom.books.finalProject.searchBookPage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Builder
public class Book {


	    private int bookNo;            // 책 번호
	    private String bookTitle;       // 책 제목
	    private String bookContent;     // 책 내용
	    private String bookCover;       // 책 표지 이미지 경로
	    private String bookWriter;      // 지은이
	    private String companyName;     // 출판사
	    private String bookTalt;        // 옮긴이
	    private String bookPrice;       // 가격
	    private int bookPageCount;      // 페이지 수
	    private char bookYn;            // 책 여부
	    private String bookDate;        // 출간일
	    private String insertDate;      // 등록일자
	    private double scoreAvg;      // 점수 평근

	    /* 책 관리 테이블 정보*/
	    private int currentCount;				// 책 개수
	    private int basicCount; 				// 기본 책 수량
	    
	    /*프리퍼런스*/
	    private int preferenceNo;   		// 프리퍼런스 번호
	    private String preferenceName; 		// 프리퍼런스 이름
	    
	    /* 카테고리 */
	    private int categoryNo;					// 카테고리 번호
	    private String categoryName;			// 카테고리 이름
	    
	    /*장바구니에 집어 넣을 회원 번호*/
	    private int memberNo;
	    
	    private String Email;    // 출판사 이메일
	    private String tel;				// 출판사 전화번호
	    

	
}
