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
    if (override) {
      now_date = override;
    }
    return now_date;
  }

  var sanitizePath = internals.sanitizePath = function(path) {
    if(path.slice(-1) != '/') {
      return path+'/';
    }
  }
	
	// main
	$.fn.occasions = function() {
		
		var files = ['occasions.json'];
		var occasions = null;
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

    if(settings.country != 'none') { files.push(settings.country.toLowerCase()+'.json'); }
    if(settings.sect != 'none') { files.push(settings.sect.toLowerCase()+'.json'); }
    if(settings.path != '') { settings.path = sanitizePath(settings.path); }
    for (var i=0; i < files.length; i++) {
      $.ajax({
        async: false,
        url: settings.path+files[i],
        type:'get',
        dataType:'json',
        success: function(data) {    
          console.log(settings.path+files[i]);
          if(occasions == null) {
            occasions = data;
          }else{
            mergeHashes(occasions,data);
          }
        }
      });
    }
		
    var todays_date = todaysDate(settings.date_override);
    if(occasions[todays_date]!=null) {
      this.addClass(occasions[todays_date]);
      this.occasion = occasions[todays_date];
      settings.onSuccess.call(this);
      console.log('execute!');
      console.log(occasions);
    }
		
		return this;
		
	};
}( jQuery ));
