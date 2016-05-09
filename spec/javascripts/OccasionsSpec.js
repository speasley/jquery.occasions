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
		$element.occasions({date_override:"01/23"});
		expect($element).not.toHaveAttr("class");
	});
	
	it("should have a class if 'today' is an occasion", function() {
		$element.occasions({date_override:"01/21"});
		expect($element).toHaveClass("hug");
	});
	
	it("should provide you with today's occasion", function() {
		$element.occasions({date_override:"01/21"});
		expect($element.occasion).toEqual("hug");
	});
	
});

describe("Internal functions", function() {

  describe("mergeHashes()", function() {
    it("should merge two hashes into one", function() {
      var a = {"a":"b"};
      var b = {"c":"d"};
      var internals = $element.occasions({internals:true});
      expect(internals.mergeHashes(a,b)).toEqual({"a":"b","c":"d"});
    });
  });

  describe("todaysDate()", function() {
    it("should return today's date", function() {
      $element.occasions();
      var internals = $element.occasions({internals:true});
      var today = new Date();
      var month = today.getMonth()+1;
      var day = today.getDate();
      var date = (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day;
      expect(internals.todaysDate()).toEqual(date);
    });
  });

  describe("timestamp()", function() {
    it("should return timestamp of date", function() {
      $element.occasions();
      var internals = $element.occasions({internals:true});
      expect(internals.timestamp("04/29") > 1459200000).toBeTruthy();
    });
  });

});

describe("Options", function() {

	describe("Country", function() {
	
		it("should not add 'aboriginal' class as a default", function() {
			$element.occasions({date_override:"06/21"});
			expect($element).not.toHaveClass("aboriginal");
		});
	
		it("should add 'aboriginal' class with country option set", function() {
			$element.occasions({date_override:"06/21",country:"canada"});
			expect($element).toHaveClass("aboriginal");
		});

	});

	describe("Sect", function() {
	
		it("should not add 'christmas' class as a default", function() {
			$element.occasions({date_override:"12/25"});
			expect($element).not.toHaveClass("christmas");
		});
	
		it("should add 'christmas' class with sect option set", function() {
			$element.occasions({date_override:"12/25",sect:"christian"});
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

	describe("Custom occasions", function() {
    it("should add one", function() {
			$element.occasions({custom:{"02/27":"bday"},date_override:"02/27"});
			expect($element).toHaveClass("bday");
    });

    it("should add two", function() {
			$element.occasions({custom:{"02/07":"sisters-bday","02/27":"my-bday"},date_override:"02/07"});
			expect($element).toHaveClass("sisters-bday");
    });

  });

	describe("Callback", function() {

		it("should execute the callback code", function() {
			var testVar = "foo"
			$element.occasions({
				date_override:"05/04",
				onSuccess: function() {
					testVar = "bar"
				}
			});
			expect(testVar).toEqual("bar");
		});
		
	});

});
