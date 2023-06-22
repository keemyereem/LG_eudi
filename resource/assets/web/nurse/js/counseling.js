/* --------------------- Eudi Released 2023.01.26 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */

"use strict"

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
    // this.counselHis();
    this.counselRegis();
    this.scheduleEdit();
    this.popup();
    this.tabEvent();
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
      calendar.dataset.cal = currentYear + '년 ' + (currentMonth + 1) + '월';
        
      // 지난달
      for (var i = prevDate - prevDay; i <= (prevDay == 6 ? 0 : prevDate); i++) {
          calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable"><button href="javascript:;" title="dates">' + i + '</button></div>';     
      }
      // 이번달
      for (var i = 1; i <= nextDate; i++) {
          calendar.innerHTML = calendar.innerHTML + '<div class="day current"><button href="javascript:;" title="dates">' + i + '</button></div>'
      }
      // 다음달
      for (var i = 1; i <= (6 - nextDay == 7 ? 0 : 6 - nextDay); i++) {
          calendar.innerHTML = calendar.innerHTML + '<div class="day next disable"><button href="javascript:;" title="dates">' + i + '</button></div>'
      }

      // 오늘 날짜 표기
      if (today.getMonth() == currentMonth) {
          var todayDate = today.getDate(),
              currentMonthDate = document.querySelectorAll('.dates .current');

          currentMonthDate[todayDate - 1].classList.add('today');
      }
    
      if(!$('.calendar .cal_wrap').hasClass('register')){  //상담일정관리 캘린더
        // 연도수와 월을 데이터로 저장
        var getData = ['2023', '4'];
  
        if (calendar.dataset.cal === getData[0] + '년 ' + getData[1] + '월') { // 해당 데이터로 이동 시 정보 불러오기
          
          // 정보 예제 출력
          var cb = $('.dates .day.current button');
  
          const data_edu = ['2', '5', '5']
          const data_cs = ['4', '2']
          const data_hpc = ['3', '4', '9']
  
          cb.eq(2).addClass('edu');
          cb.eq(7).addClass('hpc edu');
          cb.eq(8).addClass('edu cs hpc');
          cb.eq(13).addClass('hpc');
          cb.eq(19).addClass('cs');
  
          $('.hpc').append('<span class="schedule hpc_block"><b>1</b>/' + data_hpc[0] + '</span>');
          $('.edu').append('<span class="schedule edu_block"><b>2</b>' + data_edu[0] + '</span>');
          $('.cs').append('<span class="schedule cs_block"><b>3</b>' + data_cs[0] + '</span>');
        }
        
      } else {  //상담가능일정관리 캘린더
        var getData02 = ['2023', '2'];
        
        if (calendar.dataset.cal === getData02[0] + '년 ' + getData02[1] + '월') {
          var cb02 = $('.dates .day.current a');
          
          const data_pos = ['16', '12', '5']
          const data_impos = ['12', '2']
          const data_hpc02 = ['7', '8', '10', '12']
          
          cb02.eq(3).addClass('impos');
          cb02.eq(4).addClass('impos');
          cb02.eq(5).addClass('hpc02 pos');
          cb02.eq(6).addClass('hpc02 pos');
          cb02.eq(7).addClass('hpc02 pos impos');
          cb02.eq(8).addClass('hpc02 pos');
          cb02.eq(9).addClass('hpc02 pos');
          cb02.eq(10).addClass('impos');
          cb02.eq(11).addClass('impos');
          cb02.eq(12).addClass('hpc02 pos');
          cb02.eq(13).addClass('impos');
          cb02.eq(14).addClass('hpc02 pos impos');
          cb02.eq(16).addClass('hpc02 impos');
          cb02.eq(17).addClass('impos');
          cb02.eq(18).addClass('impos');
          cb02.eq(24).addClass('impos');
          cb02.eq(25).addClass('impos');
          
          $('.hpc02').append('<span class="hpc_block">' + data_hpc02[0] + '</span>');
          $('.pos').append('<span class="schedule pos_block">가능<b>' + data_pos[0] + '</b></span>');
          $('.impos').append('<span class="schedule impos_block">불가<b>' + data_impos[0] + '</b></span>');
        }

      }
      
    }

    // ------------------------------------------------------------+| 상세일정 렌더링 |+------------------------------------------------------------ //

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
    
    // ------------------------------------------------------------+| 타임테이블 렌더링 |+------------------------------------------------------------ //

    function renderTimeTable(thisMonth) {

      // 렌더링을 위한 데이터 정리
      currentYear = thisMonth.getFullYear();
      currentMonth = thisMonth.getMonth();
      currentDate = thisMonth.getDate();

      // 현재 월 표기
      $('.year-month').html('<span>' + currentYear + '</span>년 <span>' + (currentMonth + 1) + '</span>월');

      // 이번 달의 마지막날 날짜와 요일 구하기
      var endDay = new Date(currentYear, currentMonth + 1, 0),
          nextDate = endDay.getDate();

      // 월별 일수 계산 후 css용 변수 생성
      document.documentElement.style.setProperty("--dn", nextDate);

      // 월별 일수 계산 후 타임테이블 세팅 및 공휴일 데이터값 보정
      let dateCell = $('.time_wrap table tbody tr'),
          dayCell = $('.time_wrap table thead tr'),
          week = undefined,
          day = undefined;

      dateCell.children('td:not(:first-child)').remove();
      dayCell.children('td:not(:first-child)').remove();

      for (var i=0; i < nextDate; i++) {
        const weekday = ['일', '월', '화', '수', '목', '금', '토'];
        day = new Date(currentYear, currentMonth, i + 1);
        week = weekday[day.getDay()];

        dayCell.append('<td>' + (i + 1) + '<span>(' + week + ')</span></td>');
        dateCell.append('<td><button type="button" data-type=""></button></td>');

        if (week === '토' || week === '일') {
          dayCell.children('td').eq(i + 1).css('color', '#3263e0');
          dateCell.each(function(idx) {
            dateCell.eq(idx).children('td').eq(i + 1).find('button').attr('data-type', 7);
          })
        }
      }




// ****************************************************************************************************************** //
// ****************************** 타임테이블 데이터값 랜덤셋팅(개발시 삭제 요망) ************************************ // 
// ****************************************************************************************************************** //
      dateCell.each(function(idx) {
        dateCell.eq(idx).find('td').each(function(i) {
          const randNum = Math.floor(Math.random() * 7);
          dateCell.eq(idx).find('td').eq(i).children('button:not([data-type="7"])').attr('data-type', randNum);
        })
      });
// ****************************************************************************************************************** //
// ****************************** 타임테이블 데이터값 랜덤셋팅(개발시 삭제 요망) ************************************ // 
// ****************************************************************************************************************** //    





      // 버튼 생성
      let btnFuncName = ['가능', '예약', '불가(교육)', '불가(이동)', '불가(휴가)', '불가(회의)', '불가(기타)', '불가(공휴일)'];
      for(let i=0; i < btnFuncName.length; i++) {
        $('button[data-type="' + i + '"]').text(btnFuncName[i]);
      }

      // 렌더링시 현재 날짜로 타임테이블 스크롤 포커싱 맞추기
      if (currentMonth === today.getMonth()) {
        $('.time_wrap').animate({
          scrollLeft: $('table thead tr td').eq(today.getDate()).position().left - $('table thead tr td').eq(0).outerWidth()
        }, 200);
      } else {
        $('.time_wrap').animate({
          scrollLeft: 0
        }, 200);
      }

      // *타임테이블 스크롤 시 가장자리 정보 셀 고정
      $('.time_wrap').on('load resize scroll', function() {
        $("thead").css("top", 0 + $(this).scrollTop());
        $(".moveL").css("left", 0 + $(this).scrollLeft());
        $(this).children('span').css({"top": 1 + $(this).scrollTop(), "left": 0 + $(this).scrollLeft()});
      });

      // 타임테이블 내부 버튼 클릭 시
      $('.time_wrap button').on('click', function() {
        $(this).toggleClass('on');

        // 불가사유 버튼 색깔 단독변경
        $('.impossible_pop').find('.save').addClass('time_btnColor');
        
        // 가능, 불가버튼
        const btnFirst = $('.sec_cal > .btn_box02').children().first(),
              btnLast = $('.sec_cal > .btn_box02').children().last();

        let btnImpossible = $('button:not([data-type="0"], [data-type="1"], [data-type="7"]).on'),
            btnImposWeekend = $('button[data-type="7"].on'),
            btnPossible = $('button[data-type="0"].on');

        // 불가버튼 클릭 시
        if (btnImpossible.length > 0 || btnImposWeekend.length > 0) {
          btnFirst.removeClass('btn_gray').addClass('btn_orange');

          // 불가 + 가능 복수 선택 시
          if (btnPossible.length > 0) {
            btnLast.removeClass('btn_gray btn_green').addClass('btn_red');
            btnLast.children().text('불가').attr('onClick', "openPopup('impossible_pop')");
            $('.impossible_pop').removeClass('reason_setting');
          
          // 불가(공휴일) + 가능 복수 선택 시
          } else if (btnImposWeekend.length > 0 && btnImpossible.length === 0) {
            btnFirst.removeClass('btn_gray').addClass('btn_orange');
            btnLast.removeClass('btn_red btn_green').addClass('btn_gray');
            btnLast.children().text('불가').attr('onClick', "openPopup('impossible_pop')");
            $('.impossible_pop').removeClass('reason_setting');

          // 불가만 선택 시
          } else {
            btnLast.removeClass('btn_gray').addClass('btn_green');
            btnLast.children().text('불가 수정').attr('onClick', "openPopup('impossible_pop')");
            $('.impossible_pop').addClass('reason_setting');
          }  

        // 가능버튼 클릭 시
        } else if (btnPossible.length > 0) {
          // 가능만 선택 시
          if (!btnImpossible.length > 0) {
            btnFirst.removeClass('btn_orange').addClass('btn_gray');
            btnLast.removeClass('btn_gray').addClass('btn_red');
            btnLast.children().attr('onClick', "openPopup('impossible_pop')");
            $('.impossible_pop').removeClass('reason_setting');
          }

        // 모두 선택 취소 시
        } else {
          btnFirst.removeClass('btn_orange').addClass('btn_gray');
          btnLast.removeClass('btn_green').addClass('btn_gray');
          btnLast.children().text('불가').attr('onClick', "openPopup('')");
          $('.impossible_pop').removeClass('reason_setting');
        }

      });

      
      
    }

    // ------------------------------------------------------------+| 작동 기능들 |+------------------------------------------------------------ //
    
    // 페이지별 렌더링 불러오기
    if ($('.cal_wrap').length) {
      renderCalender(thisMonth);
    } else if ($('.time_wrap').length) {
      renderTimeTable(thisMonth);
    } else if ($('.schedule_wrap').length) {
      renderSchedule(thisMonth);
    }

    // 이전달로 이동
    $('.go-prev').on('click', function() {
      if ($('.cal_wrap').length) {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
        
      } else if ($('.schedule_wrap').length) {
        thisMonth = new Date(currentYear, currentMonth, currentDate - 1, 1);
        renderSchedule(thisMonth);

      } else if ($('.time_wrap').length) {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderTimeTable(thisMonth);
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

      } else if ($('.time_wrap').length) {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderTimeTable(thisMonth);
      }
    });


    // 드래그(스와이프) 이벤트를 위한 변수 초기화
    let startPoint = 0,
        endPoint = 0;
    let vStartPoint = 0,
        vEndPoint = 0;
    var calBoard = undefined,
        detectCal = 0;

    if ($('.cal_wrap, .scheduel_wrap').length) {
      detectCal = 80; // 스와이프 인식 감도 (높을수록 스와이프 길게 해야 함)
      calBoard = document.querySelector('.dates');
    } else if ($('.time_wrap').length) {
      calBoard = document.querySelector('.time_wrap');
    }
    
    if($('.calendar').length){
      // 모바일 터치 이벤트 (스와이프)
      calBoard.addEventListener("touchstart", (e) => {
        startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
        vStartPoint = e.touches[0].pageY;
      });
      calBoard.addEventListener("touchend", (e) => {
        endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
        vEndPoint = e.changedTouches[0].pageY;

        // 오른쪽으로 스와이프 된 경우 (prev move)
        if (startPoint < endPoint - detectCal && vStartPoint < vEndPoint + 40 && vStartPoint + 40 > vEndPoint ) {
          // 캘린더페이지
          if ($('.cal_wrap').length) {
            thisMonth = new Date(currentYear, currentMonth - 1, 1);
            renderCalender(thisMonth);

          // 상세일정페이지
          } else if ($('.schedule_wrap').length) {
            thisMonth = new Date(currentYear, currentMonth, currentDate - 1, 1);
            renderSchedule(thisMonth);
          }

        // 왼쪽으로 스와이프 된 경우 (next move)
        } else if (startPoint > endPoint + detectCal && vStartPoint > vEndPoint - 40 && vStartPoint - 40 < vEndPoint) {
          if ($('.cal_wrap').length) {
            thisMonth = new Date(currentYear, currentMonth + 1, 1);
            renderCalender(thisMonth);

          } else if ($('.schedule_wrap').length) {
            thisMonth = new Date(currentYear, currentMonth, currentDate + 1, 1);
            renderSchedule(thisMonth);
          }
        }
        
      });
    }

  },

  // counselHis: () => {
  //   //상담일정관리 상담분류 "해피콜"일 경우 상담예정일 칸 생성
  //   var selectType = $(".happycall .select_row>#sel01");
  //   selectChange(selectType);
  //   function selectChange(type) {
  //     type.change(function () {
  //       var select_name = $(this).children("option:selected").text();
  //       $(this).siblings("label").text(select_name);

  //       if (select_name === "해피콜") {
  //         $(".consultDate_form").show();
  //       } else {
  //         $(".consultDate_form").hide();
  //       }
  //     });
  //   }
  // },


  //상담가능일정관리
  scheduleEdit: () => {
    //달력 날짜 선택
    if($('.calendar .register').length){
      $('.register .dates .day a').on('click', function(){
        $(this).toggleClass('on')
      });
    }
    //팝업 : 근무/휴일 선택
    $('.scheduleEdit_pop .schedule_select li').on('click', function(){
      $('.scheduleEdit_pop .schedule_select li').removeClass('on');
      $(this).addClass('on');
    });
    
  },

  tabEvent: () => {
    //tab 메뉴 3개 이상일 경우 스크롤
    const tabContainer = $(".tab_slide > .inner"),
      tabBox = tabContainer.find("> ul"),
      tabButton = tabBox.find("> li");

    let size = tabButton.length,
      tbIndex = 0;

    if (tabBox.length) {
      $(document).ready(function () {
        let tbOn = Math.floor(tabBox.find("> li.active").position().left),
            tbWidth = tabButton.width();

        tabContainer.animate({ scrollLeft: tbOn - tbWidth }, 0);
      });

      tabContainer.on("load resize scroll", () => {
        tabBoxPosition = Math.abs(tabBox.position().left);

        tabButton.each((index) => {
          tabButtonPosition = Math.floor(tabButton.eq(index).position().left);

          if (size !== index + 1) {
            nextIndexPosition = Math.floor(
              tabButton.eq(index).next().position().left
            );

            if (
              tabBoxPosition > tabButtonPosition &&
              tabBoxPosition <= nextIndexPosition
            ) {
              tbIndex = index;
            }
          }
        });

        if (tabBox.children().length > 3) {
          if (tabContainer.scrollLeft() == 0) {
            tabBox.parents(".tab_slide").addClass("right");
          } else if (
            Math.round(tabBox.width() - tabContainer.scrollLeft()) ===
            tabContainer.width()
          ) {
            tabBox.parents(".tab_slide").addClass("left");
          } else {
            tabBox.parents(".tab_slide").removeClass("left right");
          }
        }
      });
    }
  },
  

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////                                                           **팝업**                                                                 ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  popup: () => {
    // 불가관리 팝업
    $('.disable_pop').on('click', function(){
      let imposDate = $('.year-month').text(),
          imposTimeIndex = undefined,
          imposTimeRow = undefined,
          imposTimeStart = undefined,
          imposTimeEnd = undefined;

      // 상세일정 - 날짜와 시간 가져오기
      if ($('.schedule_wrap').length) {  
        // 날짜, 라인인덱스, 데이터타입(차지하는 열 개수), 시작시간과 끝시간 텍스트 가져오기 
        imposDate = imposDate.substring(0, imposDate.length - 4)
        imposTimeIndex = $(this).parents('li').index();
        imposTimeRow = Number($(this).parents('li').data('type').replace('row-', ''));
        imposTimeStart = $('.lines').children().eq(imposTimeIndex).text();
        imposTimeEnd = $('.lines').children().eq(imposTimeIndex + imposTimeRow).text();
        $('.impossible_pop ul').prepend('<li class="info"></li>');
        $('.impossible_pop .info').html('<span>' + imposDate + '</span>' + imposTimeStart + ' ~ ' + imposTimeEnd);


      // 상담일정관리 - 클릭한 버튼의 데이터 가져오기
      } else if ($('.time_wrap').length) {
        
        // 버튼의 좌표 위치 담을 배열 생성
        let arrObj = new Array;
        $('button:not([data-type="7"]).on').each(function(index) {
          // 버튼 각각 좌표 생성
          var rowPos = $('button:not([data-type="7"]).on').eq(index).closest('tr').index() + 1,
              colPos = $('button:not([data-type="7"]).on').eq(index).closest('td').index(),
              colNextPos = $('button:not([data-type="7"]).on').eq(index + 1).closest('td').index();
            
          // 버튼의 행, 열 좌표를 작은 배열에 담은 후, 각각의 작은 배열들을 좌표 위치 배열에 담기
          let posArr = [rowPos, colPos];
          arrObj.push(posArr);
          // 날짜 및 시간 정렬 - 2번째 요소 오름차순 -> 1번째 요소 오름차순
          arrObj.sort((prev, cur) => {  
            if (prev[1] > cur[1]) return -1;
            if (prev[1] < cur[1]) return 1;
            if (prev[0] > cur[0]) return -1;
            if (prev[0] < cur[0]) return 1;
          });

        });
        // console.log(arrObj)

        // 선택한 버튼만큼 info 생성
        for(var i=1; i<= $('button:not([data-type="7"]).on').length; i++) {
          let imposDay = $('thead tr td').eq(arrObj[i - 1][1]).html(),
              imposTimeStart = $('.moveL').eq((arrObj[i -1][0]) - 1).html(),
              imposTimeEnd = $('.moveL').eq((arrObj[i -1][0])).html();
              if (imposTimeEnd === undefined) { imposTimeEnd = '18:30' }
          $('.impossible_pop ul, .imposReason_pop ul')
          .prepend('<li class="info"><span>' + imposDate + ' <b>' + imposDay + '일</b></span>' + imposTimeStart + ' ~ ' + imposTimeEnd + '</li>');
            
        }
      }
    });

  },

}

