package phantom.books.finalProject.payment.service;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.payment.dto.PaymentDto;
import phantom.books.finalProject.payment.mapper.PaymentMapper;

@Slf4j
@RequiredArgsConstructor
@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentMapper mapper;

    @Override
    public boolean savePayment(PaymentDto paymentDto) {
        try {
            mapper.insertPayment(paymentDto);
            return true;
        } catch (Exception e) {
            log.error("결제 정보 저장 중 오류 발생: {}", e.getMessage());
            return false;
        }
    }
}