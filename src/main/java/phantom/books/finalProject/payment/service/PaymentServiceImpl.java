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

    private final PaymentMapper paymentMapper;

    @Override
    public boolean savePayment(PaymentDto paymentDto) {
        try {
            int result = paymentMapper.insertPayment(paymentDto);
            return result > 0;
        } catch (Exception e) {
            log.error("ORDER_LIST 저장 실패: {}", e.getMessage());
            return false;
        }
    }
}