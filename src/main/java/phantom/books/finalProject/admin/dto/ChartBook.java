package phantom.books.finalProject.admin.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class ChartBook {
	
	// 책 재고 확인
	private int countBook;
	private String bookTitle;
}