function openPopup(popConts) {  //onclick="openPopup('popConts');"
  //팝업 열기
  var popthis = $(".popup ." + popConts); //popConts : .pop_content 
  $(".pop_content").hide();
  $(".popup").addClass("on");
  popthis.css('display', 'flex');

  eval($().data('callback'));

  if(popthis.hasClass('pop_alert')) { //alert 팝업
    popthis.parents('.popup').addClass('popup_alert');
  }else {
    popthis.parents('.popup').removeClass('popup_alert');
  }

  if(popthis.hasClass('pop_bottom')) { //밑에서 뜨는 팝업
    popthis.parents('.popup').addClass('popup_bottom');
    popthis.css('display', 'block');
  }else {
    popthis.parents('.popup').removeClass('popup_bottom');
  }

  // 불가 사유
  if (popthis.hasClass('reason_setting')) {
    popthis.children('button.cancel').before('<button type="button" onclick="javascript:;" class="delete">삭제</button>');
    popthis.children('button.save').text('저장');
  } else {
    popthis.children('button.save').text('등록');
  }

  $("#impos_select").on("change", function(){
    var choose = $(this).find("option:selected").attr('value');
    if (choose === 'etc') { 
      $('#etc_textarea').show();
    } else {
      $('#etc_textarea').hide();
    }
  });

  //팝업 닫기
  popthis.siblings(".close_pop").click(function(){ // 팝업 내 X버튼
    $(".popup").removeClass("on");
    $('.info, .delete').remove();
    popthis.hide();
  });
  popthis.find(".close_pop").click(function(){ // 기타 버튼 클릭시 닫기
    $(".popup").removeClass("on");
    $('.info, .delete').remove(); //팝업 내 동적내용 삭제
    popthis.hide();
  });
}

