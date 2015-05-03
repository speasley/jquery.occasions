/*
 * Copyright (c) 2014–2015 Stephen Peasley (http://www.speasley.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 1.0.0
 * Made in Canada
 */
;(function ( $ ) {
	'use strict';
	$.fn.occasions = function() {
		var settings = $.extend({
			country: 'none',
			sect: 'none',
			onSuccess: function() {}
		}, arguments[0] || {});

		// get date
		var today = new Date();
		var now_month = today.getMonth()+1;
		var now_day = today.getDate();
		var now_date = (now_month<10 ? '0' : '') + now_month + '/' + (now_day<10 ? '0' : '') + now_day;
		if (settings.date) {
			now_date = settings.date;
		}
		// date helpers
		function _nthDay(nth,weekday,month) {
			var nth = nth-1;
			var weekday = weekday-1;
			var month = month-1;
		  var d = new Date(today.getFullYear(), month, 1, 0, 0, 0, 0);
		  var day = 1;
		  if(d.getDay() != weekday) {
		    var weekday_index = d.getDay(); // this is the weekday of the first of the month
				var count = 0;
				while(weekday_index != weekday){
					weekday_index++; count++;
					if(weekday_index==7) {
						weekday_index=0;
					}
				}
				day += count; // this is the first occurence of the weekday in the month
		  }
			day = day + (7*nth);
			d = d.setDate(day);
	    d = new Date(d);
			month = d.getMonth()+1;
			var date = (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;
			return date;
		}
		
		function _weekdayBefore(weekday,month,date) {
			var weekday = weekday-1;
			var month = month-1;
			var d = new Date(today.getFullYear(), month, date, 0, 0, 0, 0);
			var day = date;
			if(d.getDay() == weekday) {
				day -= 7;
			}else{
		    var weekday_index = d.getDay(); // this is the weekday of the first of the month
				var count = 0;
				while(weekday_index != weekday){
					weekday_index--; count++;
					if(weekday_index==-1) {
						weekday_index=6;
					}
				}
				day -= count; // this is the first occurence of the weekday in the month
		  }
			d = d.setDate(day);
	    d = new Date(d);
			month = d.getMonth()+1;
			var date = (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;
			return date;
		}
		
		// compare date to occasion
		var occasions = {
			'01/01':'new-years',
			'01/21':'hug',
			'02/14':'valentines',
			'03/14':'pi',
			'04/01':'april-fools',
			'04/05':'first-contact',
			'04/20':'four-twenty',
			'05/04':'star-wars',
			'05/25':'towel',
			'08/08':'cat',
			'08/13':'lefties',
			'09/19':'pirate',
			'10/31':'halloween',
			'12/05':'ninja',
			'12/23':'festivus',
			'12/26':'boxing',
			'12/31':'new-years-eve'
		};
		
		// add and override occasions by country
		switch(settings.country.toLowerCase()) {
			case 'canada':
				occasions[_nthDay(2,1,3)] = 'dst-begins'; // Second Sunday of March
				occasions[_nthDay(2,1,5)] = 'mothers'; // Second Sunday of May
				occasions[_weekdayBefore(2,5,25)] = 'victoria'; // Monday before May 25
				occasions[_nthDay(3,1,6)] = 'fathers'; // Third Sunday of June
				occasions['06/21'] = 'aboriginal';
				occasions[_nthDay(1,2,9)] = 'labour'; // First Monday of September
				occasions[_nthDay(2,2,10)] = 'thanksgiving'; // Second Monday of October
				occasions['11/01'] = 'all-saints';
				occasions[_nthDay(1,1,11)] = 'dst-ends'; // First Sunday of November
				occasions['12/11'] = 'statute';
			break;
			default:
			break;
		}
		
		// add and override occasions by sect
		switch(settings.sect.toLowerCase()) {
			case 'christian':
				occasions['08/15'] = 'assumption';
				occasions['10/04'] = 'st-francis';
				occasions['11/02'] = 'all-souls';
				occasions['12/08'] = 'immaculate';
				occasions['12/24'] = 'christmas-eve';
				occasions['12/25'] = 'christmas';
			break;
			default:
			break;
		}

		if(occasions[now_date]!=null) {
			this.addClass(occasions[now_date]);
			this.occasion = occasions[now_date];
			settings.onSuccess.call(this);
		}

		return this;
		
	};
}( jQuery ));