package phantom.books.finalProject.payment.dto;

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
public class PaymentDto {
	private int orderNo;        
    private int memberNo;       
    private int bookNo;         
    private int bookCount;      
    private int orderPrice;     
    private int discountPrice;  
    private String refundYn;       
}