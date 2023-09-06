/* --------------------- Eudi Released 2023.01.26 --------------------- */
/* --------------------- Published by 4m Creative --------------------- */

"use strict";

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
///////////																											 **간호사앱**																																 ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 교육/상담 캘린더 2023.02.08 추가 */
var calendarJs = {
  calCurrentDate: "",
  isTimeTableScroll: true, // 타임테이블 초기화 후 스크롤 여부 옵션
  eduYn: null, // 교육 이수 여부
  ableCounselYn: null, // 상담신청 가능여부
  cntMySchdList: null, // 내 교육/상담 신청수
  setCalCurrentDate: (thisMonth) => {
    // 현재 스케줄러 달 업데이트
    calendarJs.calCurrentDate = calendarJs.dateToStr8(
      thisMonth.getFullYear(),
      thisMonth.getMonth() + 1,
      thisMonth.getDate()
    );
  },
  dateToStr8: (year, month, day) => {
    // 날짜 포멧 변경 (YYYYMMDD)
    return (
      year +
      "" +
      (month < 10 ? "0" + month : month) +
      "" +
      (day < 10 ? "0" + day : day)
    );
  },
  dateToStr10: (year, month, day) => {
    // 날짜 포멧 변경 (YYYYMMDD)
    return (
      year +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (day < 10 ? "0" + day : day)
    );
  },
  timeToStr4: (hour, min) => {
    // 날짜 포멧 변경 (HHMI)
    return (hour < 10 ? "0" + hour : hour) + "" + (min < 10 ? "0" + min : min);
  },
  getTodayOpenTime: (now) => {
    // 날짜 포멧 변경 (HHMI)
    const hour = ~~now.substring(8, 10) + 3;
    const min = ~~now.substring(10, 12);
    return calendarJs.timeToStr4(hour, min);
  },
  printMyRsvtSchd: (schdList) => {
    const $printWrap = $('[data-txt-section="rsvt-schd-info"]');
    if (schdList == null || schdList.length == 0) {
      $printWrap.html("신청 내역이 없습니다.");
    } else {
      const schdInfo = schdList[0];
      const schdDt = schdInfo.schdDt
        ? schdInfo.schdDt.substring(0, 4) +
          "." +
          schdInfo.schdDt.substring(4, 6) +
          "." +
          schdInfo.schdDt.substring(6, 8)
        : "";
      const schdTi = schdInfo.schdStHh + "" + schdInfo.schdStMi;
      const applyDate =
        schdDt +
        " " +
        schdInfo.schdStHh +
        ":" +
        schdInfo.schdStMi +
        " ~ " +
        schdInfo.schdEndHh +
        ":" +
        schdInfo.schdEndMi;
      $printWrap.html(
        '<b>신청일자 </b><a href="/counsel/rsvt_timetable.do?dt=' +
          schdInfo.schdDt +
          "&tm=" +
          schdTi +
          '"> [' +
          schdInfo.schdTpNm +
          "] " +
          applyDate +
          '</a><button type="button" name="btnRsvtCancel" class="btn_cancel" data-apply-dt="' +
          applyDate +
          '" data-schd-seq="' +
          schdInfo.schdSeq +
          '">취소</button>'
      );
    }
  },
  getSchdMode: () => {
    return calendarJs.eduYn === "N" ? "01" : "02";
  },
  setFormState: ($btn, state, msg) => {
    $btn.attr("disabled", state);
    $btn.attr("data-is-disabled", state ? 1 : 0); // anchor disabled 처리용
    if (state !== true && msg) {
      alert(msg);
    }
  },
  getAngle: (x1, y1, x2, y2) => {
    var rad = Math.atan2(y2 - y1, x2 - x1);
    return (rad * 180) / Math.PI;
  },
  setTimeTableScroll: () => {
    const scrollYThumb = Math.round(
      ($(".time_wrap .scrollbar-y").height() /
        $("#divTimeTable table tbody").height()) *
        100
    );
    const scrollYPos = Math.round(
      ($("#divTimeTable").scrollTop() /
        $("#divTimeTable table tbody").height()) *
        100
    );
    $(".time_wrap .scrollbar-y .thumb")
      .css("top", scrollYPos + "%")
      .css("height", scrollYThumb + "%");
  },
  setEduApplyBtnState: ($select, btnType) => {
    const btnSelectCnt = $(
      '#divTimeTable [name="btnApplyDate"], #divTimeTable [name="btnCancelDate"]'
    ).filter(".on").length;
    const $frmApply = $("#frmApply");
    const $frmCancel = $("#frmCancel");
    let applyDate = $select ? $select.data("apply-dt") : "-";
    let cssNm = "btn_gray";
    let btnNm = "신청하기";
    let btnHandler = "";
    if (btnSelectCnt > 0 || btnType === "btnRsvtCancel") {
      cssNm = "btn_pink";
      // btnCancelDate  : 토글버튼 유입 / btnRsvtCancel : 상단 취소 버튼 유입
      if (btnType === "btnCancelDate" || btnType === "btnRsvtCancel") {
        $frmCancel.find("input").val("");
        $frmCancel.find('[name="schdSeq"]').val($select.data("schd-seq"));
        btnNm = "취소하기";
        btnHandler = "cancel";
      } else {
        if (!$select) return false;

        const $applyReason = $frmApply.find(
          '[data-apply-section="apply-reason"]'
        );
        const schdMode = calendarJs.getSchdMode();
        const schdYmd = $select.data("schd-dt") + "";
        const schdDt =
          schdYmd.substring(0, 4) +
          "-" +
          schdYmd.substring(4, 6) +
          "-" +
          schdYmd.substring(6, 8);
        let startDtTm = new Date(schdDt);
        startDtTm.setHours($select.data("schd-st-hh"));
        startDtTm.setMinutes($select.data("schd-st-mi"));
        let nextDtTm = new Date(startDtTm);
        let endDtTm = new Date(startDtTm);
        if ($.trim(schdMode) === "01") {
          // 교육
          nextDtTm.setMinutes(nextDtTm.getMinutes() + 30);
          endDtTm.setMinutes(endDtTm.getMinutes() + 60);
          $applyReason.find("input, textarea").attr("disabled", true);
          $applyReason.hide();
        } else {
          // 상담
          endDtTm.setMinutes(endDtTm.getMinutes() + 30);
          $applyReason.find("input, textarea").attr("disabled", false);
          $applyReason.show();
        }
        let endHh = endDtTm.getHours();
        let endMi = endDtTm.getMinutes();
        if (endHh < 10) endHh = "0" + endHh;
        if (endMi < 10) endMi = "0" + endMi;

        let nextHh = nextDtTm.getHours();
        let nextMi = nextDtTm.getMinutes();
        if (nextHh < 10) nextHh = "0" + nextHh;
        if (nextMi < 10) nextMi = "0" + nextMi;

        if (
          ~~$(
            'tr[data-schd-tmlv="' +
              nextHh +
              "" +
              nextMi +
              '"] [data-schd-dt="' +
              schdYmd +
              '"]'
          ).attr("data-type") !== 1
        ) {
          alert("첫 교육은 1시간이 필요합니다.\n다른 시간대를 선택해주세요.");
          return false;
        }

        $frmApply.find("input, textarea, select").val("");
        $frmApply.find('[name="schdTpCd"]').val(schdMode);
        $frmApply.find('[name="schdDt"]').val($select.data("schd-dt"));
        $frmApply.find('[name="schdStHh"]').val($select.data("schd-st-hh"));
        $frmApply.find('[name="schdStMi"]').val($select.data("schd-st-mi"));
        $frmApply.find('[name="schdEndHh"]').val(endHh);
        $frmApply.find('[name="schdEndMi"]').val(endMi);

        btnHandler = "apply";
        applyDate = applyDate + endHh + ":" + endMi;
      }
    }

    $("#btnChangeState")
      .parent("div")
      .removeClass("btn_gray btn_pink")
      .addClass(cssNm);
    $("#btnChangeState").text(btnNm);
    $("#btnChangeState").attr("data-btn-handler", btnHandler);
    $('[data-section-id="popApplyDate"]').text(applyDate);

    return true;
  },
  getNurseScheduleApi: (params, fnCallback) => {
    $.ajax({
      type: "GET",
      data: params,
      /*
	  - 예약없음 : "/api/child/rsvt/getNrsSchdList.do"
      - 예약완료: "/api/child/rsvt/getNrsSchdList.ReserveY.do",
       */
      url: "/api/child/rsvt/getNrsSchdList.ReserveY.do",
      dataType: "json",
      success: function (res) {
        console.log("상담가능일정관리 >> success ", res);
        if (typeof fnCallback === "function") {
          fnCallback(res);
        }
      },
      error: function (xhr, option, error) {
        console.log("상담가능일정관리 >> error ", xhr, option, error);
      },
    });
  },
  updateEduSchd: ($btn, $frmUpdate, fnCallback) => {
    if ($btn.attr("data-is-disabled") != 1) {
      calendarJs.setFormState($btn, true);
    } else {
      calendarJs.setFormState($btn, false, "처리중입니다.");
      return;
    }

    if (!$frmUpdate.find('[name="schdTpCd"]').val()) {
      calendarJs.setFormState($btn, false, "상담 분류를 선택해주세요.");
      return;
    }
    // 상담일 경우
    if (
      $frmUpdate.find('[name="schdTpCd"]').val() == "02" &&
      !$frmUpdate.find('[name="csltRqstTpCd"]').val()
    ) {
      calendarJs.setFormState($btn, false, "신청 사유를 선택해주세요.");
      return;
    }

    $.ajax({
      type: "POST",
      data: $frmUpdate.serialize(),
      url: "/api/child/rsvt/updateEduSchd.do",
      dataType: "json",
      success: function (res) {
        if (res.resultCode === "success") {
          console.log("상담가능일정관리 일정 등록,수정 >> success ", res);
          //const cntComplete = res.data.completeDts;
          const cntFail = res.data.failDts;
          //calendarJs.setFormState($btn, false, '저장이 완료되었습니다. (성공 : ' + cntComplete + '건 /  실패 : ' + cntFail + '건)');
          if (cntFail > 0) {
            calendarJs.setFormState(
              $btn,
              false,
              "신청이 불가능합니다.\n일정을 다시 확인해 주세요."
            );
          } else {
            calendarJs.setFormState($btn, false, "");
          }

          calendarJs.isTimeTableScroll = false;

          // page reset
          if (typeof fnCallback === "function") {
            fnCallback();
          }
        } else {
          calendarJs.setFormState(
            $btn,
            false,
            "처리중 오류가 발생했습니다. 잠시후 다시 시도해 주세요."
          );
        }
      },
      error: function (xhr, option, error) {
        console.log(
          "상담가능일정관리 일정 등록,수정 >> error ",
          xhr,
          option,
          error
        );
        calendarJs.setFormState($btn, false, "저장에 실패했습니다.");
      },
    });
  },
  deleteEduSchd: ($btn, $frmUpdate, fnCallback) => {
    if ($btn.attr("data-is-disabled") != 1) {
      calendarJs.setFormState($btn, true);
    } else {
      calendarJs.setFormState($btn, false, "처리중입니다.");
      return;
    }

    /*
		front 에서 취소 confirm 진행 완료 했음.
		if (!confirm('상담신청을 삭제하시겠습니까?')){
			calendarJs.setFormState($btn, false, '');
			return;
		}
		*/

    $.ajax({
      type: "POST",
      data: $frmUpdate.serialize(),
      url: "/api/child/rsvt/deleteEduSchd.do",
      dataType: "json",
      success: function (res) {
        if (res.resultCode === "success") {
          console.log("상담가능일정관리 일정 삭제 >> success ", res);
          //const cntComplete = res.data.completeDts;
          const cntFail = res.data.failDts;
          //calendarJs.setFormState($btn, false, '삭제가 완료되었습니다. (성공 : ' + cntComplete + '건 /  실패 : ' + cntFail + '건)');
          if (cntFail > 0) {
            calendarJs.setFormState(
              $btn,
              false,
              "삭제가 불가능합니다.\n일정을 다시 확인해 주세요."
            );
          } else {
            calendarJs.setFormState($btn, false, "");
          }

          calendarJs.isTimeTableScroll = false;

          // page reset
          if (typeof fnCallback === "function") {
            fnCallback();
          }
        } else {
          calendarJs.setFormState(
            $btn,
            false,
            "처리중 오류가 발생했습니다. 잠시후 다시 시도해 주세요."
          );
        }
      },
      error: function (xhr, option, error) {
        console.log("상담가능일정관리 일정 삭제 >> error ", xhr, option, error);
        calendarJs.setFormState($btn, false, "저장에 실패했습니다.");
      },
    });
  },
  init: function (initDate, initTime) {
    /*
		참고: https://codepen.io/ylem76/pen/xxrMOEJ
		달력 렌더링 할 때 필요한 정보 목록 

		현재 월(초기값 : 현재 시간)
		금월 마지막일 날짜와 요일
		전월 마지막일 날짜와 요일
		*/

    // 날짜 정보 가져오기
    const date = initDate
        ? new Date(
            initDate.substring(0, 4),
            initDate.substring(4, 6) - 1,
            initDate.substring(6, 8)
          )
        : new Date(), // 현재 날짜(로컬 기준) 가져오기
      utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000, // uct 표준시 도출
      kstGap = 9 * 60 * 60 * 1000, // 한국 kst 기준시간 더하기
      today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)

    var thisMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    // 달력에서 표기하는 날짜 객체

    var currentYear = thisMonth.getFullYear(), // 달력에서 표기하는 연
      currentMonth = thisMonth.getMonth() + 1, // 달력에서 표기하는 월
      currentDate = thisMonth.getDate(); // 달력에서 표기하는 일

    // ------------------------------------------------------------+| 캘린더 렌더링 |+------------------------------------------------------------ //

    function renderCalender(thisMonth) {
      // 렌더링을 위한 데이터 정리
      currentYear = thisMonth.getFullYear();
      currentMonth = thisMonth.getMonth();
      currentDate = thisMonth.getDate();

      // 오늘 날짜
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const preMonth = new Date(currentYear, currentMonth, 1);
      const curMonth = new Date(currentYear, currentMonth + 1, 1);
      const nextMonth = new Date(currentYear, currentMonth + 2, 1);

      // 이전 달의 마지막 날 날짜와 요일 구하기
      var startDay = new Date(currentYear, currentMonth, 0),
        prevDate = startDay.getDate(),
        prevDay = startDay.getDay();
      // 이전달의 첫 표기날
      const prevDayMin = prevDate - prevDay;

      // 이번 달의 마지막날 날짜와 요일 구하기
      var endDay = new Date(currentYear, currentMonth + 1, 0),
        nextDate = endDay.getDate(),
        nextDay = endDay.getDay();
      // 다음달의 마지막 표기날
      const nextDayMax = 6 - nextDay == 7 ? 0 : 6 - nextDay;

      // 현재 월 표기
      $(".year-month").html(
        "<span>" +
          currentYear +
          "</span>년 <span>" +
          (currentMonth + 1) +
          "</span>월"
      );

      // 렌더링 html 요소 생성
      var calendar = document.querySelector(".dates");
      calendar.innerHTML = "";
      calendar.dataset.cal = currentYear + "년 " + (currentMonth + 1) + "월";

      const setCalDateAttr = (dt, day) => {
        return (
          ' title="dates" data-cal-dt="' +
          calendarJs.dateToStr8(dt.getFullYear(), dt.getMonth(), day) +
          '" '
        );
      };

      // 지난달
      for (
        var i = prevDate - prevDay;
        i <= (prevDay == 6 ? 0 : prevDate);
        i++
      ) {
        calendar.innerHTML =
          calendar.innerHTML +
          '<div class="day prev disable"><button type="button" ' +
          setCalDateAttr(preMonth, i) +
          ">" +
          i +
          "</button></div>";
      }
      // 이번달
      for (var i = 1; i <= nextDate; i++) {
        calendar.innerHTML =
          calendar.innerHTML +
          '<div class="day current disable"><button type="button" ' +
          setCalDateAttr(curMonth, i) +
          ">" +
          i +
          "</button></div>";
      }
      // 다음달
      for (var i = 1; i <= (6 - nextDay == 7 ? 0 : 6 - nextDay); i++) {
        calendar.innerHTML =
          calendar.innerHTML +
          '<div class="day next disable"><button type="button" ' +
          setCalDateAttr(nextMonth, i) +
          ">" +
          i +
          "</button></div>";
      }

      // 오늘 날짜 표기
      if (today.getMonth() == currentMonth) {
        var todayDate = today.getDate(),
          currentMonthDate = document.querySelectorAll(".dates .current");

        currentMonthDate[todayDate - 1].classList.add("today");
      }

      if (!$(".calendar .cal_wrap").hasClass("register")) {
        //교육/상담신청 캘린더
        // 간호사 일정 조회
        calendarJs.getNurseScheduleApi(
          {
            /* 이전달 다음달 포함 검색 (퍼블 추가 작업 필요)
						startDt: calendarJs.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth(), prevDayMin),
						endDt: calendarJs.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth() + 2, nextDayMax)
						*/
            // 이번달 내 검색
            startDt: calendarJs.dateToStr8(
              thisMonth.getFullYear(),
              thisMonth.getMonth() + 1,
              1
            ),
            endDt: calendarJs.dateToStr8(
              thisMonth.getFullYear(),
              thisMonth.getMonth() + 1,
              nextDate
            ),
            hcSchdYn: "N",
            rsvtSchdYn: "Y",
          },
          (res) => {
            if (res && res.resultCode === "success") {
              // 예약현황 출력
              calendarJs.printMyRsvtSchd(res.data.mySchdList);

              const strNowDt = calendarJs.dateToStr8(
                today.getFullYear(),
                today.getMonth() + 1,
                today.getDate()
              );
              const strOpenTm = calendarJs.getTodayOpenTime(res.data.now);
              const schdTimeList = res.data.schdTimeList;
              let schdTime = {}; // 시간별 선점 시간
              let maxTime = {};
              // 간호사가능일정 조회
              res.data.nrsSchdList.forEach(function (row) {
                const psblN = row.mergePsblYn.match(/N/g);
                const psblNCnt = psblN ? psblN.length : 0;
                const psblTotCnt = row.mergePsblYn.length;
                const $link = $(
                  '.dates .day button[data-cal-dt="' + row.schdDt + '"]'
                );

                schdTime[row.schdDt] = 0;
                // 예약 가능 일정 조회
                if (row.schdDt > strNowDt) {
                  // 미래
                  maxTime[row.schdDt] = psblTotCnt - psblNCnt;
                } else if (row.schdDt === strNowDt) {
                  // 오늘
                  const arrMergePsblYN = row.mergePsblYn.split("");
                  const newMergePsblYn = [];
                  $(schdTimeList).each(function (k, v) {
                    if (
                      v >= strOpenTm &&
                      arrMergePsblYN.length > k &&
                      arrMergePsblYN[k] == "Y"
                    ) {
                      newMergePsblYn.push("Y");
                    }
                  });
                  maxTime[row.schdDt] = newMergePsblYn.length;
                } else {
                  // 과거
                  maxTime[row.schdDt] = 0;
                }
                // 편집 활성화
                if (maxTime[row.schdDt] > 0) {
                  $link.parent("div.current").removeClass("disable");
                }
              });

              // 상담(예약)일정 - 날짜별 시간합산
              res.data.eduSchdList.forEach((row) => {
                const startTime = ~~row.schdStHh * 60 + ~~row.schdStMi;
                const endTime = ~~row.schdEndHh * 60 + ~~row.schdEndMi;
                const diffTime = (endTime - startTime) / 30; // 30분을 1타임으로 계산
                if (row.schdDt > strNowDt) {
                  // 미래
                  schdTime[row.schdDt] = ~~schdTime[row.schdDt] + diffTime;
                } else if (row.schdDt === strNowDt) {
                  // 오늘
                  if (strOpenTm < row.schdEndHh + "" + row.schdEndMi) {
                    schdTime[row.schdDt] = ~~schdTime[row.schdDt] + diffTime;
                  }
                } else {
                  // 과거
                  schdTime[row.schdDt] = 0;
                }
              });
              // 예약현황 - 출력
              for (const key in schdTime) {
                // 교육/상담 신청률 0~40% : 녹색, 40~70% : 오랜지색, 70% 초과 : 빨강​
                const rsvtRate =
                  maxTime[key] === 0 ? 0 : schdTime[key] / maxTime[key];
                let cssName = "cir04";
                if (
                  !$('.dates .day button[data-cal-dt="' + key + '"]')
                    .parents(".day")
                    .hasClass("disable")
                ) {
                  if (rsvtRate > 0.7 && rsvtRate < 1) {
                    cssName = "cir03";
                  } else if (rsvtRate <= 0.7 && rsvtRate > 0.4) {
                    cssName = "cir02";
                  } else if (rsvtRate <= 0.4) {
                    cssName = "cir01";
                  }
                }
                $('.dates .day button[data-cal-dt="' + key + '"]').append(
                  '<div class="circle ' + cssName + '"><!-- 신청현황 --></div>'
                );
              }
              $(".calendar .dates .day.disable button").on(
                "click",
                function () {
                  const dt = $(this).data("cal-dt");
                  const limitDt = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    today.getDate() + 30
                  );
                  const strLimitDt = calendarJs.dateToStr8(
                    limitDt.getFullYear(),
                    limitDt.getMonth() + 1,
                    limitDt.getDate()
                  );

                  if (dt < strNowDt) {
                    alert("지난 날짜는 신청할 수 없습니다.");
                    return;
                  } else if (dt > strLimitDt) {
                    alert(
                      "상담신청은 오늘 이후 30일까지만 가능합니다.\n원하실 경우 온라인문의를 통해 담당간호사에게 요청해주세요."
                    );
                    return;
                  } else if ($(this).attr("data-rsvt-state") == "closed") {
                    alert(
                      "마감되어 신청가능한 시간이 없습니다.\n다른 날짜를 선택해 주세요."
                    );
                    return;
                  }
                }
              );
              $(".calendar .dates .day:not(.disable) button").on(
                "click",
                function () {
                  const dt = $(this).data("cal-dt");
                  if (dt) {
                    // 상담가능일정관리 상세
                    const pathname = window.location.pathname.split("/");
                    const newpath = [];
                    pathname.filter((v, i) => {
                      if (v.indexOf(".do") == -1) newpath.push(v);
                    });
                    const path = newpath.join("/");
                    window.location.href =
                      (path ? path : "/product") +
                      "/rsvt_timetable.do?dt=" +
                      dt;
                  }
                }
              );
            }
          }
        );
      }
    }

    // ------------------------------------------------------------+| 타임테이블 렌더링 |+------------------------------------------------------------ //
    function renderTimeTable(thisMonth) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const strNowDt = calendarJs.dateToStr8(
        today.getFullYear(),
        today.getMonth() + 1,
        today.getDate()
      );

      // 렌더링을 위한 데이터 정리
      currentYear = thisMonth.getFullYear();
      currentMonth = thisMonth.getMonth();
      currentDate = thisMonth.getDate();

      // 저장버튼 초기화
      calendarJs.setEduApplyBtnState(null, "");

      // 현재 월 표기
      $(".year-month").html(
        "<span>" +
          currentYear +
          "</span>년 <span>" +
          (currentMonth + 1) +
          "</span>월"
      );

      // 이번 달의 마지막날 날짜와 요일 구하기
      var endDay = new Date(currentYear, currentMonth + 1, 0),
        nextDate = endDay.getDate();

      $("#divTimeTable table").css(
        "width",
        "calc((22.75vw * " + (nextDate + 1) + ") - 40px)"
      );
      // 월별 일수 계산 후 타임테이블 세팅 및 공휴일 데이터값 보정
      let tbodyCell = $("#divTimeTable table tbody tr"),
        theadCell = $("#divTimeTable table thead tr"),
        week = undefined,
        day = undefined;

      theadCell.html("");
      tbodyCell.html("");

      for (var i = 0; i < nextDate; i++) {
        const strCurDate = calendarJs.dateToStr8(
          currentYear,
          currentMonth + 1,
          i + 1
        );
        const weekday = ["일", "월", "화", "수", "목", "금", "토"];
        day = new Date(currentYear, currentMonth, i + 1);
        week = weekday[day.getDay()];
        theadCell.append(
          "<th " +
            (strCurDate == strNowDt ? ' class="today"' : "") +
            ' data-head-dt="' +
            strCurDate +
            '"><span>' +
            (i + 1) +
            " (" +
            week +
            ")</span></th>"
        );
        tbodyCell.each(function () {
          const tm = $(this).data("schd-tmlv") + "";
          const hour = tm.substring(0, 2);
          const min = tm.substring(2, 4);
          const applyDate =
            calendarJs
              .dateToStr10(currentYear, currentMonth + 1, i + 1)
              .replace("-", ".") +
            " " +
            hour +
            ":" +
            min +
            "~ ";

          $(this).append(
            '<td><button type="button" name="btnApplyDate" data-schd-dt="' +
              strCurDate +
              '" data-apply-dt="' +
              applyDate +
              '" data-schd-st-hh="' +
              hour +
              '" data-schd-st-mi="' +
              min +
              '" data-type="0">' +
              (hour + ":" + min) +
              "</button></td>"
          );
        });
        if (week === "토") {
          theadCell.find("th:eq(" + i + ")").css("color", "#3263e0");
        } else if (week === "일") {
          theadCell.find("th:eq(" + i + ")").css("color", "#e32828");
        }
      }

      calendarJs.getNurseScheduleApi(
        {
          startDt: calendarJs.dateToStr8(
            thisMonth.getFullYear(),
            thisMonth.getMonth() + 1,
            1
          ),
          endDt: calendarJs.dateToStr8(
            thisMonth.getFullYear(),
            thisMonth.getMonth() + 1,
            nextDate
          ),
          ipsbRsnYn: "N",
          rsvtSchdYn: "Y",
          checkEduYn: "Y",
        },
        function (res) {
          if (res && res.resultCode === "success") {
            const strOpenTm = calendarJs.getTodayOpenTime(res.data.now);
            // 예약현황 출력
            calendarJs.printMyRsvtSchd(res.data.mySchdList);
            calendarJs.cntMySchdList =
              res.data.mySchdList === null ? null : res.data.mySchdList.length;
            // 교육 이수 여부
            calendarJs.eduYn = res.data.eduYn;
            // 상담신청 가능여부
            calendarJs.ableCounselYn = res.data.ableCounselYn;

            const eduSchdList = res.data.eduSchdList;
            res.data.nrsSchdList.forEach(function (schdRow) {
              tbodyCell.each(function () {
                const tm = $(this).data("schd-tmlv") + "";
                const hour = tm.substring(0, 2);
                const min = tm.substring(2, 4);
                const key =
                  "h" + hour + (min == "00" ? "" : "M" + min) + "PsblYn";
                const psblYn = schdRow[key];

                let btnType = 0; // default : 불가
                let btnMyRsvt = false;
                // 예약여부 확인
                const eduSchd =
                  eduSchdList == null
                    ? []
                    : eduSchdList.filter((eduRow) => {
                        if (
                          eduRow.schdDt == schdRow.schdDt &&
                          tm >= eduRow.schdStHh + "" + eduRow.schdStMi &&
                          tm < eduRow.schdEndHh + "" + eduRow.schdEndMi
                        )
                          return true;
                        return false;
                      });
                if (
                  schdRow.schdDt < strNowDt ||
                  (schdRow.schdDt == strNowDt && tm < strOpenTm)
                ) {
                  // 과거
                  btnType = 0;
                } else {
                  if (eduSchd.length > 0) {
                    // 예약
                    btnType = 0;
                    btnMyRsvt = eduSchd[0].sichPrntMbrId != null;
                  } else {
                    if (psblYn == "Y") {
                      // 가능
                      btnType = 1;
                    } else {
                      // 불가
                      btnType = 0;
                    }
                  }
                }
                if (btnMyRsvt) {
                  const eduSchdInfo = eduSchd[0];
                  const strTime =
                    eduSchdInfo.schdStHh +
                    ":" +
                    eduSchdInfo.schdStMi +
                    " ~ " +
                    eduSchdInfo.schdEndHh +
                    ":" +
                    eduSchdInfo.schdEndMi;
                  const startTime =
                    ~~eduSchdInfo.schdStHh * 60 + ~~eduSchdInfo.schdStMi;
                  const endTime =
                    ~~eduSchdInfo.schdEndHh * 60 + ~~eduSchdInfo.schdEndMi;
                  const diffTime = (endTime - startTime) / 30; // 30분을 1타임으로 계산

                  if (tm === eduSchdInfo.schdStHh + "" + eduSchdInfo.schdStMi) {
                    const applyDate =
                      calendarJs
                        .dateToStr10(
                          eduSchdInfo.schdDt.substring(0, 4),
                          eduSchdInfo.schdDt.substring(5, 6),
                          eduSchdInfo.schdDt.substring(6, 8)
                        )
                        .replace("-", ".") +
                      " " +
                      strTime;
                    $(this)
                      .find('[data-schd-dt="' + schdRow.schdDt + '"]')
                      .before(
                        '<a href="javascript:;"  name="btnCancelDate" class="scheduled" data-apply-dt="' +
                          applyDate +
                          '" data-schd-seq="' +
                          eduSchdInfo.schdSeq +
                          '" style="height:' +
                          diffTime * 100 +
                          '%;"><div class="time">[' +
                          strTime +
                          "]</div><p>" +
                          eduSchdInfo.schdTpNm +
                          " 신청 완료</p></a>"
                      );
                  }
                } else {
                  $(this)
                    .find('[data-schd-dt="' + schdRow.schdDt + '"]')
                    .attr("data-type", btnType);
                }
              });
            });
            // 과거 날찌/시간 disabled 처리
            tbodyCell.find('button[data-type="0"]').attr("disabled", true);

            // 타임테이블 내부 버튼 클릭 시
            const $btnSchd = $(
              '#divTimeTable [name="btnApplyDate"], #divTimeTable [name="btnCancelDate"]'
            );
            $btnSchd.on("click", function () {
              const schdMode = calendarJs.getSchdMode();
              const btnType = $(this).attr("name");
              const schdDate = $(this).data("schd-dt");
              const idx = $btnSchd.index($(this));
              $btnSchd.filter(":not(:eq(" + idx + "))").removeClass("on");
              $(this).toggleClass("on");
              if (schdMode === "01") {
                // 교육일 경우 1시간후도 선택
                const $btnNextTime = $(this)
                  .parents("tr")
                  .next()
                  .find(
                    '[name="btnApplyDate"][data-schd-dt="' + schdDate + '"]'
                  );
                if ($(this).hasClass("on")) {
                  $btnNextTime.addClass("on");
                } else {
                  $btnNextTime.removeClass("on");
                }
              }
              if (!calendarJs.setEduApplyBtnState($(this), btnType)) {
                // 버튼 셋팅 실패시 전체 비활성화
                $btnSchd.removeClass("on");
              }
            });
          }
        }
      );

      // scroll-y wrapper 생성
      const theadH = $("#divTimeTable table thead").height();
      $(".time_wrap .scrollbar-y")
        .css("margin-top", theadH + "px")
        .css("height", $("#divTimeTable").height() - theadH + "px");
      calendarJs.setTimeTableScroll();

      // 렌더링시 현재 날짜로 타임테이블 스크롤 포커싱 맞추기
      if (calendarJs.isTimeTableScroll === false) {
        calendarJs.isTimeTableScroll = true;
      } else {
        const posTargetX = calendarJs.dateToStr8(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        );
        const posX = $(
          '#divTimeTable table thead tr th[data-head-dt="' + posTargetX + '"]'
        ).offset();
        const posY = $(
          '#divTimeTable table tbody tr[data-schd-tmlv="' + initTime + '"]'
        ).offset();
        const posYStart = $("#divTimeTable table tbody tr:eq(0)").offset();

        $("#divTimeTable").animate(
          {
            scrollLeft: posX ? posX.left : 0,
            scrollTop: (posY ? posY.top : 0) - (posYStart ? posYStart.top : 0),
          },
          100,
          calendarJs.setTimeTableScroll
        );
      }

      // *타임테이블 스크롤 시 가장자리 정보 셀 고정
      /*
			$('#divTimeTable').on('load resize scroll', function() {
				$("thead").css("top", 0 + $(this).scrollTop());
				$(".moveL").css("left", 0 + $(this).scrollLeft());
				$(this).children('span').css({"top": 1 + $(this).scrollTop(), "left": 0 + $(this).scrollLeft()});
			});
			*/
    }

    // ------------------------------------------------------------+| 작동 기능들 |+------------------------------------------------------------ //

    // 페이지별 렌더링 불러오기
    if ($(".cal_wrap").length) {
      renderCalender(thisMonth);
    } else if ($("#divTimeTable").length) {
      renderTimeTable(thisMonth);
    }
    calendarJs.setCalCurrentDate(thisMonth);

    // 이전달로 이동
    $(".go-prev").off("click");
    $(".go-prev").on("click", function () {
      if ($(".cal_wrap").length) {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
      } else if ($("#divTimeTable").length) {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderTimeTable(thisMonth);
      }
      calendarJs.setCalCurrentDate(thisMonth);
    });

    // 다음달로 이동
    $(".go-next").off("click");
    $(".go-next").on("click", function () {
      if ($(".cal_wrap").length) {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderCalender(thisMonth);
      } else if ($("#divTimeTable").length) {
        thisMonth = new Date(currentYear, currentMonth + 1, 1);
        renderTimeTable(thisMonth);
      }
      calendarJs.setCalCurrentDate(thisMonth);
    });

    // 드래그(스와이프) 이벤트를 위한 변수 초기화
    let startPoint = 0,
      endPoint = 0;
    let vStartPoint = 0,
      vEndPoint = 0;
    var calBoard = undefined,
      detectCal = 0;

    if ($(".cal_wrap, .scheduel_wrap").length) {
      detectCal = 80; // 스와이프 인식 감도 (높을수록 스와이프 길게 해야 함)
      calBoard = document.querySelector(".dates");
    } else if ($("#divTimeTable").length) {
      calBoard = document.querySelector("#divTimeTable");
    }

    if ($(".calendar").length) {
      // 모바일 터치 이벤트 (스와이프)
      calBoard.addEventListener("touchstart", (e) => {
        startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
        vStartPoint = e.touches[0].pageY;
      });
      calBoard.addEventListener("touchend", (e) => {
        endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
        vEndPoint = e.changedTouches[0].pageY;

        // 오른쪽으로 스와이프 된 경우 (prev move)
        if (
          startPoint < endPoint - detectCal &&
          vStartPoint < vEndPoint + 40 &&
          vStartPoint + 40 > vEndPoint
        ) {
          // 캘린더페이지
          if ($(".cal_wrap").length) {
            thisMonth = new Date(currentYear, currentMonth - 1, 1);
            renderCalender(thisMonth);
          }

          // 왼쪽으로 스와이프 된 경우 (next move)
        } else if (
          startPoint > endPoint + detectCal &&
          vStartPoint > vEndPoint - 40 &&
          vStartPoint - 40 < vEndPoint
        ) {
          if ($(".cal_wrap").length) {
            thisMonth = new Date(currentYear, currentMonth + 1, 1);
            renderCalender(thisMonth);
          }
        }
      });
    }

    if ($(".register").length) {
      const sensitive = 2; //감도 1.5
      const speed = 30; //속도 300
      let oriScrollX,
        oriScrollY = 0;
      let oriScrollLeft,
        oriScrollTop = 0;
      // 모바일 터치 이벤트 (스와이프)
      calBoard.addEventListener("touchstart", (e) => {
        oriScrollX = e.touches[0].pageX; // 터치가 시작되는 위치 저장
        oriScrollY = e.touches[0].pageY;
        oriScrollLeft = $("#divTimeTable").scrollLeft();
        oriScrollTop = $("#divTimeTable").scrollTop();
      });
      calBoard.addEventListener("touchmove", (e) => {
        const fromX = oriScrollX;
        const fromY = oriScrollY;
        const toX = e.changedTouches[0].pageX; // 현재 위치 저장
        const toY = e.changedTouches[0].pageY;

        const angle = calendarJs.getAngle(oriScrollX, oriScrollY, toX, toY);
        if (angle >= -45 && angle < 45) {
          //console.log('left');
          $("#divTimeTable").animate(
            {
              scrollLeft: oriScrollLeft + (fromX - toX) * sensitive,
            },
            speed,
            calendarJs.setTimeTableScroll
          );
        } else if (angle >= 45 && angle <= 135) {
          //console.log('under');
          $("#divTimeTable").animate(
            {
              scrollTop: oriScrollTop + (fromY - toY) * sensitive,
            },
            speed,
            calendarJs.setTimeTableScroll
          );
        } else if (
          (angle >= 135 && angle <= 180) ||
          (angle >= -180 && angle <= -135)
        ) {
          //console.log('right');
          $("#divTimeTable").animate(
            {
              scrollLeft: oriScrollLeft - (toX - fromX) * sensitive,
            },
            speed,
            calendarJs.setTimeTableScroll
          );
        } else if (angle >= -135 && angle <= -45) {
          $("#divTimeTable").animate(
            {
              scrollTop: oriScrollTop - (toY - fromY) * sensitive,
            },
            speed,
            calendarJs.setTimeTableScroll
          );
        }
      });
      calBoard.addEventListener("touchend", () => {
        oriScrollX, (oriScrollY = 0);
      });
    }
  },
};

var eduApply = {
  init: () => {
    //오늘 표시
    var today = $("#divTimeTable thead tr .today");
    var idx = $("#divTimeTable thead tr th").index(today);

    $("#divTimeTable tbody tr").each(function (i) {
      $("#divTimeTable tbody tr")
        .eq(i)
        .children("td")
        .eq(idx)
        .css({ background: "#fff7f8" });
    });

    $('#divTimeTable button[data-type="1"]').on("click", function () {
      $(this).toggleClass("on");
    });

    $("#divTimeTable tbody tr .scheduled").on("click", function () {
      $(this).toggleClass("on");
    });

    //교육/상담 신청사유 "기타"일 경우 입력칸 생성
    var selectType = $(".pop_apply .select_row:nth-of-type(2)>select");
    selectChange(selectType);
    function selectChange(type) {
      type.change(function () {
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);

        if (select_name === "기타") {
          $(".pop_apply .area_box").show();
        } else {
          $(".pop_apply .area_box").hide();
        }
      });
    }
  },
};
