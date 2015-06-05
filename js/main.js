$(function() {

	// Clone buttons
	$(".addMoreBtn").on("click", function() {
		$(".countBtn").clone().appendTo("form");
	});

	// Using event delegation and lazy evaluation
	$("form").on("click", ".btns", function(event) {
		event.preventDefault();
		var $button = $(this);
		var data = $button.data("countdown"); //Get the button data

		if (!data) { // If no data storied, initialize
			data = {};
			// data properties
			data.numberElem = $button.find(".number");
			data.number = Number(data.numberElem.text());
			$button.data("countdown", data); // Update data
		}		
		data.number = data.number - 1;
		data.numberElem.text(data.number); // Update text
		if (data.number === 0) {
			$button.removeData("countdown");
			$button.addClass('disabled');
		}
	});

	return;

	// Event delegation
	$("form").on("click", ".btns", function(event) {
		event.preventDefault();

		var $button = $(this);
		
		var numberElem = $button.find(".number");
		var number = Number(numberElem.text()) - 1;

		numberElem.text(number);

		if (number === 0) {
			$button.addClass('disabled');
		}

	});

	return;

	// Lazy evalution
	$(".btns").each(function() {
		var $button = $(this);
		var numberElem, number; // Set variables

		$button.on("click", function(event) {
			if (!numberElem) { // If variable has not been initialized, set it. Second time it's click it won't run
				numberElem = $button.find(".number");
				number = Number(numberElem.text());
			}
			event.preventDefault();
			number = number - 1;
			numberElem.text(number);

			if (number === 0) {
				$button.off("click"); // unbind event handler
				$button.addClass('disabled');
			}
		});
	});

	return;

	// Better for life of page but loads each time the page loads
	// Not great for load time
	$(".btns").each(function() {
		var $button = $(this);
		var numberElem = $button.find(".number");
		var number = Number(numberElem.text());

		$button.on("click", function(event) {
			event.preventDefault();
			number = number - 1;
			numberElem.text(number);

			if (number === 0) {
				$button.addClass('disabled');
				$button.off("click"); // unbind event handler
			}
		});
	});

	return; 

	// Less efficient way
	$(".btns").on("click", function(event) {
		event.preventDefault();

		var $button = $(this);
		var numberElem = $button.find(".number");
		var number = Number(numberElem.text()) - 1;

		numberElem.text(number);

		if (number === 0) {
			$button.addClass('disabled');
			$button.off("click"); // unbind event handler
		}
	});
});