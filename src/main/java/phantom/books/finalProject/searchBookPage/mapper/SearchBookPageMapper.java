package phantom.books.finalProject.searchBookPage.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.searchBookPage.dto.Book;

@Mapper
public interface SearchBookPageMapper {

	List<Book> allBook ();

}
