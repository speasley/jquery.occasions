/*
 * Copyright (c) 2014 Stephen Peasley (http://www.speasley.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 2.0.0
 * Made in Canada
 */
;(function($) {

	'use strict';

  var el = this;
  var occasions = null;
  
  // internal functions
	var internals = {}

  var loadFiles = internals.loadFiles = function(settings) {
    var files = ['occasions.json'];
    if(settings.country != 'none') { files.push(settings.country.toLowerCase()+'.json'); }
    if(settings.sect != 'none') { files.push(settings.sect.toLowerCase()+'.json'); }
    var loaded = 0;
    for (var i=0; i < files.length; i++) {
      $.ajax({
        async: true,
        url: settings.path+files[i],
        type:'get',
        dataType:'json',
        success: function(data) {    
          if(occasions == null) {
            occasions = data;
          }else{
            mergeHashes(occasions,data);
          }
          loaded++;
          if(loaded===files.length) {
            main(settings.date);
          }
        }
      });
    }
  }

  var mergeHashes = internals.mergeHashes = function(obj, src) {
    Object.keys(src).forEach(function(key) { obj[key] = src[key]; });
    return obj;
  }

  var todaysDate = internals.todaysDate = function(override) {
    var today = new Date();
    var now_month = today.getMonth()+1;
    var now_day = today.getDate();
    var now_date = (now_month<10 ? '0' : '') + now_month + '/' + (now_day<10 ? '0' : '') + now_day;
    if (override) {
      now_date = override;
    }
    return now_date;
  }

	var timestamp = internals.timestamp = function(month,day) {
    var today = new Date();
    var ts = new Date(today.getFullYear()+'-'+today.getMonth()+'-'+today.getDate()).getTime() / 1000;
    return ts;
  };

  var main = internals.main = function(date) {
    var todays_date = todaysDate(date);
    if(occasions[todays_date]!=null) {
      //el.addClass(occasions[todays_date]);
      //el.occasion = occasions[todays_date];
      //settings.onSuccess.call(el);
    }
  }

  $.fn.occasions = function() { 
 
    var settings = $.extend({
      country: 'none',
      internals: false,
      path: '',
      sect: 'none',
      onSuccess: function() {}
    }, arguments[0] || {});

    if (settings.internals) {
      return internals;
    }

    loadFiles(settings);

    return this.each(function() {
      //reserved
    });
  };
})(jQuery);
