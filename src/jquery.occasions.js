/*
 * Copyright (c) 2014 Stephen Peasley (http://www.speasley.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 2.0.0
 * Made in Canada
 */
;(function ( $ ) {
	
	'use strict';
	
  // internal functions
	var internals = {};
	
  var mergeHashes = internals.mergeHashes = function(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
  }
	
  var specialDate = internals.specialDate = function(date) {
    var params;
    if(date.slice(0,7) == '_nthDay'){
      params = date.substring(7);
      params = params.slice(1,-1)
      nthDay(params);
    }
    if(date.slice(0,7) == '_weekda'){
      params = date.substring(14);
      params = params.slice(1,-1)
      weekdayBefore(params);
    }
  }

	var timestamp = internals.timestamp = function(month,day) {
    var ts = new Date(globalYear(),month,day).getTime() / 1000;
    return ts;
  };
	
  var globalYear = internals.globalYear = function(override) {
    var year = new Date().getFullYear();
    var override_year = null;
    if (override > 6) {
      override_year = override.slice(-4);
      year = override;
    }
    return year;
  }

  var monthIndex = internals.monthIndex = function(m) {
    var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"
    ];
    return monthNames.indexOf(m);
  }

  var monthName = internals.monthName = function(m) {
    var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"
    ];
    return monthNames[m];
  }

  var weekdayIndex = internals.weekdayIndex = function(d) {
    var weekdayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return weekdayNames.indexOf(d);
  }

  var weekdayName = internals.weekdayName = function(d) {
    var weekdayNames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    return weekdayNames[d];
  }

  var todaysDate = internals.todaysDate = function(override) {
    var today = new Date();
    if (override && override.length > 5) { today.setFullYear(globalYear(override.slice(-4))); }
    var now_month = today.getMonth();
    var now_day = today.getDate();
    var now_date = monthName(now_month) + ' ' + (now_day<10 ? '0' : '') + now_day;
    if (override) { now_date = override; }
    return now_date;
  }

  var nthDay = internals.nthDay = function(params) {
    var params = params.split(','); //nth,weekday,month
    var nth = Number(params[0]);
    var weekday = weekdayIndex(params[1]);
    var month = monthIndex(params[2]);
    var today = new Date();
    var day = 1; //start on the 1st of the month
    var d = new Date(globalYear(), month, day); //1st of the target month
    //set weekday of 1st of the month
    if (weekday != d.getDay()) {
      //weekday is not on the 1st of the month
      var weekday_index = d.getDay(); //weekday of 1st of the month
      var offset = 0;
      while (weekday_index != weekday) {
        weekday_index++; offset++;
        if (weekday_index == 7) { weekday_index = 0; }
      }
    }
    day = day + offset + (7 * (nth-1));
    d = d.setDate(day); //set occasion date
    d = new Date(d); //new date object with occasion date
    month = d.getMonth();
    var date = monthName(month) + ' ' + (day<10 ? '0' : '') + day;
    return date;
  }

  var weekdayBefore = internals.weekdayBefore = function(params) {
    var params = params.split(','); //weekday,month,date
    var weekday = weekdayIndex(params[0]);
    var month = monthIndex(params[1]);
    var day = Number(params[2]);
    var today = new Date();
    var d = new Date(globalYear(),month,day);
    var date;
    if (d.getDay() == weekday) {
      date = timestamp(month,day) - 604800; //minus seven days
    }else{
      var offset = 0;
      var weekday_index = d.getDay(); //weekday of the reference date
      while (weekday_index != weekday) {
        weekday_index--; offset++;
        if (weekday_index == -1) { weekday_index = 6; }
      }
      date = timestamp(month,day) - (86400 * offset);
      date = new Date(date*1000);
      month = monthName(date.getMonth());
      day = (date.getDate() < 10) ? '0'+date.getDate() : date.getDate();
      var new_date = month+' '+day;
    }
    return new_date;
  }

  var sanitizePath = internals.sanitizePath = function(path) {
    if(path.slice(-1) != '/') { path = path+'/'; }
    return path;
  }
	
	// main
	$.fn.occasions = function() {
		
		var files = ['occasions.json'];
		var occasions = null;
	  var settings = $.extend({
	    internals: false,
	    path: '',
	    onSuccess: function() {}
	  }, arguments[0] || {});
		
    if (settings.internals) {
      return internals;
    }

    if(settings.country) { files.push(settings.country.toLowerCase()+'.json'); }
    if(settings.sect) { files.push(settings.sect.toLowerCase()+'.json'); }
    if(settings.path != '') { settings.path = sanitizePath(settings.path); }
    for (var i=0; i < files.length; i++) {
      $.ajax({
        async: false,
        url: settings.path+files[i],
        type:'get',
        dataType:'json',
        success: function(data) {    
          if(occasions == null) {
            occasions = data;
          }else{
            mergeHashes(occasions,data);
          }
        }
      });
    }

    Object.keys(occasions).forEach(function (key) { 
      var value = occasions[key]
      if(key.slice(0,1) == '_'){
        specialDate(key);
      }
    });
		
    var todays_date = todaysDate(settings.date_override);
    console.log(todaysDate(settings.date_override));
    if(occasions[todays_date]!=null) {
      this.addClass(occasions[todays_date]);
      this.occasion = occasions[todays_date];
      settings.onSuccess.call(this);
    }
		
		return this;
		
	};
}( jQuery ));
