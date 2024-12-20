package phantom.books.finalProject.searchBookPage.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class Review {

	private int reviewNo; // 리뷰 번호
	private int bookNo; // 책 번호
	private int memberNo; // 회원 번호
	private double reviewScore; // 리뷰 점수 (0 ~ 5, 0.5 단위)
	private String reviewTitle; // 리뷰 제목
	private String reviewContent; // 리뷰 내용
	private String reviewWriteDate; // 리뷰 작성일자
	private String reviewUpdateDate; // 리뷰 수정일자
	private String reviewImgNo; // 첨부 이미지 파일명
	private String memberId; // 회원 아이디

	
	// 관리자 페이지에서 이용 예정
	private String bookTitle;
	private String bookCover;

	
	// 리뷰 파일 
	private int fileNo;
	private String fileOriginalName;
	private String fileRename;
	private String filePath;
	private String updateDate;
		
}
