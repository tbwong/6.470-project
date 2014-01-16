$(document).ready(function() {
//hover to make icons visible
	$("#food-list").on("mouseenter", ".hov", function() {
		if ($("#foodedit").length==0) {
			$(this).children(".close").removeClass("invisible");
			$(this).css("background-color", "#eeeeee");
		}
	});
	
	$("#food-list").on("mouseleave", ".hov", function() {
		if ($("#foodedit").length==0) {
			$(this).children(".close").addClass("invisible");
			$(this).css("background-color", "#fff5eb");
		}
	});

//click text to edit
	$("#food-list").on("click", ".hov", function() {
		//	alert("hello!");
	});

//click "x" to remove
	$("#food-list").on("click", ".remove", function() {
		if ($("#foodedit").length==0) {
			$(this).parent(".hov").remove();
		}
	});

//set cursor to end
	$.fn.setCursorToTextEnd = function() {
		$initialVal = this.val();
		this.val('');
		this.val($initialVal);
	};

//click "pencil" to edit
	$("#food-list").on("click", ".edit", function() {
		if ($("#foodedit").length==0) {
			var foodcontent = $(this).parent(".hov").contents().first().text();
			$(this).parent(".hov").replaceWith('<input type="text" class="form-control" id="foodedit" '+'value="' + foodcontent+'"></input>');
			$("#foodedit").focus().setCursorToTextEnd();
		}
	});

//press enter to save edits
	$("#food-list").on("keypress", "#foodedit", function(e) {
		console.log(e.keyCode);
		if (e.keyCode === 13) {
		  e.preventDefault();
		  var foodedit = $("#foodedit").val();
		  $(this).replaceWith("<div class='hov'>"+foodedit+"<button type='button' class='close invisible remove'><span class='glyphicon glyphicon-remove'></span></button> <button type='button' class='close invisible edit'><span class='glyphicon glyphicon-pencil' id='listspace'></span></button></div>");
		}
	});

	
	
//add ingredient at bottom
	function addIng() {
		var food = $("#food").val();
		$("#food").val("");
		if (food !== "" && food !== " "){
		$("#food-list").append("<div class='hov'>"+food+"<button type='button' class='close invisible remove'><span class='glyphicon glyphicon-remove'></span></button> <button type='button' class='close invisible edit'><span class='glyphicon glyphicon-pencil' id='listspace'></span></button></div>");
		}
	}

/*	$("#addFood").click(function() {
		addIng();
	});
*/
	
	$("#food").keypress(function(e) {
		console.log(e.keyCode);
		if (e.keyCode === 13) {
		  e.preventDefault();
		  addIng();
		}
	});
});

/*
$(document).click(function(e) {
	if ($("#foodedit").length!=0 && (e.target.id !== 'foodedit') && (e.target.id !== 'edit')) {
//		alert(e.target.id);
		var foodedit = $("#foodedit").val();
		$("#foodedit").replaceWith("<div class='hov'>"+foodedit+"<button type='button' class='close invisible remove'><span class='glyphicon glyphicon-remove'></span></button> <button type='button' class='close invisible edit'><span class='glyphicon glyphicon-pencil' id='listspace'></span></button></div>");
	}
});


$(document).click(function(e) {
//	if ($("#foodedit").length!=0 && e.target.id !== '' && e.target.id !== 'foodedit' && e.target.id !== 'edit') {
	alert(e.target.id);
});
*/