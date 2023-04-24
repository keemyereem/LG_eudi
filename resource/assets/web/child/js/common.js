var mySlider = {
  init:function(){
    $(".my_slider").slick({
      infinite: true,
      dots: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      touchMove : true,
      draggable : true,
      focusOnSelect: false
    });
  }
};

var gnbMenu = {
  init:function(){
    $(".header .menu").find("a").on("click",function(){
       $(".gnb_box").css("display","block");
       $(".gnb_box .gnb_bg").stop().animate({ left:0 },300);
    });
    $(".gnb_box .gnb_close").find("a").on("click",function(){
       $(".gnb_box .gnb_bg").stop().animate({ left:"-300px" },300,function(){
           $(".gnb_box").css("display","none");
       });
    });
  }
}

var selEvent = {
    init:function(){
        var selectType0 = $(".select_row>select, .select_tel>select");

        selectChange(selectType0);

        function selectChange(type){
            type.change(function(){
                var select_name = $(this).children("option:selected").text();
                $(this).siblings("label").text(select_name);
            });
        };
        
    }
};

var agreeChk = {
  init:function(){
    $('.chkAgreeAll').click(function(){
      if($(".chkAgreeAll").is(":checked")){
        $('.chkAgree').prop('checked', true);
      }else{
        $('.chkAgree').prop('checked', false);
      }
    });
    $('.chkDisagree').click(function(){
      if($(".chkDisagree").is(":checked")){
        $('.chkAgreeAll').prop('checked', false);
      }else{
      
      }
    });
  }
};

var tabEvent = {
    init:function(){
        $(".sub_tab ul li>a").on("click",function(){
          var tabType = $(this).parent().index();
          $(".sub_tab ul li").removeClass("active");
          $(this).parent().addClass("active");
          $(".tab_cont").addClass("blind");
          $(".tab_cont0"+tabType).removeClass("blind");
        });
    }
};

var tabEvent02 = {
    init:function(){
        $(".sub_tab02 ul li>a").on("click",function(){
          var tabType = $(this).parent().index();
          $(".sub_tab02 ul li").removeClass("active");
          $(this).parent().addClass("active");
          $(".tab_cont").addClass("blind");
          $(".tab_cont0"+tabType).removeClass("blind");
        });
    }
};

var fileEvent = {
  init:function(){
	  
  var fileTarget = $('.upload_hidden');
    fileTarget.on('change', function(){
       if(window.FileReader){
         var filename = $(this)[0].files[0].name;
       }
       else {
         var filename = $(this).val().split('/').pop().split('\\').pop();
       }
       $('.upload_field').css("display","block");
       $('.upload_name').val(filename);
    });
	    
	    
    var fileTarget = $('.upload_hidden1');
    fileTarget.on('change', function(){
       if(window.FileReader){
         var filename = $(this)[0].files[0].name;
       }
       else {
         var filename = $(this).val().split('/').pop().split('\\').pop();
       }
       
       var ext = $(this).val().split(".").pop().toLowerCase();

       if($.inArray(ext, ["gif","jpg","png","jpeg"]) == -1){
           alert("5MB 이하의 이미지파일(JPG, PNG, GIF) 1개를 첨부하실 수 있습니다.");
           return;
       }
       
       // 용량 체크
       var fileSize = this.files[0].size;
       var maxSize =  5 * 1024 * 1024;

       if(fileSize > maxSize){
     	  alert("5MB 이하의 이미지파일(JPG, PNG, GIF) 1개를 첨부하실 수 있습니다.");
           return;
       }
       
       
       $('.upload_field1').css("display","block");
       $('.upload_name1').val(filename);
    });
    
    var fileTarget = $('.upload_hidden2');
    fileTarget.on('change', function(){
       if(window.FileReader){
         var filename = $(this)[0].files[0].name;
       }
       else {
         var filename = $(this).val().split('/').pop().split('\\').pop();
       }
       
       var ext = $(this).val().split(".").pop().toLowerCase();
       if($.inArray(ext, ["gif","jpg","png","jpeg"]) == -1){
           alert("5MB 이하의 이미지파일(JPG, PNG, GIF) 1개를 첨부하실 수 있습니다.");
           return;
       }
       
       // 용량 체크
       var fileSize = this.files[0].size;
       var maxSize =  5 * 1024 * 1024;

       if(fileSize > maxSize){
     	  alert("5MB 이하의 이미지파일(JPG, PNG, GIF) 1개를 첨부하실 수 있습니다.");
           return;
       }
       
       
       $('.upload_field2').css("display","block");
       $('.upload_name2').val(filename);
    });
    
    var fileTarget = $('.upload_hidden3');
    fileTarget.on('change', function(){
       if(window.FileReader){
         var filename = $(this)[0].files[0].name;
       }
       else {
         var filename = $(this).val().split('/').pop().split('\\').pop();
       }
       
       var ext = $(this).val().split(".").pop().toLowerCase();
       if($.inArray(ext, ["gif","jpg","png","jpeg"]) == -1){
           alert("5MB 이하의 이미지파일(JPG, PNG, GIF) 1개를 첨부하실 수 있습니다.");
           return;
       }
       
       // 용량 체크
       var fileSize = this.files[0].size;
       var maxSize =  5 * 1024 * 1024;

       if(fileSize > maxSize){
     	  alert("5MB 이하의 이미지파일(JPG, PNG, GIF) 1개를 첨부하실 수 있습니다.");
           return;
       }
       
       
       $('.upload_field3').css("display","block");
       $('.upload_name3').val(filename);
    });
  }
};

