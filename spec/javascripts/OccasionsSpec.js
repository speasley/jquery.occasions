var $element;

beforeEach(function() {
	loadFixtures("occasion.html");
	$element = $("#logo");
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
		$element.occasions({date:"01/23"});
		expect($element).not.toHaveAttr("class");
	});
	
	it("should have a class if 'today' is an occasion", function() {
		$element.occasions({date:"01/21"});
		expect($element).toHaveClass("hug");
	});
	
});

describe("Options", function() {

	describe("Country", function() {
	
		it("should not add 'aboriginal' class as a default", function() {
			$element.occasions({date:"06/21"});
			expect($element).not.toHaveClass("aboriginal");
		});
	
		it("should add 'aboriginal' class with country option set", function() {
			$element.occasions({date:"06/21",country:"canada"});
			expect($element).toHaveClass("aboriginal");
		});

	});

	describe("Sect", function() {
	
		it("should not add 'christmas' class as a default", function() {
			$element.occasions({date:"12/25"});
			expect($element).not.toHaveClass("christmas");
		});
	
		it("should add 'christmas' class with sect option set", function() {
			$element.occasions({date:"12/25",sect:"christian"});
			expect($element).toHaveClass("christmas");
		});

	});

	describe("Callback", function() {

		it("should execute the callback code", function() {
			var testVar = "foo"
			$element.occasions({
				date:"05/04",
				onSuccess: function() {
					testVar = "bar"
				}
			});
			expect(testVar).toEqual("bar");
		});

	});

});