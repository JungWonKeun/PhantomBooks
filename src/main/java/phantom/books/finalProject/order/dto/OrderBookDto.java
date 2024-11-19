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
    private String bookCover; // 책 커버 이미지
    private int bookPrice;    // 책 가격
    private int bookCount;    // 주문 수량
}
