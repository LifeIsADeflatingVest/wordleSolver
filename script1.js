var letter1, letter2, letter3, letter4, letter5;
var val1, val2, val3, val4, val5;
var theArray = [];
var theWord = "";
var gWord = "";

$(document).ready(function(){
	letter1 = document.getElementById("input1");
	letter2 = document.getElementById("input2");
	letter3 = document.getElementById("input3");
	letter4 = document.getElementById("input4");
	letter5 = document.getElementById("input5");
	for (var y=1;y<6;y++) {
		$("#input"+y).click(function(){
			if (isLetter(this.value))
			this.style.backgroundColor = "green";
		});
	}
});

function validate(input){
	input.value = input.value.replace(/\W|\d/g, '').substr(0, 1).toUpperCase();
	if (isLetter(input.value)) {
		input.style.color = "black";
		input.style.backgroundColor = "yellow";
	}
}
function submitChoices() {
	theArray.length=0;
	$("#wordList").fadeOut(0);
	val1 = letter1.value;
	if (val1=="") {
		val1 = "?";
	}
	val2 = letter2.value;
	if (val2=="") {
		val2= "?";
	}
	val3 = letter3.value;
	if (val3=="") {
		val3 = "?";
	}
	val4 = letter4.value;
	if (val4=="") {
		val4 = "?";
	}
	val5 = letter5.value;
	if (val5=="") {
		val5 = "?";
	}	
	theWord = (val1+val2+val3+val4+val5).toLowerCase();
	if (theWord == "?????") {
		alert ("No letters given!");
		return;
	}
	wordCheck();
}
function wordCheck() {
	for (var z=1;z<6;z++) {
		if (eval("input"+z).style.backgroundColor == "green") {
			gWord += eval("val"+z);
		}
		else {
			gWord += "?";
		}
	}
	if (gWord == "?????") {
			theWord = theWord.replace(/[?=]/g, "");
			theWords.forEach(function(value, index, arr){
				 if (test(value, theWord)) {
					 theArray.push(value);
				 }
			});
	}
	else {	
		getWordArray().then(function(obj){
			for (var i=0;i<obj.length;i++) {
				theArray.push(obj[i].word);
				showRes();
			}
		});
	}
	showRes();
	function showRes() {
		$("#wordList").html(theArray.join(" "));
		$("#wordList").fadeIn(1500);
	}
}
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
function test(string, substring) {
    var letters = [...string];
    return [...substring].every(x => {
        var index = letters.indexOf(x);
        if (~index) {
            letters.splice(index, 1);
            return true;
        }
    });
}
function getWordArray() {
    return new Promise(function (resolve, reject) {
        resolve($.get('https://api.datamuse.com/words?sp='+gWord+'&max=50'));
    });
}