var accordEvent = {
    init:function(){
      $(".faq_list>ul>li>.faq_box").slideUp(0);
      $(".faq_list>ul>li>a").on("click",function(){
          if(!$(this).parent().hasClass("active")){
              $(this).parent().siblings().removeClass("active");
              $(this).parent().siblings().find(".faq_box").slideUp(200);
              $(this).parent().addClass("active");
              $(this).parent().find(".faq_box").slideDown(200);
          }else{
              $(this).parent().removeClass("active");
              $(this).parent().find(".faq_box").slideUp(200);
          }
      });
    }
};

var tabClick = {
    init:function(){
      $(".chartTop>ul>li>a").on("click",function(){
        if(!$(this).parent().hasClass("active")){
            $(this).parent().siblings().removeClass("active");
            $(this).parent().addClass("active");
        }
      });
    }
};

var noteOpen = {
	init:function(){
	      $(".btn_note").on("click",function(){
	          if(!$(this).parents().next(".note_box").hasClass("blind")){
	              $(this).parents("tr").next(".note_box").addClass("blind");
	              $(this).removeClass("on");
	          }else{
	              $(this).parents("tr").next(".note_box").removeClass("blind");
	              $(this).addClass("on");
	          }
	      });
	 }
};

var deleteList = {
	init:function(){
		  $('.btn_delete').on("click",function(){
		      var deleteConfirm = confirm('의사선생님 확인을 삭제하시겠습니까?');
		      if(deleteConfirm ==true){
		        $(this).parents('tr').hide();
		      }      
		  })
	 }
};

var dateList = {
	init:function(){
		  $("input[id='toggle']").click(function(){
		      if($(this).is(":checked")) {
		        $('.date_list').show();
		      }else {
		        $('.date_list').hide();
		      }
		  });
	 }
};

