package phantom.books.finalProject.order.dto;

import java.util.List;

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
public class OrderDto {
    private int orderNo; // 주문 번호
    private int memberNo; // 회원 번호
    private int authNo; // 인증 번호
    private String orderDate; // 주문 날짜
    private int orderCount; // 주문한 책 수량
    private int totalPrice; // 총 결제 금액
    
    // 배송 정보
    private String deliveryAddress; 
    private String receiver;

    // 주문된 책 정보 리스트
    private List<OrderBookDto> books;
}
