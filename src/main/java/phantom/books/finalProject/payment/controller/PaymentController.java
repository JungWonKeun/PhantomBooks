package phantom.books.finalProject.payment.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.payment.dto.PaymentDto;
import phantom.books.finalProject.payment.service.PaymentService;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService service;

    @PostMapping("")
    public ResponseEntity<String> savePayment(@RequestBody PaymentDto paymentDto) {
        boolean isSaved = service.savePayment(paymentDto);
        if (isSaved) {
            return ResponseEntity.ok("결제 정보가 ORDER_LIST에 저장되었습니다.");
        } else {
            return ResponseEntity.status(500).body("ORDER_LIST 저장 실패!");
        }
    }
}