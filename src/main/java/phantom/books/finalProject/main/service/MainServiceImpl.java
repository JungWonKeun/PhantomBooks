package phantom.books.finalProject.main.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.main.mapper.MainMapper;
import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.searchBookPage.dto.Book;

@Service
@RequiredArgsConstructor
@Slf4j
public class MainServiceImpl implements MainService {

    private final MainMapper mapper;

    @Override
    public List<Book> todayBooks() {
    	List<Book> result = mapper.todayBooks();
    	log.info("조회된 도서 개수: {}", result != null ?  result.size() : "null");
		return result;
    }

    @Override
    public List<Book> bestsellerBooks() {
        // 구매한 책 리스트 중 수량이 가장 많은 책을 일간 베스트셀러로 반환
        return mapper.getBestsellerBooks();
    }

    @Override
    public List<OrderBookDto> getBoughtBooks(int memberNo) {
        return mapper.getBoughtBooks(memberNo);
    }

    @Override
    public List<Book> getMyTypeBooks(int memberNo) {
        return mapper.getMyTypeBooks(memberNo);
    }
}