/* 교육/상담 캘린더 2023.02.08 추가 */
var calendar = {
  init:function(){
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
          calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable">' + i + '</div>';     
      }
      // 이번달
      for (var i = 1; i <= nextDate; i++) {
          calendar.innerHTML = calendar.innerHTML + '<div class="day current"><a href="javascript:;" title="dates">' + i + '<div class="circle"></div></a></div>'
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
    
      if(!$('.calendar .cal_wrap').hasClass('register')){  //교육/상담신청 캘린더
        // 연도수와 월을 데이터로 저장
        var getData = ['2023', '2'];
  
        if (calendar.dataset.cal === getData[0] + '년 ' + getData[1] + '월') { // 해당 데이터로 이동 시 정보 불러오기
          
          // 정보 예제 출력
          var cb = $('.dates .day.current a .circle');
  
          cb.eq(20).addClass('cir01');
          cb.eq(21).addClass('cir02');
          cb.eq(22).addClass('cir03');
          cb.eq(23).addClass('cir04');
        }
        
      }
      
    }

    
    // ------------------------------------------------------------+| 타임테이블 렌더링 |+------------------------------------------------------------ //

    function renderTimeTable(thisMonth) {

      // 렌더링을 위한 데이터 정리
      currentYear = thisMonth.getFullYear();
      currentMonth = thisMonth.getMonth();
      currentDate = thisMonth.getDate();

      // 현재 월 표기
      $('.year-month').html('<span>' + currentYear + '</span>년 <span>' + (currentMonth + 1) + '</span>월');
      
      // *타임테이블 스크롤 시 가장자리 정보 셀 고정
      $('.time_wrap').on('load resize scroll', function() {
        $("thead").css("top", 0 + $(this).scrollTop());
        $(".moveL").css("left", 0 + $(this).scrollLeft());
        $(this).children('span').css({"top": 1 + $(this).scrollTop(), "left": 0 + $(this).scrollLeft()});
      });

    }

    // ------------------------------------------------------------+| 작동 기능들 |+------------------------------------------------------------ //
    
    // 페이지별 렌더링 불러오기
    if ($('.cal_wrap').length) {
      renderCalender(thisMonth);
    } else if ($('.time_wrap').length) {
      renderTimeTable(thisMonth);
    }

    // 이전달로 이동
    $('.go-prev').on('click', function() {
      if ($('.cal_wrap').length) {
        thisMonth = new Date(currentYear, currentMonth - 1, 1);
        renderCalender(thisMonth);
        
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

          
          }

        // 왼쪽으로 스와이프 된 경우 (next move)
        } else if (startPoint > endPoint + detectCal && vStartPoint > vEndPoint - 40 && vStartPoint - 40 < vEndPoint) {
          if ($('.cal_wrap').length) {
            thisMonth = new Date(currentYear, currentMonth + 1, 1);
            renderCalender(thisMonth);

          }
        }
        
      });
    }

  },
};


