package phantom.books.finalProject.order.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.cart.dto.CartDto;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.service.OrderService;

@Slf4j
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
@Controller
@RequestMapping("/order")
public class OrderController {
    private final OrderService service;

    @GetMapping("")
    public String orderPage(
            @SessionAttribute(value = "selectedItems", required = false) List<CartDto> selectedItems,
            @SessionAttribute(value = "loginMember", required = false) Member loginMember,
            Model model) {

        if (loginMember == null) {
            return "redirect:/";
        }

        if (selectedItems == null || selectedItems.isEmpty()) {
            model.addAttribute("errorMessage", "선택된 주문 항목이 없습니다.");
            return "error/error";
        }

        int totalPrice = selectedItems.stream()
                .mapToInt(item -> item.getBookPrice() * item.getCartCount())
                .sum();
        
        int deliveryFee = 3500;

        model.addAttribute("orderItems", selectedItems);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("deliveryFee", deliveryFee);
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
    
    

    @PostMapping("/process")
    public String processOrder(
            @RequestBody List<Map<String, Object>> selectedItems,
            @SessionAttribute("loginMember") Member loginMember,
            Model model) {

        if (loginMember == null) {
            return "redirect:/login";
        }

        List<OrderDto> orderItems = selectedItems.stream()
                .map(item -> service.getOrderItemByBookNoAndQuantity(
                        (Integer) item.get("bookNo"), 
                        (Integer) item.get("quantity")))
                .collect(Collectors.toList());

        model.addAttribute("orderItems", orderItems);
        return "order/order";
    }
}
