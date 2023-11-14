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
        var selectType0 = $(".select_row>select, .select_tel>select, .select_srh>select");

        selectChange(selectType0);

        function selectChange(type){
            type.change(function(){
                var select_name = $(this).children("option:selected").text();
                $(this).siblings("label").text(select_name);
            });
        };
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
		$(".note_box").each(function(){
			if($(this).find("p").text()==""){
				$(this).prev("tr").find(".btn_note").css("opacity","0.3");
			}else {
				$(this).prev("tr").find(".btn_note").css("opacity","1");
			}

		});

		$(".btn_note").on("click",function(){

			if(!$(this).parents().next(".note_box").hasClass("blind")){
			   $(this).parents("tr").next(".note_box").addClass("blind");
			   $(this).removeClass("on");
			}else{
				if(!$(this).parents("tr").next(".note_box").find("p").text()=="") {
					$(this).parents("tr").next(".note_box").removeClass("blind");
					$(this).addClass("on");
				}else {
					
					$(this).parents("tr").next(".note_box").addClass("blind");
					$(this).removeClass("on");
				}

			}
		});
	}
};

function popupInfo(popInfo) {
  var popthis = $(".pop_info."+popInfo);
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

function popupOpen(popConts) {
  var popthis = $(".pop_wrap."+popConts);
  popthis.fadeIn(300);
  $(".wrap_sub").addClass("not_scroll");
   popthis.find(".pop_close").click(function(){
       popthis.fadeOut(300);
       $(".wrap_sub").removeClass("not_scroll");
   });
}

function popupAlert(popAlert) {
  var popthis = $(".popup_alert#"+popAlert);
  popthis.addClass("on");
	popthis.find('.pop_content').css('display','block');
  $(".wrap_sub").addClass("not_scroll");
   popthis.find(".pop_close").click(function(){
       popthis.removeClass("on");
			 popthis.find('.pop_content').css('display','none');
       $(".wrap_sub").removeClass("not_scroll");
   });
}

function popClose(element) {
	$(element).parents('.popup').removeClass('on');
}

function popupsrh() {
	$("#search_name").val($("#cHospitalName").val());
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
	  var mask = $(".pop_mask_doctor");
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


var dateEvent = {
	    init:function(){
	        $.datepicker.setDefaults( $.datepicker.regional["ko"]);
	        $(".date").datepicker({
	            dateFormat : 'yy-mm-dd',
	            showOn: "both",
	            buttonImage: "/resource/assets/nurse/images/common/icon_schedule.png",
	            buttonImageOnly: true
	        });

	    
	    }
};

/* 20230130 추가 */

var datetimeEvent = {
	init:function(){
		jQuery.datetimepicker.setLocale('kr');
		$(".datetime").datetimepicker({
			lang : 'ko',
			format:'Y-m-d H:i',
			step: 30,
			allowTimes: [
				"9:00",
				"9:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
        "13:00",
        "13:30",
        "14:00",
        "14:30",
        "15:00",
        "15:30",
        "16:00",
        "16:30",
        "17:00",
        "17:30",
				"18:00",
				"18:30",
      ],
		});

	
	}
};


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