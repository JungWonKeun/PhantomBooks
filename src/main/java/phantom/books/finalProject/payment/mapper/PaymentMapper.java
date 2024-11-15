package phantom.books.finalProject.payment.mapper;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.payment.dto.PaymentDto;

@Mapper
public interface PaymentMapper {
    void insertPayment(PaymentDto paymentDto);
}