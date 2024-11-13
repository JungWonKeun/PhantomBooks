package phantom.books.finalProject.cart.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import org.springframework.ui.Model;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.cart.dto.CartDto;
import phantom.books.finalProject.cart.service.CartService;
import phantom.books.finalProject.member.dto.Member;

@Slf4j
@SessionAttributes({"loginMember"})
@RequiredArgsConstructor
@Controller
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;

    @GetMapping
    public String cartPage(
            Model model,
            @SessionAttribute(value = "loginMember", required = false) Member loginMember
    ) {
        List<CartDto> cartItems;

        // 로그인 여부 체크
        if (loginMember == null) {
            log.info("로그인이 필요합니다.");
            return "redirect:/";
            
        } else {
            log.info("로그인 사용자: {}, 회원 번호: {}", loginMember.getMemberNo());
            cartItems = cartService.getCartItems(loginMember.getMemberNo());
        }

        model.addAttribute("cartItems", cartItems);
        return "cart/cart"; // 장바구니 페이지
    }
}
