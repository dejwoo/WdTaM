function addProblemNext() {
	console.log("Add Problems Next Step");
	var args = arguments;
	for(var i=0; i<args.length; i++){
		console.log(args[i]);
	}
}
$(document).ready(function () {
	chooseVehicleLevel = 0;
	selectProblemLevel = 1;
	additionalInfoLevel = 2;
	confirmationLevel = 3;
	currentLevel = chooseVehicleLevel;
	if (typeof(Storage) !== "undefined") {
    	var tmp = localStorage.getItem("addProblemCurrentLevel");
    	if (tmp > currentLevel) {
    		currentLevel = tmp;
    	}
	} else {
		console.log("Your browser does not support localStorage, please consider upgrade for beter user experience! Thx, addictedPenguins.")
	}
    $('ul.tabs').tabs();
    $('.collapsible').collapsible();
    $('.modal').modal();
});

function setAddNewProblemStage(n, simulateTabSwitch) {
	if (n > 3 || n < 0 ) {
		return;
	}
	setAddNewProblemStageForm(n, simulateTabSwitch);
	currentLevel = n;
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem("currentLevel", n);
	} else {
		console.log("Your browser does not support localStorage, please consider upgrade for beter user experience! Thx, addictedPenguins.")
	}
}
function setAddNewProblemStageForm(n, simulateTabSwitch) {
	if (n == 0){
		setAddNewProblemInitialStage();
		// console.log(currentLevel, "->", n, "setAddNewProblemInitialStage");
	} else if (n == 3) {
		setAddNewProblemFinalStage();
		// console.log(currentLevel, "->", n, "setAddNewProblemFinalStage");
	} else {
		setAddNewProblemContinousStage();
		// console.log(currentLevel, "->", n, "setAddNewProblemContinousStage");

	}
	var mapping = {0:"chooseVehicleLevel", 1:"selectProblemLevel", 2:"additionalInfoLevel", 3:"confirmationLevel"};
	var mappingLeadText = {0:"Please select your vehicle!", 1:"Please select a problem from the template which describes your situation the best or create one!", 2:"Add any additional information or photo/video!", 3:"Please review all information and confirm to create the problem!"};
	if ($("h2 + p.lead")) {
		$("h2 + p.lead").html(mappingLeadText[n]);
	}
	// tab movement
	var tabCurrent = $("#" + mapping[n] + "Tab").get(0);
	if (!tabCurrent.className.includes("active")) {
		tabCurrent.className = tabCurrent.className + " active"
	}
	if (tabCurrent.getAttribute("onclick") != "setAddNewProblemStage("+mapping[n]+", 0)") {
		tabCurrent.setAttribute("onclick","setAddNewProblemStage("+mapping[n]+", 0)");
	}
	tabCurrent.parentNode.className = tabCurrent.parentNode.className.replace(" disabled", "");
	if ( $('ul.tabs').length > 0 && simulateTabSwitch) {
		$('ul.tabs').tabs('select_tab', mapping[n]);
	}
	if (n-1 >= 0) {
		var tabPrevious = $("#" + mapping[n-1] + "Tab").get(0);
		tabPrevious.className = tabPrevious.className.replace(" active", "")
	}
}
function setAddNewProblemInitialStage() {
	showAddNewProblemInitialCancelButton();
	hideAddNewProblemBackButton();
	hideAddNewProblemSubmitButton();
	showAddNewProblemNextButton();
	hideAddNewProblemCancelButton();
}
function setAddNewProblemContinousStage() {
	hideAddNewProblemInitialCancelButton();
	showAddNewProblemBackButton();
	hideAddNewProblemSubmitButton();
	showAddNewProblemNextButton();
	showAddNewProblemCancelButton();
}
function setAddNewProblemFinalStage() {
	showAddNewProblemSubmitButton();
	hideAddNewProblemNextButton();
	showAddNewProblemCancelButton();
}
function showAddNewProblemInitialCancelButton() {
	if ($('#addNewProblemCancelButtonInitial')) {
		var button = $('#addNewProblemCancelButtonInitial').get(0);
		if (button.className.includes("hide")) {
			button.className = button.className.replace(" hide", "");
		}
	}
}
function hideAddNewProblemInitialCancelButton() {
	if ($('#addNewProblemCancelButtonInitial')) {
		var button = $('#addNewProblemCancelButtonInitial').get(0);
		if (!button.className.includes("hide")) {
			button.className = button.className + " hide";
		}
	}
}
function showAddNewProblemBackButton() {
	if ($('#addNewProblemBackButton')) {
		var button = $('#addNewProblemBackButton').get(0);
		if (button.className.includes("hide")) {
			button.className = button.className.replace(" hide", "");
		}
	}
}
function hideAddNewProblemBackButton() {
	if ($('#addNewProblemBackButton')) {
		var button = $('#addNewProblemBackButton').get(0);
		if (!button.className.includes("hide")) {
			button.className = button.className + " hide";
		}
	}
}
function showAddNewProblemSubmitButton() {
	if ($('#addNewProblemSubmitButton')) {
		var button = $('#addNewProblemSubmitButton').get(0);
		if (button.className.includes("hide")) {
			button.className = button.className.replace(" hide", "");
		}
	}
}
function hideAddNewProblemSubmitButton() {
	if ($('#addNewProblemSubmitButton')) {
		var button = $('#addNewProblemSubmitButton').get(0);
		if (!button.className.includes("hide")) {
			button.className = button.className + " hide";
		}
	}
}
function showAddNewProblemNextButton() {
	if ($('#addNewProblemNextButton')) {
		var button = $('#addNewProblemNextButton').get(0);
		if (button.className.includes("hide")) {
			button.className = button.className.replace(" hide", "");
		}
	}
}
function hideAddNewProblemNextButton() {
	if ($('#addNewProblemNextButton')) {
		var button = $('#addNewProblemNextButton').get(0);
		if (!button.className.includes("hide")) {
			button.className = button.className + " hide";
		}
	}
}
function showAddNewProblemCancelButton() {
	if ($('#addNewProblemCancelButton')) {
		var button = $('#addNewProblemCancelButton').get(0);
		if (button.className.includes("hide")) {
			button.className = button.className.replace(" hide", "");
		}
	}
}
function hideAddNewProblemCancelButton() {
	if ($('#addNewProblemCancelButton')) {
		var button = $('#addNewProblemCancelButton').get(0);
		if (!button.className.includes("hide")) {
			button.className = button.className + " hide";
		}
	}
}




function addNewProblemToggleProblemTemplate(elem) {
	var $this = $(elem);
	console.log($this.find("input"));
	if ($this.find("i").html() == "check_box_outline_blank") {
		$this.find("i").html("check_box");
		$this.find("input").attr("value", $this.attr('id'));
	} else {
		$this.find("i").html("check_box_outline_blank");
		$this.find("input").attr("value", "");
	}
}
