package phantom.books.finalProject.admin.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ChartSales {
	
	private int bookNo;  					// 책 번호
	private String bookTitle; 		// 책 제목
	private int bookPrice;				// 책 가격
	private int bookCount;				// 책 주문 수량
	private int orderCount;				// 주문 수량
	
	private int categoryNo; 			// 카테고리 번호
	private String categoryName;	// 카테고리 이름
	
	private int orderPrice;				// 판매 가격
	private int requestPrice;			// 발주요청 가격
	private int requestCount;			// 요청 수량
	
	private String orderDate;     // 주문일자
}
