package phantom.books.finalProject.order.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.service.OrderService;

@Slf4j
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
@Controller
@RequestMapping("/order")
public class OrderController {
	
	private final OrderService service;

	@RequestMapping("")
	public String orderPage() {
	    return "order/order";
	}
	 
	@GetMapping("/afterOrder")
	public String afterOrder(@RequestParam("orderId") String orderId, Model model) {
	    OrderDto order = service.findOrderByOrderId(orderId);

	    if (order == null) {
	        model.addAttribute("errorMessage", "주문 정보를 찾을 수 없습니다.");
	        return "error/error";
	    }

	    model.addAttribute("order", order);
	    return "order/afterOrder";
	}
}

