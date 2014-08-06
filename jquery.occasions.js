/*
 *
 * Copyright (c) 2014 Stephen Peasley (http://www.stephenpeasley.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * 
 * Version 0.0.1
 * Made in Canada
 *
 */
;(function ( $ ) {
	'use strict';
	$.fn.occasions = function(options) {
		var settings = $.extend({
			country: 'none',
			sect: 'none'
    }, options );
		// get date
		var d = new Date();
		var month = d.getMonth()+1;
		var day = d.getDate();
		var weekday = d.getDay();
		var year = d.getFullYear();
		var date = (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;
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
			'09/19':'pirate',
			'10/31':'halloween',
			'12/05':'ninja',
			'12/23':'festivus',
			'12/26':'boxing',
			'12/31':'new-years-eve'
		};
		// add and override occasions by country
		switch(settings.sect.toLowerCase()) {
			case 'canada':
				occasions['05/11'] = 'mothers';
				occasions['05/19'] = 'victoria';
				occasions['06/15'] = 'fathers';
				occasions['06/21'] = 'aboriginal';
				occasions['09/01'] = 'labour';
				occasions['10/13'] = 'thanksgiving';
				occasions['10/23'] = 'diwali';
				occasions['11/01'] = 'all-saints';
				occasions['11/02'] = 'dst-ends';
				occasions['12/11'] = 'statute';
				occasions['11/02'] = 'dst-ends';
			break;
			default:
			break;
		}
		// add and override occasions by sect
		switch(settings.sect.toLowerCase()) {
			case 'christian':
				occasions['04/13'] = 'palm';
				occasions['04/17'] = 'maundy';
				occasions['04/18'] = 'good';
				occasions['04/19'] = 'holy';
				occasions['04/20'] = 'eastern';
				occasions['04/21'] = 'easter';
				occasions['05/29'] = 'ascension';
				occasions['06/8'] = 'pentecost';
				occasions['06/9'] = 'whit';
				occasions['06/15'] = 'trinity';
				occasions['06/19'] = 'corpus-christi';
				occasions['08/15'] = 'assumption';
				occasions['10/4'] = 'st-francis';
				occasions['11/2'] = 'all-souls';
				occasions['11/30'] = 'advent';
				occasions['12/8'] = 'immaculate';
				occasions['12/24'] = 'christmas-eve';
				occasions['12/25'] = 'christmas';
			break;
			default:
			break;
		}
		if(occasions[date]!=null) {
			this.addClass(occasions[date]);
		}
		return this;
	};
}( jQuery ));