package phantom.books.finalProject.admin.controller;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttribute;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import phantom.books.finalProject.admin.dto.Calendar;
import phantom.books.finalProject.admin.service.AdminScheduleService;
import phantom.books.finalProject.member.dto.Member;

@Controller
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/admin/schedule")
public class AdminScheduleController {
	
	private final AdminScheduleService service;

  /**
   * 캘린더 일정 조회하기
   * @return
   * @throws Exception
   */
  @GetMapping("/calendarList")
  @ResponseBody
  public List<Calendar> calendarList() throws Exception{
      List<Calendar> calendar = service.calendarList();

      return calendar;
  }
  
  /**
   * 캘린더 일정 추가하기
   * @param map
   * @return
   * @throws Exception
   */
  @PostMapping("/calendarSave")
  @ResponseBody
  public Calendar calendarSave(@RequestBody Map<String, Object> map,
  														 @SessionAttribute("loginMember") Member loginMember) throws Exception {

      Calendar calendar = new Calendar();
      
      log.debug("map : {}", map);

      // title 처리
      calendar.setTitle((String) map.getOrDefault("title", "Untitled"));
      log.debug("title : {}", calendar.getTitle());

      // UTC 시간을 LocalDateTime으로 변환
      DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
      ZonedDateTime startUTC;
      try {
          startUTC = ZonedDateTime.parse((String) map.get("startDate"), formatter)
              .withZoneSameInstant(ZoneId.of("Asia/Seoul"));
          
          log.debug("startUTC : {}", startUTC);
          
      } catch (DateTimeParseException e) {
          throw new IllegalArgumentException("start 필드가 유효한 ISO 날짜 형식이 아닙니다.", e);
      }

      ZonedDateTime endUTC = Optional.ofNullable((String) map.get("endDate"))
          .map(end -> ZonedDateTime.parse(end, formatter).withZoneSameInstant(ZoneId.of("Asia/Seoul")))
          .orElse(null);
      log.debug("endUTC : {}", endUTC);

      // 한국 시간으로 변환하여 저장
      calendar.setStartDate(startUTC.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
      calendar.setEndDate(endUTC != null ? endUTC.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")) : null);

      // allDay 처리
      calendar.setAllDay((Boolean) map.getOrDefault("allDay", false));
      calendar.setMemberNo(loginMember.getMemberNo());
      
      log.debug("calendar : {}", calendar);
      
      // 저장한 일정의 key 값을 포함한 데이터를 다시 반환
      service.calendarSave(calendar);

      return calendar;
  }

  /**
   * 캘린더 일정 삭제하기
   * @param no
   * @return
   * @throws Exception
   */
  @DeleteMapping("/calendarDelete")
  @ResponseBody
  public String calendarDelete(@RequestParam("no") int calendarNo) throws Exception{
      try{
          log.debug("calendarNo : {}", calendarNo);
      		
      		service.calendarDelete(calendarNo);
          
          
          return "success";
      }catch (Exception e){
          e.printStackTrace();
          return "fail";
      }
  }


  /**
   * 캘린더 일정 수정하기
   * @param no
   * @param map
   * @return
   */
  @PutMapping("/eventUpdate/{no}")
  @ResponseBody
  public String eventUpdate(@PathVariable int calendarNo, @RequestBody Map<String, Object> map,
			 @SessionAttribute("loginMember") Member loginMember){

      Calendar calendar = new Calendar();
      calendar.setCalendarNo(calendarNo);
      calendar.setTitle((String) map.get("title"));
      calendar.setStartDate(map.get("start1").toString().substring(0, 19));
      if(map.get("end") != null){
          calendar.setEndDate(map.get("end").toString().substring(0, 19));
      }
      calendar.setAllDay((Boolean) map.get("allDay"));

      try {
          service.eventUpdate(calendar);
          return "success";
      } catch (Exception e) {
          e.printStackTrace();
          return "fail";
      }
  }
}
