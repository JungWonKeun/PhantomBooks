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
	    private int bookPrice;          // 가격
	    private int bookPageCount;      // 페이지 수
	    private char bookYn;            // 책 여부
	    private String bookDate;        // 출간일


	
}
