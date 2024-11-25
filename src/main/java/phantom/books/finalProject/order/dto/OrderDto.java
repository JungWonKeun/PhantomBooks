package phantom.books.finalProject.order.dto;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class OrderDto {
	
	private int orderNo;
	private int memberNo;
	private Date orderDate;
	private int orderCount;
	private int totalPrice;
	private int deliveryFee;
	private String paymentStatus;
	private String userZip;
	private String userAddress;
	private String userDetailAddress;
	private String userTelNo;
	private String userName;

	 private List<OrderBookDto> orderBooks;
	 
	
}
