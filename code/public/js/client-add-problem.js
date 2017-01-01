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
});

function setAddNewProblemStage(n) {
	if (n-currentLevel > 1) {
		return;
	}
	currentLevel = n;
	setAddNewProblemStageForm(n);
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem("currentLevel", n);
	} else {
		console.log("Your browser does not support localStorage, please consider upgrade for beter user experience! Thx, addictedPenguins.")
	}
}
function setAddNewProblemStageForm(n) {
	var mapping = {0:"chooseVehicleLevel", 1:"selectProblemLevel", 2:"additionalInfoLevel", 3:"confirmationLevel"};
	var tabCurrent = $("#" + mapping[n] + "Tab").get(0);
	if (!tabCurrent.className.includes("active")) {
		tabCurrent.className = tabCurrent.className + " active"
	}
	tabCurrent.parentNode.className = tabCurrent.parentNode.className.replace(" disabled", "");
	console.log(tabCurrent);
	console.log(tabCurrent.parentNode);
	if (n-1 >= 0) {
		var tabPrevious = $("#" + mapping[n-1] + "Tab").get(0);
		tabPrevious.className = tabPrevious.className.replace(" active", "")
		console.log(tabPrevious);
	}
	var form = $
}