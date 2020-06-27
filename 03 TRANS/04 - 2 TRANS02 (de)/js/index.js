var alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
var input = document.getElementById("textInput");
var shift = document.getElementById("shift");
var shiftVal = document.getElementById("shiftVal");
var output = document.getElementById("textOutput");
var email = document.getElementById("email");

function encode() {
	var enteredText = input.value.toLowerCase();
	var shiftedText = "";
	shiftVal.innerText = shift.value;
	for (var i = 0; i < enteredText.length; i++) {
		var newIndex = [parseInt(alphabet.indexOf(enteredText[i])) + parseInt(shift.value)];
		if (alphabet.indexOf(enteredText[i]) === -1) {
			shiftedText += enteredText[i];
		} else if (newIndex > 32) {
			newIndex -= 33;
			shiftedText += alphabet[newIndex];

		} else if (newIndex < 0) {
			newIndex = parseInt(newIndex) + 33;
			shiftedText += alphabet[newIndex];

		} else {
			shiftedText += alphabet[newIndex];
		}
	}
	output.innerText = shiftedText;
}

input.onfocus = function() {
	this.value = "";
	encode();
};
input.oninput = encode;
shift.oninput = encode;
email.onmouseover = function() {
	this.href = "mailto:?subject=Check out this secret code!&body=Copy this secret code:%0D%0A  " +
		output.innerText + "%0D%0ADecode it at: https://codepen.io/thehack/full/ORLGVX";
};
