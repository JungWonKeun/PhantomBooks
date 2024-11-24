package phantom.books.finalProject.admin.service;

import java.util.List;

import phantom.books.finalProject.admin.dto.Calendar;

public interface AdminScheduleService {

	
	 /**
   * 캘린더 일정 조회하기
   * @return
   * @throws Exception
   */
  List<Calendar> calendarList() throws Exception;

  /**
   * 캘린더 일정 저장하기
   * @param calendar
   * @return 
   * @throws Exception
   */
  int calendarSave(Calendar calendar) throws Exception;

  /**
   * 캘린더 일정 삭제하기
   * @param no
   * @throws Exception
   */
  void calendarDelete(int calendarNo) throws Exception;

  /**
   * 캘린더 일정 수정하기
   * @param calendar
   * @throws Exception
   */
  void eventUpdate(Calendar calendar) throws Exception;

}
