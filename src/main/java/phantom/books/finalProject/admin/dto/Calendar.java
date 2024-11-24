package phantom.books.finalProject.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Calendar {
	
	private int  		memberNo;
  private int	 	calendarNo;   	// 일정 번호
  private String 	title;				// 일정 제목 
  private String 	startDate;		// 일정 시작일
  private String 	endDate;			// 일정 종료일
  private boolean allDay;			// 종일 일정여부
}
