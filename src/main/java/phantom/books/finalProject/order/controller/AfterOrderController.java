package phantom.books.finalProject.order.controller;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.service.AfterOrderService;

@Controller
@RequiredArgsConstructor
@RequestMapping("/afterOrder")
public class AfterOrderController {

    private final AfterOrderService service;

    @GetMapping("/afterOrder")
    public String afterOrder(@RequestParam("orderId") String orderId, Model model) {
        OrderDto order = service.findOrderByOrderId(orderId);

        if (order == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "주문 정보를 찾을 수 없습니다.");
        }

        model.addAttribute("order", order);
        return "order/afterOrder"; 
    }
}
