package phantom.books.finalProject.order.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.service.AfterOrderService;

@RequiredArgsConstructor
@Controller
@RequestMapping("/order")
public class AfterOrderController {

	private final AfterOrderService service;
	
	@GetMapping("/afterOrder")
	public String afterOrderPage(
	    @RequestParam("orderNo") int orderNo, 
	    Model model
	) {
	    OrderDto order = service.getOrderDetails(orderNo);

	    // 모델에 데이터 추가
	    model.addAttribute("order", order);
	    model.addAttribute("orderItems", order.getOrderItems());
	    model.addAttribute("totalItemPrice", order.getTotalPrice() - order.getDeliveryFee());

	    return "order/afterOrder";
	}


}
