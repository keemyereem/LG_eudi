/* --------------------- Eudi Released 2023.01.26 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */

'use strict'

$(function () {
  $(function () {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    //resize
    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    });
  });

});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                       **간호사앱**                                                                 ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var nurseJS = {
  init: function () {
    this.calInit();
    this.counselHis();
    this.popup();
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
      calendar.dataset.cal = currentYear + '년 ' + (currentMonth + 1) + '월';
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


      // 연도수와 월을 데이터로 저장
      var getData = ['2023', '1'];
      var getData02 = ['2023', '1'];

      if (calendar.dataset.cal === getData[0] + '년 ' + getData[1] + '월') { // 해당 데이터로 이동 시 정보 불러오기
        
        // 정보 예제 출력
        var cb = $('.dates .day.current a');

        const data_edu = ['2', '5', '5']
        const data_cs = ['4', '2']
        const data_hpc = ['3', '2', '9']

        cb.eq(4).addClass('edu');
        cb.eq(8).addClass('hpc edu');
        cb.eq(9).addClass('hpc');
        cb.eq(10).addClass('edu cs');
        cb.eq(16).addClass('hpc');
        cb.eq(17).addClass('cs');

        $('.edu').append('<span class="hpc_block">' + data_hpc[0] + '</span>');
        $('.edu').append('<span class="schedule edu_block">교육<b>' + data_edu[0] + '</b></span>');
        $('.cs').append('<span class="schedule cs_block">상담<b>' + data_cs[0] + '</b></span>');

      } else if (calendar.dataset.cal === getData02[0] + '년 ' + getData02[1] + '월') {
        var cb02 = $('.dates .day.current a');
        
        const data_pos = ['16', '12', '5']
        const data_impos = ['12', '2']
        const data_hpc02 = ['7', '8', '10', '12']
        
        cb02.eq(0).addClass('impos');
        cb02.eq(4).addClass('hpc02 pos');
        cb02.eq(6).addClass('impos');
        cb02.eq(7).addClass('impos');
        cb02.eq(8).addClass('hpc02 pos');
        cb02.eq(9).addClass('hpc02 pos');
        cb02.eq(10).addClass('hpc02 pos');
        cb02.eq(11).addClass('hpc02 pos');
        cb02.eq(12).addClass('hpc02 pos');
        cb02.eq(13).addClass('impos');
        cb02.eq(14).addClass('impos');
        cb02.eq(20).addClass('impos');
        cb02.eq(21).addClass('impos');
        cb02.eq(27).addClass('impos');
        cb02.eq(10).addClass('pos impos');
        cb02.eq(16).addClass('hpc02 impos');
        cb02.eq(17).addClass('impos');
        
        $('.hpc02').append('<span class="hpc_block">' + data_hpc02[0] + '</span>');
        $('.pos').append('<span class="schedule pos_block">교육<b>' + data_pos[0] + '</b></span>');
        $('.impos').append('<span class="schedule impos_block">상담<b>' + data_impos[0] + '</b></span>');
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
        var schduler = document.querySelector('.lines');
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

    /* 상담가능일정등록 */
    // const $calBody = document.querySelector('.cal_wrap .dates');
    // $calBody.addEventListener('click', (e) => {
    //   if (e.target.classList.contains('day')) {
    //     if (init.activeDTag) {
    //       init.activeDTag.classList.remove('on');
    //     }
    //     let day = Number(e.target.textContent);
    //     loadDate(day, e.target.cellIndex);
    //     e.target.classList.add('on');
    //     init.activeDTag = e.target;
    //     init.activeDate.setDate(day);
    //     reloadTodo();
    //   }
    // });
  
    
  },

  counselHis: function () {
    //상담일정관리 상담분류 "해피콜"일 경우 상담예정일 칸 생성
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

  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                           **팝업**                                                                 ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  popup: () => {
  
    // 스크롤 값 추적
    let scrollPosition = 0;
    const body = document.querySelector("body");
    $(window).on("scroll", () => {
      scrollPosition = window.pageYOffset;
    });

    // 팝업 열기 
    $(document).on("click",".open_pop", function() {
      openProcessor();

      if ($('.popup').find('.impossible_pop').length) {
        let imposDate = $('.year-month').text();
        imposDate = imposDate.substring(0, imposDate.length - 4)
    
        let imposTimeIndex = $(this).parents('li').index(),
            imposTimeRow = Number($(this).parents('li').data('type').replace('row-', '')),
            imposTimeStart = $('.lines').children().eq(imposTimeIndex).text(),
            imposTimeEnd = $('.lines').children().eq(imposTimeIndex + imposTimeRow).text();
    
        $('.impossible_pop .info').html('<span>' + imposDate + '</span>' + imposTimeStart + ' ~ ' + imposTimeEnd);
      }
    });

    // 팝업 닫기
    $(document).on("click",".close_pop", () => {
      closeProcessor();

      $('.popup').find('.info').html('');
    });

    // 팝업 열기 function
    function openProcessor() {
      scrollPosition = window.pageYOffset;

      $(".popup").addClass("on");
      $("html").addClass("blockScroll");

      // body.style.top = `-${scrollPosition}px`;
    }

    // 팝업 닫기 function
    function closeProcessor() {
      $("html").removeClass("blockScroll");
      $(".popup").removeClass("on");

      // scrollPosition = body.style.top;
      // scrollPosition = scrollPosition.replace("px", "");

      // window.scrollTo(0, -scrollPosition);
      // body.style.removeProperty("top");
    }

  },

}