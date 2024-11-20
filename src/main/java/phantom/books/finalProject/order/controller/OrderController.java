package phantom.books.finalProject.order.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.cart.dto.CartDto;
import phantom.books.finalProject.common.config.PortOneConfig;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.order.dto.AddressDto;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.service.OrderService;

@Slf4j
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
@Controller
@RequestMapping("/order")
public class OrderController {

    private final OrderService service;

    @Value("${portone.channelKey}")
    private String channelKey;

    @Value("${portone.storeId}")
    private String storeId;
    
    // 주문 페이지
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

        AddressDto defaultAddress = service.getDefaultAddress(loginMember.getMemberNo());

        // 금액 계산
        int totalPrice = selectedItems.stream()
                .mapToInt(item -> item.getBookPrice() * item.getCartCount())
                .sum();

        int deliveryFee = 3500;

        model.addAttribute("channelKey", channelKey);
        model.addAttribute("storeId", storeId);
        model.addAttribute("defaultAddress", defaultAddress);
        model.addAttribute("orderItems", selectedItems);
        model.addAttribute("totalPrice", totalPrice);
        model.addAttribute("deliveryFee", deliveryFee);

        return "order/order";
    }

    @PostMapping("submit")
    public ResponseEntity<String> submitOrder(@RequestBody OrderDto orderDto,
    		@SessionAttribute(value = "loginMember", required = false) Member loginMember) {
        try {
			orderDto.setMemberNo(loginMember.getMemberNo());
            service.saveOrder(orderDto);
            
            return new ResponseEntity<>("주문 성공", HttpStatus.OK);
        } catch (Exception e) {
        	e.printStackTrace();
            return new ResponseEntity<>("주문 실패", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

