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
    private int bookNo;      
    private String bookTitle; 
    private String bookCover;
    private int bookPrice;    
    private int bookCount;   
    
    private String orderId;
    private String zip;
    private String address;
    private String detailAddress;
    private int totalPrice;
    
    
}
