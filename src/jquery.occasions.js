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
    var today = new Date();
    var ts = new Date(today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()).getTime() / 1000;
    return ts;
  };
	
  var todaysDate = internals.todaysDate = function(override) {
    var today = new Date();
    var now_month = today.getMonth()+1;
    var now_day = today.getDate();
    var now_date = (now_month<10 ? '0' : '') + now_month + '/' + (now_day<10 ? '0' : '') + now_day;
    if (override) { now_date = override; }
    return now_date;
  }

  var todaysFullDate = internals.todaysFullDate = function(override) {
    var today = new Date();
    var now_month = today.getMonth()+1;
    var now_day = today.getDate();
    var now_year = today.getFullYear();
    var now_full_date = (now_month<10 ? '0' : '') + now_month + '/' + (now_day<10 ? '0' : '') + now_day + '/' + now_year;
    if (override) { now_full_date = override; }
    return now_full_date;
  }

  var nthDay = internals.nthDay = function(params) {
    var params = params.split(','); //nth,weekday,month
    var nth = params[0]-1;
    var weekday = params[1]-1;
    var month = params[2]-1;
    var today = new Date();
    var d = new Date(today.getFullYear(), month, 1); //1st of the target month
    var day = 0;
    if (d.getDay() != weekday) {
      //first of the month is not target weekday
      var weekday_index = d.getDay(); //weekday of the 1st of target month
      var count = 0;
      while (weekday_index != weekday) {
        weekday_index++; count++;
        if (weekday_index == 7) {
          weekday_index = 0;
        }
      }
      day += count; //first occurence of the weekday in the month
    }
    day += (7 * nth);
    d = d.setDate(day); //set occasion date
    d = new Date(d);
    month = d.getMonth() + 1;
    var date = (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;
    console.log(date);
    return date;
  }

  var weekdayBefore = internals.weekdayBefore = function(params) {
    console.log('weekdayBefore');
    var params = params.split(','); //weekday,month,date
    var weekday = params[0]-1;
    var month = params[1]-1;
    var date = params[2]-1;
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
    if(settings.custom) { mergeHashes(occasions,settings.custom); }

    Object.keys(occasions).forEach(function (key) { 
      var value = occasions[key]
      if(key.slice(0,1) == '_'){
        specialDate(key);
      }
    });
		
    var todays_date = todaysDate(settings.date_override);
    if(occasions[todays_date]!=null) {
      this.addClass(occasions[todays_date]);
      this.occasion = occasions[todays_date];
      settings.onSuccess.call(this);
    }
		
		return this;
		
	};
}( jQuery ));
