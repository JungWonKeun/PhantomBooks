package phantom.books.finalProject.customer.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import phantom.books.finalProject.customer.dto.FAQ;
import phantom.books.finalProject.customer.dto.Notice;
import phantom.books.finalProject.customer.mapper.CustomerMapper;
import phantom.books.finalProject.query.dto.Query;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerMapper customerMapper;

    @Override
    public List<FAQ> getFAQList() {
        return customerMapper.selectFAQList();
    }

    @Override
    public List<FAQ> searchFAQ(String query) {
        return customerMapper.searchFAQ(query);
    }

    @Override
    public List<Notice> getNoticeList() {
        return customerMapper.selectNoticeList();
    }
    
    @Override
    public int submitQuery(Query query) {
    	return customerMapper.submitQuery(query);
    }
}
