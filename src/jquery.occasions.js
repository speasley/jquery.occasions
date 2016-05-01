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

  // internal functions
	var internals = {}

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

  // main
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

    var occasions = {};
    var el = this;

    return this.each(function() {
      $.ajax({
        url: settings.path+'occasions.json',
        type:'get',
        dataType:'json',
        success: function(data) {    
          occasions = data;
          // main
          var today_date = todaysDate(settings.date);
          if(occasions[today_date]!=null) {
            console.log(el);
            console.log(occasions[today_date]);
            el.addClass(occasions[today_date]);
            el.occasion = occasions[today_date];
            settings.onSuccess.call(el);
          }
        }
      });
    });
  };
})(jQuery);
