/*
 * Copyright (c) 2014 Stephen Peasley (http://www.speasley.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 2.1.1
 * Made in Canada
 */
;(function ( $ ) {
  
  'use strict';
  
  // internal functions
  var internals = {};
  
  var renameKey = internals.renameKey = function(hash, oldName, newName) {
    if (oldName == newName) { return hash; }
    if (hash.hasOwnProperty(oldName)) {
      hash[newName] = hash[oldName];
      delete hash[oldName];
    }
    return hash;
  }
  
  var mergeHashes = internals.mergeHashes = function(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
  }
  
  var specialDate = internals.specialDate = function(date,override) {
    var params;
    var new_date;
    if(date.slice(0,7) == '_nthDay'){
      params = date.substring(7);
      params = params.slice(1,-1)
      new_date = nthDay(params,override);
    }
    if(date.slice(0,7) == '_weekda'){
      params = date.substring(14);
      params = params.slice(1,-1)
      new_date = weekdayBefore(params,override);
    }
    if(date.slice(0,7) == '_lastWe'){
      params = date.substring(12);
      params = params.slice(1,-1)
      new_date = lastWeekday(params,override);
    }
    return new_date;
  }

  var timestamp = internals.timestamp = function(month,day,year) {
    var ts = new Date(year,month,day).getTime() / 1000;
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
    var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    return monthNames.indexOf(m);
  }

  var monthName = internals.monthName = function(m) {
    var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
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

  var nthDay = internals.nthDay = function(params,override) {
    var params = params.split(','); //nth,weekday,month
    var nth = Number(params[0]);
    var weekday = weekdayIndex(params[1]);
    var month = monthIndex(params[2]);
    var today = new Date();
    var year = today.getFullYear();
    if(override && override.length > 6) { year = override.slice(-4); }
    var day = 1; //start on the 1st of the month
    var d = new Date(year, month, day); //1st of the target month
    //set weekday of 1st of the month
    var offset = 0;
    if (weekday != d.getDay()) {
      //weekday is not on the 1st of the month
      var weekday_index = d.getDay(); //weekday of 1st of the month
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

  var weekdayBefore = internals.weekdayBefore = function(params,override) {
    var params = params.split(','); //weekday,month,date
    var weekday = weekdayIndex(params[0]);
    var month = monthIndex(params[1]);
    var day = Number(params[2]);
    var today = new Date();
    var year = today.getFullYear();
    if(override && override.length > 6) { year = override.slice(-4); }
    var d = new Date(year,month,day);
    var date;
    if (d.getDay() == weekday) {
      date = timestamp(month,day,year) - 604800; //minus seven days
    }else{
      var offset = 0;
      var weekday_index = d.getDay(); //weekday of the reference date
      while (weekday_index != weekday) {
        weekday_index--; offset++;
        if (weekday_index == -1) { weekday_index = 6; }
      }
      date = timestamp(month,day,year) - (86400 * offset);
    }
    date = new Date(date*1000);
    month = monthName(date.getMonth());
    day = (date.getDate() < 10) ? '0'+date.getDate() : date.getDate();
    date = month+' '+day;
    return date;
  }

  var lastWeekday = internals.lastWeekday = function(params,override) {
    var params = params.split(','); //weekday,month
    var weekday = weekdayIndex(params[0]);
    var month = monthIndex(params[1]);
    var today = new Date();
    var year = today.getFullYear();
    if(override && override.length > 6) { year = override.slice(-4); }
    var d = new Date(year,month+1,0); //last day of the month
    var date;
    if (d.getDay() == weekday) {
      date = d;
    }else{
      var offset = 0;
      var weekday_index = d.getDay(); //weekday of the reference date
      while (weekday_index != weekday) {
        weekday_index--; offset++;
        if (weekday_index == -1) { weekday_index = 6; }
      }
      date = timestamp(month+1,0,year) - (86400 * offset);
      date = new Date(date*1000);
      var day = (date.getDate() < 10) ? '0'+date.getDate() : date.getDate();
      date = params[1]+' '+day;
    }
    return date;
  }

  var getPath = internals.getPath = function() {
    var filename = 'jquery.occasions'
    var scripts = document.getElementsByTagName('script');
    var filepath = '';
    if (scripts && scripts.length > 0) {
      for (var i in scripts) {
        // uncompressed
        if (scripts[i].src && scripts[i].src.match(new RegExp(filename+'\\.js$'))) {
          filepath = scripts[i].src.replace(new RegExp('(.*)'+filename+'\\.js$'), '$1');
          if (filepath.slice(0,4)=='file' && filepath.slice(-21)=='jquery.occasions/src/') {
            return './';
          }else{
            return filepath;
          }
        }
        // minified
        if (scripts[i].src && scripts[i].src.match(new RegExp(filename+'\\.min.js$'))) {
          filepath = scripts[i].src.replace(new RegExp('(.*)'+filename+'\\.min.js$'), '$1');
          return filepath;
        }
      }
    }
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
    if(settings.path) {
      settings.path = sanitizePath(settings.path);
    }else{
      settings.path = getPath();
    }
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
        //replace key with special date result
        occasions = renameKey(occasions,key,specialDate(key,settings.date_override));
      }
    });
    
    var todays_date = todaysDate(settings.date_override).slice(0,6);
    if(occasions[todays_date]!=null) {
      this.addClass(occasions[todays_date]);
      this.data('occasion',occasions[todays_date]);
      settings.onSuccess.call(this);
    }
    
    return this;
    
  };
}( jQuery ));