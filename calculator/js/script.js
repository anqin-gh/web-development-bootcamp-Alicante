$(document).ready(function() {
	var entry;
	var result;
	var history;
	var currentNumber;
	var reset;
	function clear() {
		result = "0";
		history = "0";
		currentNumber = "0";
		reset = false;
	}
	function removeLastEntry() {
		if (!reset) {
			if (result.length > 1) {
				currentNumber = currentNumber.slice(0, -1);
				result = result.slice(0, -1);
			} else {
				currentNumber = "0";
				result = "0";
			}
		} else clear();
	}

	function concatenateNumber() {
		if (reset) clear();
			if (result === "0") {
				currentNumber = entry;
				result = entry;
			} else {
				if (isLengthOK()) {
					currentNumber += entry;
					result += entry;
				}
			}
	}

	function concatenatePeriod() {
		if (!reset) {
			if (currentNumber.indexOf(entry) === -1) {
				currentNumber += entry;
				result += entry;
			}
		} else {
			clear();
			currentNumber += entry;
			result += entry;
		}
	}

	function concatenateOperator() {
		if (!reset) {
			var lastChar = result.charAt(result.length-1);
			if (isNaN(Number(lastChar))) {
				currentNumber = "0";
				result = result.slice(0, -1) + entry;
			} else {
				result += entry;
				currentNumber = "";
			}
		} else {
			clear();
			currentNumber += entry;
			result += entry;
		}
	}

	function evaluateExpression() {
		history = result;
		try {
			result = eval(result).toString();
			currentNumber = result;
		} catch (err) {
			result = "error";
			history = "";
			currentNumber = "0";
			reset = true;
		}
	}

	function isLengthOK() {
		if (result.length < 20) return true;
		return false;
	}

	clear();

	$("button").click(function() {
		entry = $(this).attr("value");
		if (entry === "ac") clear();

		else if (entry === "ce") removeLastEntry();

		else if (isNaN(entry)) { // when the entry is an operator
			if (entry === "=") evaluateExpression();
			else if (entry === ".") concatenatePeriod();
			else concatenateOperator();

		} else concatenateNumber();

		// print values to screen
		$("#result p").html(result);
		$("#history p").html(history);
	});
});
