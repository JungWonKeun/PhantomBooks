package phantom.books.finalProject.admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import phantom.books.finalProject.admin.dto.Calendar;

@Mapper
public interface AdminScheduleMapper {

  /**
   * 캘린더 일정 조회하기
   * @return
   * @throws Exception
   */
  List<Calendar> calendarList() throws Exception;

  /**
   * 캘린더 일정 저장하기
   * @param vo
   * @throws Exception
   */
  int calendarSave(Calendar calendar) throws Exception;

  /**
   * 캘린더 일정 삭제하기
   * @param no
   * @return 
   * @throws Exception
   */
  void calendarDelete(int calendarNo) throws Exception;

  /**
   * 캘린더 일정 수정하기
   * @param vo
   * @throws Exception
   */
  void eventUpdate(Calendar calendar) throws Exception;
}
