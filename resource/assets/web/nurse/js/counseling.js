/* --------------------- Eudi Released 2023.01.26 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */

'use strict'

$(function () {

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                       **간호사앱**                                                                 ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var nurseJS = {
  init: function () {
    this.calInit();
    this.counselHis();
  },

  calInit: () => {

    /*
    참고: https://codepen.io/ylem76/pen/xxrMOEJ
    달력 렌더링 할 때 필요한 정보 목록 

    현재 월(초기값 : 현재 시간)
    금월 마지막일 날짜와 요일
    전월 마지막일 날짜와 요일
    */

    // 날짜 정보 가져오기
    var date = new Date(), // 현재 날짜(로컬 기준) 가져오기
        utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000), // uct 표준시 도출
        kstGap = 9 * 60 * 60 * 1000, // 한국 kst 기준시간 더하기
        today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
  
    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    // 달력에서 표기하는 날짜 객체
      
    var currentYear = thisMonth.getFullYear(), // 달력에서 표기하는 연
        currentMonth = thisMonth.getMonth() + 1, // 달력에서 표기하는 월
        currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    // kst 기준 현재시간
    // console.log(thisMonth);

    // ------------------------------------------------------------+| 캘린더 렌더링 |+------------------------------------------------------------ //
    if ($('.cal_wrap').length) {
      renderCalender(thisMonth);
    }

    function renderCalender(thisMonth) {

      // 렌더링을 위한 데이터 정리
      currentYear = thisMonth.getFullYear();
      currentMonth = thisMonth.getMonth();
      currentDate = thisMonth.getDate();

      // 이전 달의 마지막 날 날짜와 요일 구하기
      var startDay = new Date(currentYear, currentMonth, 0),
          prevDate = startDay.getDate(),
          prevDay = startDay.getDay();

      // 이번 달의 마지막날 날짜와 요일 구하기
      var endDay = new Date(currentYear, currentMonth + 1, 0),
          nextDate = endDay.getDate(),
          nextDay = endDay.getDay();

      // console.log(prevDate, prevDay, nextDate, nextDay);

      // 현재 월 표기
      $('.year-month').html('<span>' + currentYear + '</span>년 <span>' + (currentMonth + 1) + '</span>월');

      // 렌더링 html 요소 생성
      var calendar = document.querySelector('.dates');
      calendar.innerHTML = '';
      
      // 지난달
      for (var i = prevDate - prevDay; i <= (prevDay == 6 ? 0 : prevDate); i++) {
          calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>';     
      }
      // 이번달
      for (var i = 1; i <= nextDate; i++) {
          calendar.innerHTML = calendar.innerHTML + '<div class="day current"><a href="javascript:;" title="dates">' + i + '</a></div>'
      }
      // 다음달
      for (var i = 1; i <= (6 - nextDay == 7 ? 0 : 6 - nextDay); i++) {
          calendar.innerHTML = calendar.innerHTML + '<div class="day next disable">' + i + '</div>'
      }

      // 오늘 날짜 표기
      if (today.getMonth() == currentMonth) {
          var todayDate = today.getDate(),
              currentMonthDate = document.querySelectorAll('.dates .current');

          currentMonthDate[todayDate - 1].classList.add('today');
      }

    }

    


    // ------------------------------------------------------------+| 상세일정 렌더링 |+------------------------------------------------------------ //

    if ($('.schedule_wrap').length) {
      renderSchedule(thisMonth);
    }

    function renderSchedule(thisMonth) {

        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear();
        currentMonth = thisMonth.getMonth();
        currentDate = thisMonth.getDate();

        var daySheet = currentYear + '-' + (currentMonth + 1) + '-' + currentDate;
        let day = new Date(daySheet);
        const weekday = ['일', '월', '화', '수', '목', '금', '토'];
        let week = weekday[day.getDay()];

        // 현재 월 표기
        $('.year-month').html('<span>' + currentYear + '</span>년 <span>' + (currentMonth + 1) + '</span>월 <span>' + currentDate + '</span>일 (' + week + ')');

        // 렌더링 html 요소 생성
        var schduler = document.querySelector('.dates');
        schduler.innerHTML = '';

        // 시간대별 라인 생성
        for (var i = 0; i <= 9; i++) {
          schduler.innerHTML = schduler.innerHTML + '<div class="line">' + (i + 9) + '</div>'
        }

        // 라인 변수 선언 및 반시간 라인 설정
        var line = $('.line');
        var lineHalf = line.map(function(element) {
          let lineHalfTxt = line.eq(element).text();
          // 9시 숫자 한개일 경우 앞에 '0' 추가
          if (lineHalfTxt.length == 1) {
            lineHalfTxt = 0 + lineHalfTxt;
          }
          // 뒤에 ':30'을 붙여 내보내기
          return lineHalfTxt + ':30';
        });

        // 반시간 라인 생성
        for (var i = 0; i <= 8; i++) {
          line.eq(i).after('<div class="line_half">' + lineHalf[i] + '</div>');
        }

        // 시간대별 라인에 9시 숫자 한개일 경우 앞에 '0' 추가 / 뒤에 ':00'을 붙여 내보내기
        line.each((index)=> {
          if (line.eq(index).text().length == 1) {
            line.eq(index).html(0 + line.eq(index).text());
          }
          line.eq(index).html(line.eq(index).text() + ':00')
        })
        
    }

    
    
    $('.line')


    // 이전달로 이동
    $('.go-prev').on('click', function() {
      if ($('.cal_wrap').length) {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
      } else if ($('.schedule_wrap').length) {
        thisMonth = new Date(currentYear, currentMonth, currentDate - 1, 1);
        renderSchedule(thisMonth);
      }
    });

    // 다음달로 이동
    $('.go-next').on('click', function() {
      if ($('.cal_wrap').length) {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth);
      } else if ($('.schedule_wrap').length) {
        thisMonth = new Date(currentYear, currentMonth, currentDate + 1, 1);
        renderSchedule(thisMonth);
      }
    });


    // 드래그(스와이프) 이벤트를 위한 변수 초기화
    let startPoint = 0;
    let endPoint = 0;
    var calBoard = document.querySelector('.dates')

    // 모바일 터치 이벤트 (스와이프)
    calBoard.addEventListener("touchstart", (e) => {
      // console.log("touchstart", e.touches[0].pageX);
      startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
    });
    calBoard.addEventListener("touchend", (e) => {
      // console.log("touchend", e.changedTouches[0].pageX);
      endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장

      if (startPoint < endPoint - 80) {
        // 오른쪽으로 스와이프 된 경우
        // console.log("prev move");
        
        if ($('.cal_wrap').length) {
          thisMonth = new Date(currentYear, currentMonth - 1, 1);
          renderCalender(thisMonth);
        } else if ($('.schedule_wrap').length) {
          thisMonth = new Date(currentYear, currentMonth, currentDate - 1, 1);
          renderSchedule(thisMonth);
        }

      } else if (startPoint > endPoint + 80) {
        // 왼쪽으로 스와이프 된 경우
        // console.log("next move");

        if ($('.cal_wrap').length) {
          thisMonth = new Date(currentYear, currentMonth + 1, 1);
          renderCalender(thisMonth);
        } else if ($('.schedule_wrap').length) {
          thisMonth = new Date(currentYear, currentMonth, currentDate + 1, 1);
          renderSchedule(thisMonth);
        }
      }
    });

    
  },

  counselHis: function () {
    //이메일 직접입력 선택시 입력칸 추가
    var selectType = $(".select_row>#sel01");
    selectChange(selectType);
    function selectChange(type) {
      type.change(function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);

        if (select_name === "해피콜") {
          $(".consultDate_form").show();
        } else {
          $(".consultDate_form").hide();
        }
      });
    }
  },


}