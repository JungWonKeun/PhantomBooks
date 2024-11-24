package phantom.books.finalProject.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.dto.Calendar;
import phantom.books.finalProject.admin.mapper.AdminScheduleMapper;

@Service
@RequiredArgsConstructor
@Slf4j
public class AdminScheduleServiceImpl implements AdminScheduleService{

	private final AdminScheduleMapper mapper;
	
	
  @Override
  public List<Calendar> calendarList() throws Exception {
      return mapper.calendarList();
  }

  @Override
  public int calendarSave(Calendar calendar) throws Exception {
       return mapper.calendarSave(calendar);
  }

  @Override
  public void calendarDelete(int calendarNo) throws Exception {
  	mapper.calendarDelete(calendarNo);
  }

  @Override
  public void eventUpdate(Calendar calendar) throws Exception {
     mapper.eventUpdate(calendar);
  }
}
