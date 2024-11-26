package phantom.books.finalProject.order.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.service.AfterOrderService;

@Slf4j
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

	    if (order.getOrderBooks() == null || order.getOrderBooks().isEmpty()) {
	        log.warn("주문 번호 {}에 해당하는 주문 책 목록이 비어 있습니다.", orderNo);
	    }
	    
	    // 모델에 데이터 추가
	    model.addAttribute("order", order);
	    model.addAttribute("orderItems", order.getOrderBooks());
	    model.addAttribute("totalPrice", order.getTotalPrice());
	    return "order/afterOrder";
	}


}
