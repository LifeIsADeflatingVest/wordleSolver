var letter1, letter2, letter3, letter4, letter5, outLets;
var val1, val2, val3, val4, val5;
var yArray = [];
var gArray = [];
var theWord = "";
var gWord = "";
var outL = "";

$(document).ready(function(){
	letter1 = document.getElementById("input1");
	letter2 = document.getElementById("input2");
	letter3 = document.getElementById("input3");
	letter4 = document.getElementById("input4");
	letter5 = document.getElementById("input5");
	outLets = document.getElementById("outLetters");
	letter1.value = '';
	letter2.value = '';
	letter3.value = '';
	letter4.value = '';
	letter5.value = '';
	outLets.value = '';
	for (var y=1;y<6;y++) {
		$("#input"+y).click(function(){
			if (isLetter(this.value)) {
				this.style.color= "black";
				if (this.style.backgroundColor != "green") {
					this.style.backgroundColor = "green";
				}
				else {
					this.style.backgroundColor = "yellow";
				}
			}
		});
	}
});

function validate(input){
	input.value = input.value.replace(/\W|\d/g, '').substr(0, 1).toUpperCase();
	if (isLetter(input.value)) {
		input.style.color = "black";
		input.style.backgroundColor = "yellow";
	}
	else {
		input.style.backgroundColor = "black";
	}
}
function submitChoices() {
	gArray.length=0;
	gWord = "";
	theWord = "";
	yArray.length=0;
	outL = outLets.value.replace(/[^a-z]/gi, '');
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
		yelArrPopulate();
		showRes(yArray);
	}
	else {	
		yelArrPopulate();
		getWordArray().then(function(obj){
			for (var i=0;i<obj.length;i++) {
				gArray.push(obj[i].word);
			}
			showRes(yArray.filter(item => gArray.includes(item)));
		});
	}
	
	function yelArrPopulate() {
		theWord = theWord.replace(/[?=]/g, "");
		theWords.forEach(function(value, index, arr){
			 if (containsSub(value, theWord)) {
				 yArray.push(value);
			 }
		});
	}
	function showRes(arr) {
		arr.forEach(function(val, ind, ar){ // remove words including a letter not in the word-to-be-guessed
			for (var i=0;i<outL.length;i++) {
				if (val.includes(outL[i])) {
					ar = ar.filter(e => e !== val)
				}
			}
		});
		arr.forEach(function(value, ind, ar){ // remove words with letter in yellow-letter position (since it can't be there)
			for (var i=1;i<6;i++) {
				if (eval("val"+i)==value[i]) {
					ar = ar.filter(e => e !== value)
				}
			}
		});
		$("#wordList").fadeOut(500);
		setTimeout(function(){
			if (arr.length < 50) {
				$("#wordList").html(arr.join(" "));
				$("#wordList").fadeIn(1500);
			}
			else {
				$("#wordList").html("More than 50 hits. Try entering more letters");
				$("#wordList").fadeIn(1500);
			}
			
			for (var y=1;y<6;y++) {
				document.getElementById("input"+y).style.backgroundColor = "black";
				document.getElementById("input"+y).style.color = "white";
			}
		}, 510);
	}
}
function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}
function containsSub(string, substring) {
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
        resolve($.get('https://api.datamuse.com/words?sp='+gWord+'&max=500'));
    });
}
function startOver() {
	window.location.reload();
}