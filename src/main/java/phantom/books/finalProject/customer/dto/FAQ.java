package phantom.books.finalProject.customer.dto;

import java.util.Date;

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
public class FAQ {
    private int faqId;           // FAQ_ID
    private String question;     // QUESTION
    private String answer;       // ANSWER
    private String categoryName; // CATEGORY_NAME
    private Date currentDate;    // CURRENT_DATE
    private Date updateDate;     // UPDATE_DATE
    private int views;           // VIEWS
    private int status;          // STATUS
}
