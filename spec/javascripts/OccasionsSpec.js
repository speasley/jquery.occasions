var $element;

beforeEach(function() {
	loadFixtures("occasion.html");
	$element = $("#logo");
});


describe("occasions", function() {
  it('should be chainable', function() {
    $element.occasions().addClass('other');
    expect($element.hasClass('other')).toBeTruthy();
	});
});

describe("Sample element", function() {

	it("should exist in the fixture", function() {
		expect($element).toHaveId("logo");
	});
	
	it("should call jquery.occasions()", function() {
		spyOn($element, 'occasions');
		$element.occasions();
		expect($element.occasions).toHaveBeenCalled();
	});
	
	it("should not have a class if today is not an occasion", function() {
		$element.occasions({date_override:"Jan 23"});
		expect($element).not.toHaveAttr("class");
	});
	
	it("should have a class if 'today' is an occasion", function() {
		$element.occasions({date_override:"Jan 21"});
		expect($element).toHaveClass("hug");
	});
	
	it("should provide you with today's occasion", function() {
		$element.occasions({date_override:"Jan 21, 2014"});
		expect($element.occasion).toEqual("victoria"); //May 19, 2014
	});

  it("should return Friday before Dec 07", function() {
    $element.occasions({date_override:"Dec 01, 2012"});
    expect($element.occasion).toEqual();
  });
	
});

describe("Internal functions", function() {

  describe("renameKey()", function() {
    it("should rename hash key", function() {
      var hash = {"key":"value"};
      var internals = $element.occasions({internals:true});
      expect(internals.renameKey(hash,"key","newkey")).toEqual({"newkey":"value"});
    });
  });

  describe("mergeHashes()", function() {
    it("should merge two hashes into one", function() {
      var a = {"a":"b"};
      var b = {"c":"d"};
      var internals = $element.occasions({internals:true});
      expect(internals.mergeHashes(a,b)).toEqual({"a":"b","c":"d"});
    });
  });

  describe("setGlobalYear()", function() {
    it("should return today's year by default", function() {
      var internals = $element.occasions({internals:true});
      var year = new Date().getFullYear();
      expect(internals.globalYear()).toEqual(year);
    });
    it("should return overridden year", function() {
      var internals = $element.occasions({internals:true});
      expect(internals.globalYear("2002")).toEqual("2002");
    });
  });

  describe("todaysDate()", function() {
    it("should return today's date", function() {
      var internals = $element.occasions({internals:true});
      var today = new Date();
      var month = today.getMonth();
      var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"];
      var day = today.getDate();
      var date = monthNames[month] + ' ' + (day<10 ? '0' : '') + day;
      expect(internals.todaysDate()).toEqual(date);
    });
  });

  describe("monthIndex()", function() {
    it("should return the month index", function() {
      var internals = $element.occasions({internals:true});
      expect(internals.monthIndex("Dec")).toEqual(11);
    });
  });

  describe("monthName()", function() {
    it("should return the month name", function() {
      var internals = $element.occasions({internals:true});
      expect(internals.monthName(11)).toEqual("Dec");
    });
  });
  
  describe("weekdayIndex()", function() {
    it("should return the weekday index", function() {
      var internals = $element.occasions({internals:true});
      expect(internals.weekdayIndex("Sat")).toEqual(6);
    });
  });
  
  describe("weekdayName()", function() {
    it("should return the weekday name", function() {
      var internals = $element.occasions({internals:true});
      expect(internals.weekdayName(6)).toEqual("Sat");
    });
  });
  
  describe("timestamp()", function() {
    it("should return timestamp of date", function() {
      var internals = $element.occasions({date_override:"Jan 29, 2016",internals:true});
      expect(internals.timestamp(3,29)).toEqual(1461909600);
    });
  });

  describe("nthDay()", function() {
    it("should return second Sunday of June", function() {
      var internals = $element.occasions({date_override:"Jun 12, 2016",internals:true});
      expect(internals.nthDay("2,Sun,Jun")).toEqual("Jun 12");
    });
    it("should return third Tuesday of June", function() {
      var internals = $element.occasions({date_override:"Jun 12, 2016",internals:true});
      expect(internals.nthDay("3,Tue,Jun")).toEqual("Jun 21");
    });
    it("should return first Thursday of June", function() {
      var internals = $element.occasions({date_override:"Jun 12, 2016",internals:true});
      expect(internals.nthDay("1,Thu,Jun")).toEqual("Jun 02");
    });
    it("should return fourth Monday of May", function() {
      var internals = $element.occasions({date_override:"May 12, 2016",internals:true});
      expect(internals.nthDay("4,Mon,May")).toEqual("May 23");
    });
    it("should return second Saturday of May", function() {
      var internals = $element.occasions({date_override:"May 12, 2016",internals:true});
      expect(internals.nthDay("2,Sat,May")).toEqual("May 14");
    });
  });

  describe("weekdayBefore()", function() {
    it("should return Monday before Feb 27", function() {
      var internals = $element.occasions({date_override:"May 12, 2016",internals:true});
      expect(internals.weekdayBefore("Mon,Feb,27")).toEqual("Feb 22");
    });
    it("should return Monday before May 25", function() {
      var internals = $element.occasions({date_override:"May 12, 2016",internals:true});
      expect(internals.weekdayBefore("Mon,May,25")).toEqual("May 23");
    });
    it("should return Friday before Dec 07", function() {
      var internals = $element.occasions({date_override:"Dec 01, 2012",internals:true});
      expect(internals.weekdayBefore("Fri,Dec,07")).toEqual("Nov 30");
    });
  });

});

describe("Options", function() {

	describe("Date override", function() {

    it("should override today's date", function() {
      var internals = $element.occasions({internals:true});
      expect(internals.todaysDate("Feb 27")).toEqual("Feb 27");
    });

    it("should override today's date and year", function() {
      var internals = $element.occasions({internals:true});
      expect(internals.todaysDate("Feb 27, 1979")).toEqual("Feb 27, 1979");
    });

	});

	describe("Country", function() {
	
		it("should not add 'aboriginal' class as a default", function() {
			$element.occasions({date_override:"Jun 21"});
			expect($element).not.toHaveClass("aboriginal");
		});
	
		it("should add 'aboriginal' class with country option set", function() {
			$element.occasions({date_override:"Jun 21",country:"canada"});
			expect($element).toHaveClass("aboriginal");
		});

	});

	describe("Sect", function() {
	
		it("should not add 'christmas' class as a default", function() {
			$element.occasions({date_override:"Dec 25"});
			expect($element).not.toHaveClass("christmas");
		});
	
		it("should add 'christmas' class with sect option set", function() {
			$element.occasions({date_override:"Dec 25",sect:"christian"});
			expect($element).toHaveClass("christmas");
		});

	});

	describe("Path", function() {

    it("should add the missing trailing slash to the custom path", function() {
      var internals = $element.occasions({internals:true});
      expect(internals.sanitizePath("custom/path")).toEqual("custom/path/");
    });

    it("should not modify a custom path that has a trailing slash", function() {
      var internals = $element.occasions({internals:true});
      expect(internals.sanitizePath("custom/path/")).toEqual("custom/path/");
    });

  });

	describe("Callback", function() {

		it("should execute the callback code", function() {
			var testVar = "foo"
			$element.occasions({
				date_override:"May 04",
				onSuccess: function() {
					testVar = "bar"
				}
			});
			expect(testVar).toEqual("bar");
		});
		
	});

});
