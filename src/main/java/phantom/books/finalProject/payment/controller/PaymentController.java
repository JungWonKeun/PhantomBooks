package phantom.books.finalProject.payment.controller;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.payment.dto.PaymentDto;
import phantom.books.finalProject.payment.service.PaymentService;

@Slf4j
@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService service;

    @PostMapping("")
    public ResponseEntity<String> savePayment(@RequestBody PaymentDto paymentDto) {
        boolean isSaved = service.savePayment(paymentDto);
        if (isSaved) {
            log.info("결제 성공: {}", paymentDto);
            return ResponseEntity.ok("결제 정보가 저장되었습니다.");
        } else {
            log.error("결제 정보 저장 실패: {}", paymentDto);
            return ResponseEntity.status(500).body("결제 정보 저장 실패!");
        }
    }
}
