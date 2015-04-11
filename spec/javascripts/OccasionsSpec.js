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

});
