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

	private int bookNo;
	private String bookTite;
	private String bookContent;
	private String boolCover;
	private String bookWriter;
	private String companyName;
	private String bookTalt;
	private String bookPrice;
	private String bookPageCount;
	private String bookYn;
	
	
}
