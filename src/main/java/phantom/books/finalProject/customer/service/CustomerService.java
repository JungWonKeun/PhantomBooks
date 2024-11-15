package phantom.books.finalProject.customer.service;

import java.util.List;

import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.dto.Notice;


public interface CustomerService {
    List<FAQ> getFAQList();
    List<FAQ> searchFAQ(String query);
    List<Notice> getNoticeList();
}
