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
	if (!validateAddNewProblemStage(currentLevel)) {
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
function validateAddNewProblemStage(n) {
	var vehicleInput = $("#vehicle");
	var vehicleInputHtml = vehicleInput.get(0);
	if (vehicleInput.val() == null) {
		Materialize.toast('Please select a vehicle!', 4000, 'orange center-aligned large black-text flow-text')
		return false
	}
	if ($("input[name='problems[]']").length > 0 && n > 0) {
		var selectedTemplate = false;
		$("input[name='problems[]']").each(function() {
			if ($(this).val() != null && $(this).val() != "" && $(this).val() != undefined) {
				selectedTemplate = true;
				return;
			}
		});
		if (!selectedTemplate) {
			Materialize.toast('Please select a template!', 4000, 'orange center-aligned large black-text flow-text')
			return false;
		}
	}
	return true;
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
	if (n == 1){
		showAddNewProblemTemplateFab();
	} else {
		hideAddNewProblemTemplateFab();
	}
	if (n == 3) {
		loadAddNewProblemReview();
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
function loadAddNewProblemReview() {
	var textSelectedCarDefault = "Selected car: "
	var textSelectedTemplateDefault = "Selected template: "
	var textAdditionalInfoDefault = "Additional info: "
	var textMediaFilesDefault = "Media files: "
	var vehicleId = $("select#vehicle").val();
	var vehicleName = $("option[value="+vehicleId+"]").html();
	var templateId = $("input[name='problems[]'][ value!='']").val();
	var templateName = $('#' + templateId + ' span').html()
	console.log(templateId, templateName, vehicleName);
	$("#selectedCar").html(textSelectedCarDefault+'<span class="black-text flow-text medium">'+vehicleName+'</span>');
	$("#selectedTemplate").html(textSelectedTemplateDefault+'<span class="black-text flow-text medium">'+templateName+'</span>');
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
function showAddNewProblemTemplateFab() {
	var $button = $("#templateFab");
	if ($button){
		if ($button.hasClass("hide")) {
			$button.removeClass('hide');
		}
	}
}
function hideAddNewProblemTemplateFab() {
	var $button = $("#templateFab");
	if ($button){
		if (!$button.hasClass("hide")) {
			$button.addClass('hide');
		}
	}
}

function addNewProblemToggleProblemTemplate(elem) {
	var $this = $(elem);
	if ($this.find("i").html() == "check_box_outline_blank") {
		$this.find("i").html("check_box");
		$this.find("input").attr("value", $this.attr('id'));
	} else {
		$this.find("i").html("check_box_outline_blank");
		$this.find("input").attr("value", "");
	}
}
function createTemplate(form) {
	if ((form.title.value == "") && (form.description.value == "")) {
		Materialize.toast("Empty template can't be created!", 4000, 'orange center-aligned large black-text flow-text')
		return;
	}
	if (form.title.value == "") {
		Materialize.toast("Template is missing title!", 4000, 'orange center-aligned large black-text flow-text')
		return;
	}
	if (form.description.value == "") {
		Materialize.toast("Template is missing description!", 4000, 'orange center-aligned large black-text flow-text')
		return;
	}
	socket.emit("createTemplate", {userId:userId, title:form.title.value, description:form.description.value});
	var created = false;
	socket.on("createTemplateResponse", function(data) {
		if (created) {
			return;
		}
		created = true;
		if (data.error) {
			Materialize.toast("Something went wrong please try again!", 4000, 'orange center-aligned large black-text flow-text')
			console.error("createTemplateResponseError: ", data.error)
			return;
		}
		if (!$("#templateList")) {
			console.error("createTemplateResponseError: Could not find the template list");
		}
		var newTemplateHtml = '<li><div class="collapsible-header" onclick="addNewProblemToggleProblemTemplate(this)" id="'+data.template._id+'"><i class="material-icons">check_box_outline_blank</i><span class="flow-text">'+data.template.title+'</span><input type="hidden" name="problems[]" value=""></div><div class="collapsible-body"><p class="flow-text">'+data.template.desc+'</p></div></li>';
		$(newTemplateHtml).prependTo($('#templateList'));
		form.title.value = "";
		form.description.value = "";
	});
}
