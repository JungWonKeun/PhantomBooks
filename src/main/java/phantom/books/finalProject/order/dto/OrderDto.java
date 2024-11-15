package phantom.books.finalProject.order.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import phantom.books.finalProject.searchBookPage.dto.Book;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class OrderDto {
	private int orderNo;
    private int memberNo;
    private int authNo;
    private String orderDate;
    private int orderCount;
    private int totalPrice; 

    // 배송 정보
    private String deliveryAddress; 
    private String receiver;

    // 책 정보 리스트
    private List<Book> books;
    
    private int bookNo;        
    private int bookCount;    
    private int bookPrice; 
}
