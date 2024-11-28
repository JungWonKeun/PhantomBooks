package phantom.books.finalProject.main.mapper;


import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.searchBookPage.dto.Book;

import java.util.List;

@Mapper
public interface MainMapper {

    List<Book> getDailyRecommendedBooks();

    List<Book> getBooksByUserPreference(int userId);

    List<Book> getBestsellerBooks();
}
