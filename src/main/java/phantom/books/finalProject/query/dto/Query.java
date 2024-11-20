package phantom.books.finalProject.query.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Query {

	private int    queryNo;
	private int    memberNo;
	private String queryTitle;
	private String queryContent;
	private String queryWriteDate;
	private String queryUpdateDate;
	private String reply;
	private int	   status;
	private String querySubject;
	
	private String memberId;
	
	
}
