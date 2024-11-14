package phantom.books.finalProject.payment.service;


import phantom.books.finalProject.payment.dto.PaymentDto;

public interface PaymentService {
    boolean savePayment(PaymentDto paymentDto);
}

