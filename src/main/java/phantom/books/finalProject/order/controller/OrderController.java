package phantom.books.finalProject.order.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
