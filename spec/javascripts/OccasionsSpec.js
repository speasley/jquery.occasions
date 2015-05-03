describe("Sample element", function() {
	
	var $element;

	beforeEach(function() {
		loadFixtures("occasion.html");
		$element = $("#logo");
	});

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
