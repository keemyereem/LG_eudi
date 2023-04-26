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
///////////																											 **간호사앱**																																 ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var nurseJS = {
	init: function (initDate) {
		this.nurseSchduleMode = 'normal';
		this.calInit(initDate);
		// this.counselHis();
		this.counselRegis();
		this.btnEvent();
		this.tabEvent();
	},
	nurseSchduleMode: '', // 달력 편집모드 : normal, edit
	calCurrentDate : '', // 현재 스케줄러 달 반환
	isTimeTableScroll : true, // 타임테이블 초기화 후 스크롤 여부 옵션
	setCalCurrentDate : (thisMonth) => { // 현재 스케줄러 달 업데이트
		nurseJS.calCurrentDate = nurseJS.dateToStr8(thisMonth.getFullYear(),thisMonth.getMonth()+1,thisMonth.getDate());
	},
	dateToStr8 : (year, month, day) => { // 날짜 포멧 변경 (YYYYMMDD)
				return year + '' + (month< 10 ? '0' + month : month) + '' + (day< 10 ? '0' + day : day);
	},
	dateToStr10 : (year, month, day) => { // 날짜 포멧 변경 (YYYYMMDD)
				return year + '-' + (month< 10 ? '0' + month : month) + '-' + (day< 10 ? '0' + day : day);
	},
	timeToStr4 : (hour, min) => { // 날짜 포멧 변경 (HHMI)
				return (hour< 10 ? '0' + hour : hour) + '' + (min< 10 ? '0' + min : min);
	},
	setFormState : ($btn, state, msg) => {
		$btn.attr('disabled',state);
		$btn.attr('data-is-disabled',state? 1 : 0); // anchor disabled 처리용
		if (state!==true && msg) {
			alert(msg);
		}
	},
	getNurseScheduleApi : (search, fnCallback) => {
		// 상담가능일정관리 데이터 로딩
		$.ajax({
			type: "POST",
			data: search,
			url : '/api/nurse/rsvt/getNrsSchdList.do',
			dataType : "json",
			success: function(res){
				console.log('상담가능일정관리 >> success ', res);
				if (typeof fnCallback === 'function') {
					fnCallback(res);
				}
			},
			error: function(xhr, option, error){
				console.log('상담가능일정관리 >> error ', xhr, option, error);
			}
		});
	},
	updateNrsSchd : ($btn, $frmUpdate, fnCallback) => {
		if ($btn.attr('data-is-disabled') != 1) {
			nurseJS.setFormState($btn, true);
		} else {
			nurseJS.setFormState($btn, false, '처리중입니다.');
			return;
		}
		
		if (!$frmUpdate.find('[name="schdDts"]').val()) {
			nurseJS.setFormState($btn, false, '날짜를 선택해주세요.');
			return;
		}
		if (!$frmUpdate.find('[name="psblYn"]').val()) {
			nurseJS.setFormState($btn, false, '근무/휴무를 선택해주세요.');
			return;
		}
		$.ajax({
			type: "POST",
			data: $frmUpdate.serialize(),
			url : '/api/nurse/rsvt/updateNrsSchd.do',
			dataType : "json",
			success: function(res){
				if (res.resultCode==='success') {
					console.log('상담가능일정관리 일정 업데이트 >> success ', res);
					const arrComplete = res.data.completeDts.split(',');
					const cntComplete = res.data.completeDts ? arrComplete.length : 0;
					const cntFail = res.data.failDts ? res.data.failDts.split(',').length : 0;
					
					// nurseJS.setFormState($btn, false, '저장이 완료되었습니다. (성공 : ' + cntComplete + '건 /  실패 : ' + cntFail + '건)');
					if (cntFail > 0) {
						nurseJS.setFormState($btn, false, '처리가 불가능합니다.\n일정을 다시 확인해 주세요.');
					} else {
						nurseJS.setFormState($btn, false, '');
					}
					// 현재 스크롤 좌표 유지용. 좌표 이동후 다시 null 처리 필요.
					nurseJS.isTimeTableScroll = false; //$('.time_wrap').scrollLeft();
					// page reset
					if (typeof fnCallback === 'function') {
						fnCallback(cntFail>0 ? false : true);
					}
				} else {
					nurseJS.setFormState($btn, false, '처리중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.');
				};
			},
			error: function(xhr, option, error){
				console.log('상담가능일정관리 일정 업데이트 >> error ', xhr, option, error);
				nurseJS.setFormState($btn, false, '저장에 실패했습니다.');
			}
		});		
	},
	updateEduSchd : ($btn, $frmUpdate, fnCallback) => {
		if ($btn.attr('data-is-disabled') != 1) {
			nurseJS.setFormState($btn, true);
		} else {
			nurseJS.setFormState($btn, false, '처리중입니다.');
			return;
		}
		
		if (!$frmUpdate.find('[name="sichSeq"]').val()) {
			nurseJS.setFormState($btn, false, '신청할 환아를 선택해주세요.');
			return;
		}
		if (!$frmUpdate.find('[name="schdTpCd"]').val()) {
			nurseJS.setFormState($btn, false, '상담 분류를 선택해주세요.');
			return;
		}
		// 상담일 경우
		if ($frmUpdate.find('[name="schdTpCd"]').val() == '02' && !$frmUpdate.find('[name="csltRqstTpCd"]').val()) {
			nurseJS.setFormState($btn, false, '신청 사유를 선택해주세요.');
			return;
		}		
		
		$.ajax({
			type: "POST",
			data: $frmUpdate.serialize(),
			url : '/api/nurse/rsvt/updateEduSchd.do',
			dataType : "json",
			success: function(res){
				if (res.resultCode==='success') {
					console.log('상담가능일정관리 일정 등록,수정 >> success ', res);
					const cntComplete = res.data.completeDts;
					const cntFail = res.data.failDts;
					// nurseJS.setFormState($btn, false, '저장이 완료되었습니다. (성공 : ' + cntComplete + '건 /  실패 : ' + cntFail + '건)');
					if (cntFail > 0) {
						nurseJS.setFormState($btn, false, '처리가 불가능합니다.\n일정을 다시 확인해 주세요.');
					} else {
						nurseJS.setFormState($btn, false, '');
					}
					
					// page reset
					if (typeof fnCallback === 'function') {
						fnCallback();
					}
				} else {
					nurseJS.setFormState($btn, false, '처리중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.');
				};
			},
			error: function(xhr, option, error){
				console.log('상담가능일정관리 일정 등록,수정 >> error ', xhr, option, error);
				nurseJS.setFormState($btn, false, '저장에 실패했습니다.');
			}
		});		
	},
	deleteEduSchd : ($btn, $frmUpdate, fnCallback) => {
		if ($btn.attr('data-is-disabled') != 1) {
			nurseJS.setFormState($btn, true);
		} else {
			nurseJS.setFormState($btn, false, '처리중입니다.');
			return;
		}

		if (!confirm('상담신청을 삭제하시겠습니까?')){
			nurseJS.setFormState($btn, false, '');
			return;
		}
		
		$.ajax({
			type: "POST",
			data: $frmUpdate.serialize(),
			url : '/api/nurse/rsvt/deleteEduSchd.do',
			dataType : "json",
			success: function(res){
				if (res.resultCode==='success') {
					console.log('상담가능일정관리 일정 삭제 >> success ', res);
					const cntComplete = res.data.completeDts;
					const cntFail = res.data.failDts;
					//nurseJS.setFormState($btn, false, '삭제가 완료되었습니다. (성공 : ' + cntComplete + '건 /  실패 : ' + cntFail + '건)');
					if (cntFail > 0) {
						nurseJS.setFormState($btn, false, '처리가 불가능합니다.\n일정을 다시 확인해 주세요.');
					} else {
						nurseJS.setFormState($btn, false, '');
					}
					
					// page reset
					if (typeof fnCallback === 'function') {
						fnCallback();
					}
				} else {
					nurseJS.setFormState($btn, false, '처리중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.');
				};
			},
			error: function(xhr, option, error){
				console.log('상담가능일정관리 일정 삭제 >> error ', xhr, option, error);
				nurseJS.setFormState($btn, false, '저장에 실패했습니다.');
			}
		});		
	},
	updatePatCounsel : ($btn, $frmUpdate, fnCallback) => {
		if ($btn.attr('data-is-disabled') != 1) {
			nurseJS.setFormState($btn, true);
		} else {
			nurseJS.setFormState($btn, false, '처리중입니다.');
			return;
		}

		if (!$frmUpdate.find('[name="csltDt"]').val()) {
			nurseJS.setFormState($btn, false, '상담일자를 선택해주세요.');
			return;
		}
		
		$.ajax({
			type: "POST",
			data: $frmUpdate.serialize(),
			url : '/api/nurse/rsvt/updatePatCounsel.do',
			dataType : "json",
			success: function(res){
				if (res.resultCode==='success') {
					console.log('상담일정관리 상담이력 등록,수정 >> success ', res);
					const cntComplete = res.data.completeDts;
					const cntFail = res.data.failDts;
					// nurseJS.setFormState($btn, false, '저장이 완료되었습니다. (성공 : ' + cntComplete + '건 /  실패 : ' + cntFail + '건)');
					if (cntFail > 0) {
						nurseJS.setFormState($btn, false, '처리가 불가능합니다.\n일정을 다시 확인해 주세요.');
					} else {
						nurseJS.setFormState($btn, false, '');
					}
					
					// page reset
					if (typeof fnCallback === 'function') {
						fnCallback();
					}
				} else {
					nurseJS.setFormState($btn, false, '처리중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.');
				};
			},
			error: function(xhr, option, error){
				console.log('상담일정관리 상담이력 등록,수정 >> error ', xhr, option, error);
				nurseJS.setFormState($btn, false, '저장에 실패했습니다.');
			}
		});		
	},
	deletePatCounsel : ($btn, $frmUpdate, fnCallback) => {
		if ($btn.attr('data-is-disabled') != 1) {
			nurseJS.setFormState($btn, true);
		} else {
			nurseJS.setFormState($btn, false, '처리중입니다.');
			return;
		}

		if (!confirm('상담이력을 삭제하시겠습니까?')){
			nurseJS.setFormState($btn, false, '');
			return;
		}
		
		$.ajax({
			type: "POST",
			data: $frmUpdate.serialize(),
			url : '/api/nurse/rsvt/deletePatCounsel.do',
			dataType : "json",
			success: function(res){
				if (res.resultCode==='success') {
					console.log('상담일정관리 상담내역 삭제 >> success ', res);
					const cntComplete = res.data.completeDts;
					const cntFail = res.data.failDts;
					// nurseJS.setFormState($btn, false, '삭제가 완료되었습니다. (성공 : ' + cntComplete + '건 /  실패 : ' + cntFail + '건)');
					if (cntFail > 0) {
						nurseJS.setFormState($btn, false, '처리가 불가능합니다.\n일정을 다시 확인해 주세요.');
					} else {
						nurseJS.setFormState($btn, false, '');
					}
					
					// page reset
					if (typeof fnCallback === 'function') {
						fnCallback();
					}
				} else {
					nurseJS.setFormState($btn, false, '처리중 오류가 발생했습니다. 잠시후 다시 시도해 주세요.');
				};
			},
			error: function(xhr, option, error){
				console.log('상담일정관리 상담내역 삭제 >> error ', xhr, option, error);
				nurseJS.setFormState($btn, false, '저장에 실패했습니다.');
			}
		});		
	},
	setMonthlyEditBtns: () => {
		const $btn = $('#btnEditContinue');
		if ($('.calendar .dates .day:not(.disable) button.on').length===0) {
			$btn.attr('disabled', true);
		} else {
			$btn.attr('disabled', false);
		}
	},
	setWeeklyEditBtns: () => {
		// 가능, 불가버튼
		const btnFirst = $('.sec_cal > .btn_box02 button:first'),
				btnLast = $('.sec_cal > .btn_box02 button:last');
			
			let btnImpossible = $('button[data-type="2"].on'), // 불가
					btnPossible = $('button[data-type="0"].on'); // 가능
					
			// btn reset
			btnFirst.attr('disabled',true);
			btnLast.attr('disabled',true);
			
			// 불가 선택 시
			if (btnImpossible.length > 0) {
				btnFirst.attr('disabled',false);
				if (btnPossible.length == 0) {
					// 불가만 선택 시
					btnLast.parent().addClass('btn_green').removeClass('btn_red');
					btnLast.text('불가 수정').attr('disabled',false);
				} else {
					// 불가 + 가능 선택 시
					btnLast.parent().addClass('btn_red').removeClass('btn_green');
					btnLast.text('불가').attr('disabled',false);
				}
			// 가능만 선택 시
			} else if (btnPossible.length > 0 && btnImpossible.length == 0) {
				btnFirst.attr('disabled',true);
				btnLast.parent().addClass('btn_red').removeClass('btn_green');
				btnLast.text('불가').attr('disabled',false);
			// 모두 선택 취소 시
			} else {
				// 변동사항 없음
			}	
	},
	calInit: (initDate) => {
		/*
		참고: https://codepen.io/ylem76/pen/xxrMOEJ
		달력 렌더링 할 때 필요한 정보 목록 

		현재 월(초기값 : 현재 시간)
		금월 마지막일 날짜와 요일
		전월 마지막일 날짜와 요일
		*/

		// 날짜 정보 가져오기
		const date = (initDate)? new Date(initDate.substring(0,4), initDate.substring(4,6) - 1, initDate.substring(6,8)) : new Date(), // 현재 날짜(로컬 기준) 가져오기
				utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000), // uct 표준시 도출
				kstGap = 9 * 60 * 60 * 1000, // 한국 kst 기준시간 더하기
				today = new Date(utc + kstGap); // 한국 시간으로 date 객체 만들기(오늘)
	
		var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());
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
			const nextDayMax = (6 - nextDay == 7) ? 0 : 6 - nextDay;


			// 현재 월 표기
			$('.year-month').html('<span>' + currentYear + '</span>년 <span>' + (currentMonth + 1) + '</span>월');

			// 렌더링 html 요소 생성
			var calendar = document.querySelector('.dates');
			calendar.innerHTML = '';
			calendar.dataset.cal = currentYear + '년 ' + (currentMonth + 1) + '월';
			
			const setCalDateAttr = (dt, day) => {
				return ' title="dates" data-cal-dt="'	+ nurseJS.dateToStr8(dt.getFullYear(), dt.getMonth(), day) + '" ';
			}
				
			// 지난달
			for (var i = prevDayMin; i <= (prevDay == 6 ? 0 : prevDate); i++) {
				calendar.innerHTML = calendar.innerHTML + '<div class="day prev disable"><button type="button" ' + setCalDateAttr(preMonth, i) + '>' + i + '</button></div>';		 
			}
			// 이번달
			for (var i = 1; i <= nextDate; i++) {
				calendar.innerHTML = calendar.innerHTML + '<div class="day current disable"><button type="button" ' + setCalDateAttr(curMonth, i) + '>' + i + '</button></div>'
			}
			// 다음달
			for (var i = 1; i <= nextDayMax; i++) {
				calendar.innerHTML = calendar.innerHTML + '<div class="day next disable"><button type="button" ' + setCalDateAttr(nextMonth, i) + '>' + i + '</button></div>'
			}

			// 오늘 날짜 표기
			if (today.getMonth() == currentMonth) {
				var todayDate = today.getDate(),
						currentMonthDate = document.querySelectorAll('.dates .current');

				currentMonthDate[todayDate - 1].classList.add('today');
			}
			
			if(!$('.calendar .cal_wrap').hasClass('register')){	//상담일정관리 캘린더
				// 캘린더 > 일정 클릭 이벤트 핸들러
				nurseJS.setUserReservationMonthlyHandler();

				// 간호사 일정 조회
				nurseJS.getNurseScheduleApi({
						/* 이전달 다음달 포함 검색 (퍼블 추가 작업 필요)
						startDt: nurseJS.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth(), prevDayMin),
						endDt: nurseJS.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth() + 2, nextDayMax)
						*/
						// 이번달 내 검색
						startDt: nurseJS.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 1),
						endDt: nurseJS.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth() + 1, nextDate),
						hcSchdYn : 'Y'
					}, (res) => {
						if (res && res.resultCode==='success'){
							const strNowDt = nurseJS.dateToStr8(today.getFullYear(), today.getMonth() + 1, today.getDate());
							
							// 간호사가능일정 조회
							res.data.nrsSchdList.forEach(function(row){
								const $link = $('.dates .day button[data-cal-dt="' + row.schdDt + '"]');
								// 편집 활성화
								if (row.schdDt >= strNowDt) {
									$link.parent('div.current').removeClass('disable');
								}
							});
							
							// 상담(예약)일정 - 날짜별 시간합산
							let eduTime = {};
							let csTime = {};
							res.data.eduSchdList.forEach((row) => {
								/* ***** 30분 1타임으로 계산 ***** */
								/*
								const startTime = ~~row.schdStHh * 60 + ~~row.schdStMi;
								const endTime = ~~row.schdEndHh * 60 + ~~row.schdEndMi;
								const diffTime = ((endTime - startTime) / 30); // 30분을 1타임으로 계산
								switch (row.schdTpCd) {
									case '01' : // 교육
										eduTime[row.schdDt] = ~~eduTime[row.schdDt] + diffTime;
										break;
									case '02' : // 상담
										csTime[row.schdDt] = ~~csTime[row.schdDt] + diffTime;
										break;
								}
								*/
								
								/* ***** 건수로 계산 ***** */
								switch (row.schdTpCd) {
									case '01' : // 교육
										eduTime[row.schdDt] = ~~eduTime[row.schdDt] + 1;
										break;
									case '02' : // 상담
										csTime[row.schdDt] = ~~csTime[row.schdDt] + 1;
										break;
								}
							});
							// 해피콜일정 - 날짜별 시간합산
							let hcTime = {};
							res.data.nrsSchdHcList.forEach((row) => {
								hcTime[row.csltExpcDt] = ~~hcTime[row.csltExpcDt] + 1;
							});
							// 교육 - 출력
							for(const key in eduTime) {
								$('.dates .day button[data-cal-dt="' + key + '"]').addClass('edu').append('<span class="schedule edu_block">교육<b>' + eduTime[key] + '</b></span>');
							}
							// 상담 - 출력
							for(const key in csTime) {
								$('.dates .day button[data-cal-dt="' + key + '"]').addClass('cs').append('<span class="schedule cs_block">상담<b>' + csTime[key] + '</b></span>');
							}
							// 해피콜 예정일정 - 출력
							for(const key in hcTime) {
								$('.dates .day button[data-cal-dt="' + key + '"]').addClass('hpc').append('<span class="hpc_block">' + hcTime[key] + '</span>');
							}
						}
				});
			} else {	//상담가능일정관리 캘린더
				// 캘린더 > 일정 클릭 이벤트 핸들러
				nurseJS.setNurseSchduleMonthlyHandler();

				// 편집버튼 리셋
				nurseJS.setMonthlyEditBtns();
		
				// 간호사 일정 조회
				nurseJS.getNurseScheduleApi({
						/* 이전달 다음달 포함 검색 (퍼블 추가 작업 필요)
						startDt: nurseJS.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth(), prevDayMin),
						endDt: nurseJS.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth() + 2, nextDayMax)
						*/
						// 이번달 내 검색
						startDt: nurseJS.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 1),
						endDt: nurseJS.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth() + 1, nextDate)
					}, (res) => {
						if (res && res.resultCode==='success'){
							const strNowDt = nurseJS.dateToStr8(today.getFullYear(), today.getMonth() + 1, today.getDate());
							
							// 간호사가능일정 출력
							res.data.nrsSchdList.forEach(function(row){
								const psblY = row.mergePsblYn.match(/Y/g);
								const psblYCnt = psblY ? psblY.length : 0;
								const psblN = row.mergePsblYn.match(/N/g);
								const psblNCnt = psblN ? psblN.length : 0;
								const $link = $('.dates .day button[data-cal-dt="' + row.schdDt + '"]');
								
								// 가능
								if (psblYCnt > 0){
									$link.addClass('pos').append('<span class="schedule pos_block">가능<b>' + psblYCnt + '</b></span>');
								}
								// 불가능
								if (psblNCnt > 0){
									$link.addClass('impos').append('<span class="schedule impos_block">불가<b>' + psblNCnt + '</b></span>');
								}
								// 편집 활성화
								if (row.schdDt >= strNowDt) {
									$link.parent('div.current').removeClass('disable');
								}
								$link.attr('data-schedule-cnt',row.mergePsblYn.length);
							});
							// 상담(예약)일정 - 날짜별 시간합산
							let eduTime = {};
							res.data.eduSchdList.forEach((row) => {
								const startTime = ~~row.schdStHh * 60 + ~~row.schdStMi;
								const endTime = ~~row.schdEndHh * 60 + ~~row.schdEndMi;
								const diffTime = ((endTime - startTime) / 30); // 30분을 1타임으로 계산
								eduTime[row.schdDt] = ~~eduTime[row.schdDt] + diffTime;
							});
							// 상담(예약)일정 - 출력
							for(const key in eduTime) {
								// 사용자 신청건
								if (~~eduTime[key] > 0) {
									$('.dates .day button[data-cal-dt="' + key + '"]').attr('data-reserve-cnt',eduTime[key]).addClass('hpc02').append('<span class="hpc_block">' + eduTime[key] + '</span>');
								}
							}
						}
				});
			}
		}

		// ------------------------------------------------------------+| 상세일정 렌더링 |+------------------------------------------------------------ //

		function renderSchedule(thisMonth) {
			/* jsp 에서 랜더링 */			
			/*
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
			*/
		}
		
		// ------------------------------------------------------------+| 타임테이블 렌더링 |+------------------------------------------------------------ //

		function renderTimeTable(thisMonth) {
			const now = new Date();
			const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
			const strNowDt = nurseJS.dateToStr8(today.getFullYear(), today.getMonth() + 1, today.getDate());
			const strNowTm = nurseJS.timeToStr4(now.getHours(), now.getMinutes());

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
			dayCell.children('th:not(:first-child)').remove();

			for (var i=0; i < nextDate; i++) {
				const strCurDate = nurseJS.dateToStr8(currentYear, currentMonth + 1, i + 1);
				const weekday = ['일', '월', '화', '수', '목', '금', '토'];
				day = new Date(currentYear, currentMonth, i + 1);
				week = weekday[day.getDay()];

				dayCell.append('<th ' + (strCurDate <  strNowDt? ' class="past_date"':'') + ' data-head-dt="' + strCurDate + '">' + (i + 1) + '<span>(' + week + ')</span></th>');
				dateCell.append('<td data-schd-dt="' + strCurDate + '"' + (strCurDate <  strNowDt? ' data-is-disabled="1"':'')+ '></td>');
				// 오늘 날짜 이전 시간 disabled 처리
				if (strCurDate == strNowDt) {
					dateCell.find('td[data-schd-dt="' + strCurDate + '"]').each(function(){
						if ($(this).parents('tr').attr('data-schd-tmlv') < strNowTm) {
							$(this).attr('data-is-disabled','1');
						}
					});
				}
				if (week === '토') {
					dayCell.children('th').eq(i + 1).css('color', '#3263e0');
				} else if (week === '일') {
					dayCell.children('th').eq(i + 1).css('color', '#e32828');
				}
			}

			nurseJS.getNurseScheduleApi({
					startDt: nurseJS.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth() + 1, 1),
					endDt: nurseJS.dateToStr8(thisMonth.getFullYear(), thisMonth.getMonth() + 1, nextDate),
					ipsbRsnYn : 'Y'
				}, function(res){
					if (res && res.resultCode==='success'){
						const eduSchdList = res.data.eduSchdList;
						const nrsSchdIpsbRsnList = res.data.nrsSchdIpsbRsnList;
						res.data.nrsSchdList.forEach(function(schdRow){
							dateCell.each(function(){
								const tm = $(this).data('schd-tmlv') + '';
								const hour = tm.substring(0,2);
								const min = tm.substring(2,4);
								const key = 'h' + hour + (min=='00' ? '' : 'M' + min) + 'PsblYn';
								const psblYn = schdRow[key];
								
								// 퍼블 타입 참고용 (0~2 까지만 개발 적용)
								//let btnFuncName = ['가능', '예약', '불가(교육)', '불가(이동)', '불가(휴가)', '불가(회의)', '불가(기타)', '불가(공휴일)'];
								let btnTxt = '불가';
								let btnType = 2; // default : 불가
								// 예약여부 확인
								const eduSchd = (eduSchdList==null) ? [] : eduSchdList.filter((eduRow) => {
									if (eduRow.schdDt==schdRow.schdDt 
										&& tm >= (eduRow.schdStHh + '' + eduRow.schdStMi) 
										&& tm < (eduRow.schdEndHh + '' + eduRow.schdEndMi)) return true;
									return false;
								});
								if (eduSchd.length > 0 ) {
									btnTxt = '예약';
									btnType = 1;
								} else {
									if (psblYn=='Y') {
										btnTxt = '가능';
										btnType = 0;
									} else {
										// 불가사유 조회
										const nrsSchdIpsbRsn = (nrsSchdIpsbRsnList==null) ? [] : nrsSchdIpsbRsnList.filter((rsnRow) => {
											if (rsnRow.schdDt==schdRow.schdDt && tm == rsnRow.schdHm) return true;
											return false;
										});
										btnTxt = '불가' + (nrsSchdIpsbRsn.length > 0 && nrsSchdIpsbRsn[0].schdIpsbRsnNm ? '<em>(' + nrsSchdIpsbRsn[0].schdIpsbRsnNm + ')</em>' : '');
										btnType = 2;
									}
								}
								$(this).find('[data-schd-dt="' + schdRow.schdDt + '"]').append('<button type="button" data-type="' + btnType + '">' + btnTxt + '</button>')
							});
						});
						// 과거 날찌/시간 disabled 처리
						dateCell.find('[data-is-disabled="1"]').addClass('past_time');
						dateCell.find('[data-is-disabled="1"] button').attr('disabled',true);
						
						// 타임테이블 내부 버튼 클릭 시
						$('.time_wrap button').on('click', function() {
							$(this).toggleClass('on');
							nurseJS.setWeeklyEditBtns();
						});
					}
			});

			// 렌더링시 현재 날짜로 타임테이블 스크롤 포커싱 맞추기
			if (nurseJS.isTimeTableScroll === false) {
				nurseJS.isTimeTableScroll = true;
			} else {
				const posTarget = nurseJS.dateToStr8(date.getFullYear(), date.getMonth() + 1, date.getDate());
				const pos = $('table thead tr th[data-head-dt="' + posTarget + '"]').offset();
				const titWith = ~~$('table thead tr th:eq(0)').width() + 17; // 타이틀영역 size
				$('.time_wrap').animate({
					scrollLeft: (pos ? pos.left : 0) - titWith
				}, 200);
			}
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
		nurseJS.setCalCurrentDate(thisMonth);

		// 이전달로 이동
		$('.go-prev').off('click');
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
			nurseJS.setCalCurrentDate(thisMonth);
		});

		// 다음달로 이동
		$('.go-next').off('click');
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
			nurseJS.setCalCurrentDate(thisMonth);
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
				nurseJS.setCalCurrentDate(thisMonth);
			});
		}
	},

	counselRegis: () => {
		//상담이력등록 상담분류 "신환교육"일 경우 해피콜 예정일 노출
		var selectType = $(".consultSort_form .select_row>select");
		selectChange(selectType);
		function selectChange(type) {
			type.change(function () {
				var select_name = $(this).children("option:selected").text();
				$(this).siblings("label").text(select_name);
			});
		}
	},

	//상담일정관리 > 일정 클릭 이벤트 핸들러
	setUserReservationMonthlyHandler: () => {
		$(document).off('click', '.calendar .dates .day button');
		// 일반모드 : 상세 페이지 이동
		$(document).on('click', '.calendar .dates .day button', function(){
			const dt = $(this).data('cal-dt');
			if (dt) {
				// 상담일정관리 상세
				window.location.href = '/nurse/rsvt/usr_rsvt_daily.do?dt=' + dt;
			}
		});
	},


	//상담가능일정괸리 > 일정 클릭 이벤트 핸들러
	setNurseSchduleMonthlyHandler: () => {
		// css reset
		$('.calendar .dates .day:not(.disable) button').removeClass('on');
		
		// event unbound 
		$(document).off('click', '.calendar .dates .day button');
		$(document).off('click', '.calendar .dates .day:not(.disable) button');

		// event bound
		if (nurseJS.nurseSchduleMode==='edit') {
			// 편집모드 : 달력 날짜 선택
			$(document).on('click', '.calendar .dates .day:not(.disable) button', function(){
				if (~~$(this).attr('data-reserve-cnt') > 0) {
					openPopup('EditImp_pop');
				} else {
					$(this).toggleClass('on');
				}
				// 편집모드 변경 버튼 활성화
				nurseJS.setMonthlyEditBtns();
			});
		} else {
			// 일반모드 : 상세 페이지 이동
			$(document).on('click', '.calendar .dates .day button', function(){
				const dt = $(this).data('cal-dt');
				if (dt) {
					// 상담가능일정관리 상세
					window.location.href = '/nurse/rsvt/nrs_schd_timetable.do?dt=' + dt;
				}
			});
		}
	},

	tabEvent: () => {
		//tab 메뉴 3개 이상일 경우 스크롤
		const tabContainer = $(".tab_slide > .inner"),
			tabBox = tabContainer.find("> ul"),
			tabButton = tabBox.find("> li");

		let size = tabButton.length

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
///////////																													 **팝업**																																 ///////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	btnEvent: () => {
		const getNursSchdTimeTableDates = ()=>{
			let arrDates = [];
			$('[data-schd-dt] button[data-type!="1"].on').each(function(){
				const dateTxt = $(this).parent().attr('data-schd-dt') + '';
				const timeTxt = $(this).parents('tr').attr('data-schd-tmlv');
				arrDates.push(dateTxt + '' + timeTxt);
			});
			arrDates.sort();
			
			return arrDates;
		};
		// 가능 처리
		$('[name="btnNurSchdPsbl"]').on('click', function(){
			let frm = document.createElement("form");
			let $frm = $(frm);
			
			$frm.append('<input type="hidden" name="reqType" value="TM">');
			$frm.append('<input type="hidden" name="schdDts" value="' + getNursSchdTimeTableDates().join(',') + '">');
			$frm.append('<input type="hidden" name="psblYn" value="Y">');
			nurseJS.updateNrsSchd($(this), $frm, function(isSuccess){
				nurseJS.calInit(nurseJS.calCurrentDate);
				if (isSuccess==true) {
					openPopup('possible_pop');
				}
				nurseJS.setWeeklyEditBtns();
			});
		});
		// 불가관리 팝업
		$('[name="btnNurSchdImPsbl"]').on('click', function(){
			const dt = $(this).attr('data-schd-dt');
			const params = {
				schdDts: dt ? dt : getNursSchdTimeTableDates().join(',')
			};
			$.ajax({
				type: "POST",
				data: params,
				url : '/nurse/rsvt/ajax_nrs_schd_impsbl_rsn_popup.do',
				dataType : "html",
				success: function(res){
					$('#divNrsSchdImpsblWrap').html(res);
					openPopup('impossible_pop');
				},
				error: function(xhr, option, error){
					console.log('상담불가사유 팝업 >> error ', xhr, option, error);
				}
			});
		});
	},
}

function openPopup(popConts) {	//onclick="openPopup('popConts');"
	//팝업 열기
	var popthis = $(".popup ." + popConts); //popConts : .pop_content 
	$(".pop_content").hide();
	$(".popup").addClass("on");
	popthis.css('display', 'flex');

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

	//팝업 닫기
	$(document).on('click','.popup .close_pop',function(){
		closePopup();
	});
	
	const closePopup = function(){
		$(".popup").removeClass("on");
		$('.info, .delete').remove(); //팝업 내 동적내용 삭제
		popthis.hide();
	};
}

