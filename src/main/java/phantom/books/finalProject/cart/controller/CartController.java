package phantom.books.finalProject.cart.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
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
        // 로그인 여부 체크
        if (loginMember == null) {
            log.info("로그인이 필요합니다.");
            return "redirect:/"; // 로그인 페이지나 홈으로 리다이렉트
        }

        log.info("로그인 사용자: {}, 회원 번호: {}", loginMember.getMemberNo(), loginMember.getMemberNo());

        // 로그인된 회원의 장바구니 아이템 가져오기
        List<CartDto> cartItems = cartService.getCartItems(loginMember.getMemberNo());

        if (cartItems == null || cartItems.isEmpty()) {
            log.info("장바구니가 비어 있습니다.");
            cartItems = List.of(); // 빈 리스트로 초기화
        }

        model.addAttribute("cartItems", cartItems);
        return "cart/cart"; // Thymeleaf 장바구니 페이지
    }
    
    
    


}

