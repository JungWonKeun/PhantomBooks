package phantom.books.finalProject.main.mapper;


import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.order.dto.OrderBookDto;
import phantom.books.finalProject.searchBookPage.dto.Book;

import java.util.List;

@Mapper
public interface MainMapper {

    // 오늘의 추천 도서
    List<Book> todayBooks();

    // 구매한 책 리스트에서 수량이 가장 많은 책(일간 베스트셀러)
    List<Book> getBestsellerBooks();

    // 회원 구매한 책 리스트
    List<OrderBookDto> getBoughtBooks(int memberNo);

    // 취향별 추천 도서
    List<Book> getMyTypeBooks(int memberNo);
}

