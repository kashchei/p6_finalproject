// General layout

// load js to be ready for interaction
$(document).ready(function () {
	$("a[data-toggle]").on("click", function(e) {
	  e.preventDefault();  // prevent navigating
	  var selector = $(this).data("toggle");  // get corresponding selector from data-toggle
	  $("div").hide();
	  $(selector).show();
	});
});

