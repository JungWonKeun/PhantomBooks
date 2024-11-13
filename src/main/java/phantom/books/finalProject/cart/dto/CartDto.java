package phantom.books.finalProject.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CartDto {
	private int bookNo;
	private String bookTitle;
	private String bookCover;
	private int bookPrice;
	private int cartCount;
}
