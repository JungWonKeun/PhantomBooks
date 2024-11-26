package phantom.books.finalProject.cart.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.SessionAttributes;

import jakarta.servlet.http.HttpSession;

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

    private final CartService service;

    // 장바구니 페이지 목록 조회하기
    @GetMapping
    public String cartPage(
            Model model,
            @SessionAttribute(value = "loginMember", required = false) Member loginMember
    		) {
        // 로그인 여부 체크
        if (loginMember == null) {
            return "redirect:/"; 
        }


        // 로그인된 회원의 장바구니 아이템 가져오기
        List<CartDto> cartItems = service.getCartItems(loginMember.getMemberNo());

        log.debug("Cart Items: {}", cartItems);
        
        if (cartItems == null || cartItems.isEmpty()) {
            cartItems = List.of();
        }

        model.addAttribute("cartItems", cartItems);
        return "cart/cart"; 
    }
    
    // 장바구니 아이템 삭제
    @DeleteMapping("/delete/{bookNo}")
    @ResponseBody
    public ResponseEntity<String> deleteCartItem(
            @PathVariable("bookNo") int bookNo,
            @SessionAttribute(value = "loginMember", required = false) Member loginMember
    ) {
        if (loginMember == null) {
            return ResponseEntity.status(401).body("로그인이 필요합니다.");
        }


        try {
            boolean isDeleted = service.deleteCartItem(loginMember.getMemberNo(), bookNo);
            if (isDeleted) {
                return ResponseEntity.ok("장바구니 항목이 삭제되었습니다.");
            } else {
                return ResponseEntity.status(400).body("삭제 실패: 존재하지 않는 항목입니다.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("삭제 처리 중 오류가 발생했습니다.");
        }
    }

 // 선택된 장바구니 아이템 삭제
    @PostMapping("/deleteSelected")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> deleteSelectedCartItems(
        @RequestBody List<Integer> selectedItems,
        @SessionAttribute("loginMember") Member loginMember
    ) {
        Map<String, Object> response = new HashMap<>();
        try {
            int deletedCount = service.deleteSelectedCartItems(loginMember.getMemberNo(), selectedItems);
            response.put("deletedCount", deletedCount);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("error", "삭제 처리 중 오류 발생");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @PostMapping("/selectOrder")
    public String selectOrder(
            @RequestBody List<CartDto> selectedItems,
            @SessionAttribute(value = "loginMember", required = false) Member loginMember,
            HttpSession session) {
        if (selectedItems == null || selectedItems.isEmpty()) {
            return "redirect:/cart";
        }
        session.setAttribute("selectedItems", selectedItems);
        return "redirect:/order";
    }



}