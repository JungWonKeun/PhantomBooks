package phantom.books.finalProject.order.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.order.service.AfterOrderService;


@Slf4j
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
@Controller
@RequestMapping("/afterorder")
public class AfterOrderController {

	private final AfterOrderService service;
	
    @GetMapping("")
    public String afterOrderPage() {
        return "order/afterOrder";
    }
}