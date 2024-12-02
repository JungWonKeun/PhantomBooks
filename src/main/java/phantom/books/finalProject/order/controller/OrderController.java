package phantom.books.finalProject.order.controller;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.cart.dto.CartDto;
import phantom.books.finalProject.common.config.PortOneConfig;
import phantom.books.finalProject.member.dto.Member;
import phantom.books.finalProject.order.dto.AddressDto;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.order.dto.OrderDto;
import phantom.books.finalProject.order.service.AfterOrderService;
import phantom.books.finalProject.order.service.OrderService;

@Slf4j
@SessionAttributes({ "loginMember" })
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
	public String orderPage(@SessionAttribute(value = "selectedItems", required = false) List<CartDto> selectedItems,
			@SessionAttribute(value = "loginMember", required = false) Member loginMember, Model model) {

		if (loginMember == null) {
			return "redirect:/";
		}

		if (selectedItems == null || selectedItems.isEmpty()) {
			model.addAttribute("errorMessage", "선택된 주문 항목이 없습니다.");
			return "error/error";
		}

		log.debug("Selected Items: {}", selectedItems);

		AddressDto defaultAddress = service.getDefaultAddress(loginMember.getMemberNo());

		// 금액 계산
		int totalPrice = selectedItems.stream().mapToInt(item -> item.getBookPrice() * item.getCartCount()).sum();

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
	@ResponseBody
	public ResponseEntity<Map<String, Object>> submitOrder(@RequestBody OrderDto orderDto,
			@SessionAttribute(value = "loginMember", required = false) Member loginMember) {
		try {
			if (loginMember == null) {
				throw new IllegalStateException("로그인이 필요합니다.");
			}

			log.debug("Received OrderDto: {}", orderDto);

			// 배송비 설정
			orderDto.setDeliveryFee(3500);

			// 로그인한 회원 번호 설정
			orderDto.setMemberNo(loginMember.getMemberNo());

			// 디버깅: 전달된 배송지 정보 확인
			log.debug("User Address Info - Zip: {}, Address: {}, Detail: {}", orderDto.getUserZip(),
					orderDto.getUserAddress(), orderDto.getUserDetailAddress());

			// 주문 저장 서비스 호출
			int orderNo = service.saveOrder(orderDto);

			return ResponseEntity.ok(Map.of("success", true, "orderNo", orderNo));
		} catch (Exception e) {
			log.error("Order submission error: ", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("success", false, "message", "주문 처리 중 오류가 발생했습니다."));
		}
	}

}
