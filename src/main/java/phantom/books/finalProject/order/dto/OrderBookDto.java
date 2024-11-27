package phantom.books.finalProject.order.dto;

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
public class OrderBookDto {

    private int bookNo;       // 책 번호
    private String bookTitle; // 책 제목
    private String bookCover; // 책 표지
    private int bookPrice;    // 책 가격
    private int bookCount;    // 책 수량
    private int orderCount;   // 주문 수량
    
    private int discountPrice;
    private String refundYn;
    private int orderPrice;      // 판매 금액 (bookPrice × bookCount)
    private int memberNo; 
    private int orderNo;   
    private String zip;       
    private String address;   
    private String detailAddress; 
    private int totalPrice;  
}

