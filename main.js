var inputs = document.getElementsByTagName("textarea")
var buttons = document.getElementsByTagName("button")
var result = document.getElementById("result")

function encode(event,isDecoding) {
	
	var emptyInputs = false;
	for (var i = 0; i < inputs.length; i++)
		if (!inputs[i].value){
			emptyInputs = true;
			console.log("input " + i + " is empty")
		}
	if (!emptyInputs) {
		var text = inputs[0].value.toLowerCase();
		var key = parseInt(inputs[1].value);
		if (isDecoding) key = key;
		var output = doTheWork(text, key, isDecoding);
		console.log(output);
		result.innerHTML = output;
	}
}

buttons[0].addEventListener('click', function() {encode(event, false)});
buttons[1].addEventListener('click', function() {encode(event, true)});


function genCipher(num, isDecoding) {
	var letters = 'abcdefghijklmnopqrstuvwxyz1234567890';
	//codePairs = []
	var codeDict = {};
	for (var i = 0; i < letters.length; i++)
		if (!isDecoding)
			codeDict[letters.charAt(i)] = letters.charAt((i+num) % letters.length);
		else
			codeDict[letters.charAt((i+num) % letters.length)] = letters.charAt(i);
	//	codePairs.push([letters.charAt(i),letters.charat((i+num) % letters.length)])
	return codeDict
}

function scramble(string,codeDict) {
	var newStr = '';
	for(var i = 0; i < string.length; i++) {
		if (Object.keys(codeDict).indexOf(string.charAt(i)) > -1) 
			newStr += codeDict[string.charAt(i)];
		else 
			newStr += string.charAt(i);
	}
	return newStr;
}

function doTheWork(string, key, isDecoding) {
	return scramble(string, genCipher(key, isDecoding));
}


