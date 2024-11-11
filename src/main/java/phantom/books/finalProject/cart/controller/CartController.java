package phantom.books.finalProject.cart.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.cart.service.CartService;

@Slf4j
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
@Controller
@RequestMapping("/cart")
public class CartController {

	private final CartService service;
	
	 @RequestMapping("")
	 public String orderPage() {
	     return "cart/cart";
	 }
}
