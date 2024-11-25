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
    private int bookCount;    // 책 재고
    private int orderCount;   // 주문 수량

    private String orderId;   // 주문 ID
    private String zip;       // 배송 우편번호
    private String address;   // 배송 주소
    private String detailAddress; // 배송 상세 주소
    private int totalPrice;   // 책의 총 가격
}