var eduApply = {
  init: () => {

    //오늘 표시
    var today = $('.time_wrap thead tr .today');
    var idx = $('.time_wrap thead tr td').index(today);

    $('.time_wrap tbody tr').each(function(i){
      $('.time_wrap tbody tr').eq(i).children('td').eq(idx).css({'background':'#fff7f8'});
    });

    $('.time_wrap button[data-type="1"]').on('click', function(){
      $(this).toggleClass('on');
    });

    $('.time_wrap tbody tr .scheduled').on('click', function(){
      $(this).toggleClass('on');
    });

    //교육/상담 신청사유 "기타"일 경우 입력칸 생성
    var selectType = $(".pop_apply .select_row>select");
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



function loginEvent() {
	  var wW = $(window).width();
	  var wH = $(window).height()
	  var boxH = $(".intro_bot").height()+25;
	  var topH = $(window).height()-boxH;
	  $(".intro_box").css("height",topH);

	  if($(".intro_box").height()<=210){
	    $(".intro_bg .logo").addClass("blind");
	    $(".intro_bg .logo02").removeClass("blind");
	  } else {
	    $(".intro_bg .logo02").addClass("blind");
	    $(".intro_bg .logo").removeClass("blind");
	  }
	}

/* POPUP */
function popupOpen(popConts) {
  var popthis = $(".pop_wrap."+popConts);
  popthis.fadeIn(300);
  $(".wrap_sub, .wrap_main").addClass("not_scroll");
  popthis.find(".pop_close").click(function(){
      popthis.fadeOut(300);
      $(".wrap_sub, .wrap_main").removeClass("not_scroll");
  });
}

function popupInfo(popInfo) {
  //응원메시지 초기화
  if(popInfo == "pop_msg"){document.getElementById("message").value='';}
  var popthis = $(".pop_info."+popInfo);
  var mask = $(".pop_mask");
  popthis.css({
    "top":  (($(window).height()-popthis.outerHeight())/2) + $(window).scrollTop()+"px",
    "left": (($(window).width()-popthis.outerWidth())/2+$(window).scrollLeft())+"px",
  });
  popthis.fadeIn(300);
  mask.css("display","block");
  popthis.find(".pop_close").off('click');
  popthis.find(".pop_close").on('click', function(){
      popthis.fadeOut(300);
      mask.css("display","none");
  });

  // 2차 팝업 띄우기 - 2023.03.17
  if ($('.pop_apply2').length) {
    $('.pop_continue').off('click');
    $('.pop_continue').on('click', function() {
      $('.pop_apply').hide();
    })
  }
}


function popupInfoSmart(popInfo) {
	  var popthis = $(".pop_info."+popInfo);
	  var mask = $(".pop_mask_smart");
	  popthis.css({
	    "top":  (($(window).height()-popthis.outerHeight())/2) + $(window).scrollTop()+"px",
	    "left": (($(window).width()-popthis.outerWidth())/2+$(window).scrollLeft())+"px",
	  });
	  popthis.fadeIn(300);
	  mask.css("display","block");
	  popthis.find(".pop_close").click(function(){
	      popthis.fadeOut(300);
	      mask.css("display","none");
	  });
	}


/*
function popupInfo2(popInfo) {
	  var popthis = $(".pop_info."+popInfo);
	  var mask = $(".pop_mask2");
	  alert("222");
	  popthis.css({
	    "top":  (($(window).height()-popthis.outerHeight())/2) + $(window).scrollTop()+"px",
	    "left": (($(window).width()-popthis.outerWidth())/2+$(window).scrollLeft())+"px",
	  });
	  popthis.fadeIn(300);
	  mask.css("display","block");
	  popthis.find(".pop_close").click(function(){
	      popthis.fadeOut(300);
	      mask.css("display","none");
	  });
	}
*/

function popupLevel() {
  var popthis = $(".pop_level");
  var mask = $(".pop_mask");
  popthis.css({
	  "top":  (($(window).height()-popthis.outerHeight())/2) + $(window).scrollTop()+"px",
	  "left": (($(window).width()-popthis.outerWidth())/2+$(window).scrollLeft())+"px",
  });
  popthis.fadeIn(300);
  $(".wrap_sub").addClass("not_scroll");
  mask.css("display","block");
  popthis.find(".pop_close").click(function(){
      popthis.fadeOut(300);
      mask.css("display","none");
      $(".wrap_sub").removeClass("not_scroll");
  });
}

function popupBadge(popBadge) {
	  var popthis = $(".pop_badge."+popBadge);
	  var mask = $(".pop_mask");
	  popthis.css({
	      "top":  (($(window).height()-popthis.outerHeight())/2)+"px",
	      "left": (($(window).width()-popthis.outerWidth())/2+$(window).scrollLeft())+"px",
	  });
	  popthis.fadeIn(300);
	  popthis.addClass("on");
	  mask.css("display","block");
	  popthis.find(".pop_close").click(function(){
	      popthis.fadeOut(300);
	      popthis.removeClass("on");
	      mask.css("display","none");
	      if($(".pop_badge").hasClass("on")) {
	        $(".pop_mask").css("display","block");
	      }
	  });
	}

function popupSearch() {
	  var popthis = $(".search_box");
	  var mask = $(".pop_mask");
/*	  popthis.css({
    "top":  (winH/2-popthis.outerHeight()/2)+"px",
	  });*/
	  popthis.fadeIn(300);
	  mask.css("display","block");
	  popthis.find(".pop_close").click(function(){
	      popthis.fadeOut(300);
	      mask.css("display","none");
	  });
	}

function popupHeight() {
  console.log($('.height_measurement').offset().top);
	  var popthis = $(".popup_height");
	  var mask = $(".pop_mask");
	  popthis.css({
    "top":  ($('.height_measurement').offset().top-175)+"px",
	  });
	  popthis.fadeIn(300);
	  mask.css("display","block");
	  popthis.find(".pop_close").click(function(){
	      popthis.fadeOut(300);
	      mask.css("display","none");
	  });
	}

//function addrpop() {
//	  var popbox = $(".addrBox>div");
//	  popbox.css({
//	    "top":  (($(window).height()-popbox.outerHeight())/2) + $(window).scrollTop()+"px",
//	    "left": (($(window).width()-popbox.outerWidth())/2+$(window).scrollLeft())+"px",
//	  });
//	}

//아이 삭제하기(2022-02-09 4m 김현빈)
 function fnDeleteChildData(){
	 	var delname = $("#delname").val();
		var result = confirm("아이 정보가 모두 사라지게 됩니다. 삭제하시겠습니까?");
	    if(result){
	    	var result2 = confirm(delname+" 아이의 정보가 모두 사라지게 됩니다. 삭제하시겠습니까?");
	    	 if(result2){
    			document.frmJoin.action = "/child/deleteEachChildInfo.do";
	 			document.frmJoin.submit();
	 	    }

	    }


}

 
 function popupInfo2(popInfo) {
	  var popthis = $(".pop_info."+popInfo);
	  var mask = $(".pop_mask2");
	  /* 2022.12.01 (1)유디 팝업 가변형 css 기능화 실행 */
	  adjustPopupCont();
	  
	  /* 2022.12.01 (2)유디 팝업 가변형 중앙정렬 추가 */
	  $(window).on('load resize', ()=> {
		  adjustPopupCont()
	  })
	  
	  popthis.fadeIn(300);
	  mask.css("display","block");
	  popthis.find(".pop_close").click(function(){
	      popthis.fadeOut(300);
	      mask.css("display","none");
	  });
	  
	  /* 2022.12.01 (1)유디 팝업 가변형 css 기능화 */
	  function adjustPopupCont() {
		  popthis.css({
		    "top":  (($(window).height()-popthis.outerHeight())/2.1) + $(window).scrollTop()+"px",
		    "left": (($(window).width()-popthis.outerWidth())/2+$(window).scrollLeft())+"px",
		  });
	  }
	}

 
 
 function fnCheerInsert(){
	 let message = $("#message").val();
		 if(message.trim() == ""){
			 alert("입력글이 없습니다");
			 $("#message").focus();
			 return;
		 }
		 var cheerData = { "message": message };
		 
		 $.ajax({
				type : "POST",
				url: "/cheer/insertProc.do",
				 data : cheerData,
				datatype : "json",
				success : function(json) {
					if (json.result == 2){
						alert("등록할 수 없는 단어가 입력되었습니다.");
						$("#message").val("");
						$("#message").focus();
						return;
					} else 	if (json.result == 1){
						alert("정상적으로 등록되었습니다.");
						location.href = "/child/main.do";
					} 
					
					else {
						alert("서버 에러입니다. 잠시 후 다시 시도해주세요.");
					}
				},
				error : function(xhr, status, error) {
					alert('ajax error' + error);
				}
		   	});
	 }


 
 function fnCheerClose(){
 	var popthis = $(".pop_msg");
 	$(".pop_mask").css("display","none");
     popthis.css("display","none");
     popthis.removeClass("on");
 }


 function cheerRefresh() {
	     var cheerIdx = { "idx": $("#cheerIdx").val()};
	     var cheerArrays  =  Number($("#cheerArrays").val());
	     if(cheerArrays < 1){
	    	 $.ajax({
					type : "POST",
				    data : cheerIdx,
					url: "/cheer/newCheerMessage.do",
					datatype : "json",
					success : function(json) {
						if (json.result > 0) {
							//console.log("새로운 배열 생성");
							cheerList = json.cheerInfo;
							$("#cheerArrays").val("10");
							cheerArrays = 10;
							  document.getElementById("cheer_mesage").innerHTML = "";
								if(Number(fnCheckByte(cheerList[cheerArrays-1].message)) > 30){
									document.getElementById("cheer_mesage").innerHTML = "<span>@"+cheerList[cheerArrays-1].name+"&nbsp;&nbsp;</span>"+"<marquee scrollamount='10' id='cm'>"+cheerList[cheerArrays-1].message+"</marquee>";
								} else {
									document.getElementById("cheer_mesage").innerHTML = "<span>@"+cheerList[cheerArrays-1].name+"&nbsp;&nbsp;</span>"+cheerList[cheerArrays-1].message;
								}
						
								
								
								let cCharacterId =  cheerList[cheerArrays-1].ccharacterId;
								let cCharacterLevel =   cheerList[cheerArrays-1].ccharacterLevel;
								var imgurl;
								imgur = "/resource/assets/web/child/images/profile/img_profile_"+cCharacterId+"eudi_"+cCharacterLevel+".png";
								document.getElementById("cheer_img").src = imgur;
								$("#cheerIdx").val(cheerList[cheerArrays-1].idx);
								
								 cheerArrays = cheerArrays - 1;
					    	     $("#cheerArrays").val(cheerArrays);
						}
					},
					error : function(xhr, status, error) {
						//alert('ajax error' + error);
					}
			   	});
	     } else {//배열 있어서 돌리는 중 
	    		//console.log("배열 있어서 돌리는 중 ");
	    	   document.getElementById("cheer_mesage").innerHTML = "";
				if(Number(fnCheckByte(cheerList[cheerArrays-1].message)) > 30){
					document.getElementById("cheer_mesage").innerHTML = "<span>@"+cheerList[cheerArrays-1].name+"&nbsp;&nbsp;</span>"+"<marquee scrollamount='10' id='cm'>"+cheerList[cheerArrays-1].message+"</marquee>";
				} else {
					document.getElementById("cheer_mesage").innerHTML = "<span>@"+cheerList[cheerArrays-1].name+"&nbsp;&nbsp;</span>"+cheerList[cheerArrays-1].message;
				}

				
				
				let cCharacterId =  cheerList[cheerArrays-1].ccharacterId;
				let cCharacterLevel =   cheerList[cheerArrays-1].ccharacterLevel;
				var imgurl;
				imgur = "/resource/assets/web/child/images/profile/img_profile_"+cCharacterId+"eudi_"+cCharacterLevel+".png";
				document.getElementById("cheer_img").src = imgur;
				$("#cheerIdx").val(cheerList[cheerArrays-1].idx);
				
				 cheerArrays = cheerArrays - 1;
	    	     $("#cheerArrays").val(cheerArrays);
	     }
	
		 
		 
	}

 function fnCheckByte(msg){

	 var str = msg
	 var str_len = str.length;
	 
	 var rbyte = 0;
	 var rlen = 0;
	 var one_char = "";
	 
	 for(var i=0; i<str_len; i++){
	 	one_char = str.charAt(i);
	 	if(escape(one_char).length > 4){
	 	    rbyte += 3;                                         //한글3Byte
	 	}else{
	 	    rbyte++;                                            //영문 등 나머지 1Byte
	 	}
	 }
	
	 return rbyte;

 }

function popupsrh() {
  var popthis = $(".pop_search");
  var mask = $(".pop_mask");
  popthis.css({
    "top":  (($(window).height()-popthis.outerHeight())/2) + $(window).scrollTop()+"px",
    "left": (($(window).width()-popthis.outerWidth())/2+$(window).scrollLeft())+"px",
  });
  popthis.fadeIn(300);
  mask.css("display","block");
  popthis.find(".pop_close").click(function(){
      popthis.fadeOut(300);
      mask.css("display","none");
  });
}




function popupdoctor() {
  var popthis = $(".pop_search_doctor");
  var mask = $(".pop_mask");
  popthis.css({
    "top":  (($(window).height()-popthis.outerHeight())/2) + $(window).scrollTop()+"px",
    "left": (($(window).width()-popthis.outerWidth())/2+$(window).scrollLeft())+"px",
  });
  popthis.fadeIn(300);
  mask.css("display","block");
  popthis.find(".pop_close").click(function(){
      popthis.fadeOut(300);
      mask.css("display","none");
  });
}

$(document).on('keyup focusin focusout','input[data-format-validate]',function(e){
	const format = $(this).data('format-validate');
	const oriVal = $(this).val();
	if (e.type=='keyup') {
		if (validateRexg(format, oriVal)===true){
			$(this).data('prev-value', oriVal);
		}
	} else if (e.type=='focusin') {
		$(this).removeClass('placeholder-err');
		$(this).attr('placeholder','');
	} else if (e.type=='focusout') {
		if (validateRexg(format, oriVal)===false && oriVal){
			$(this).addClass('placeholder-err');
			// 이전값으로 복원
			// $(this).val($(this).data('prev-value'));
			$(this).val('');
			$(this).attr('placeholder',oriVal + '은(는) 입력 할 수 없는 범위입니다.');
		} else {
			$(this).removeClass('placeholder-err');
			$(this).attr('placeholder','');
		}
	}
});

function validateRexg(format, txt){
	let res;
	switch (format) {
		case 'height' : // 키 (소수점 1자리, 50~220)
			res = txt.match(/^([5-9]\d{1}|1\d{2}|2[0-1]\d{1}|220)((\.\d{1})||(\.))?$/);
			if (res <  50 || res > 220) {
				res = null;
			}
			break;
		case 'weight' : // 체중 (소수점 1자리, 10~120)
			res = txt.match(/^([1-9]\d{1}|1[0-1]\d{1}|120)((\.\d{1})||(\.))?$/);
			if (res <  10 || res > 120) {
				res = null;
			}
			break;
		case 'ast-qnty' : // 제품투여량 공통 (0.5~15)
			res = txt.match(/^([0-9]|1[0-5])((\.\d{1})||(\.))?$/);
			if (res <  0.5 || res > 15) {
				res = null;
			}
			break;
		case 'ast-qnty-plus' : // 제품투여량 유트로핀플러스 (0.5~60)
			res = txt.match(/^([0-9]|[1-5]\d{1}|60)((\.\d{1})||(\.))?$/);
			if (res <  0.5 || res > 60) {
				res = null;
			}
			break;
	}
	return res ? true : false;
};