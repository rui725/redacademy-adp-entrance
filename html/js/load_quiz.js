//Global Variables
var json = ""
var score = 0;
var totalq = 0;
var totalc = 0;

//function to read json file
$.getJSON("../src/quiz.json", function(text) {
	 json = text['quizzes'];
});

/*function that handles delay method
param qnum = quiz number
      q    = question number
      ans  = correct or wrong answer
      i    = button element
*/
function change(qnum,q,ans,i){
	//gets div#alert element
	divAlert = document.getElementById("alert");
	
	//checks correct/wrong answer and changes color for the alert and the button
	if(ans){
		divAlert.className = "alert-success";
		divAlert.innerHTML = "<center><strong>Correct Answer!!</strong></center>"
		i.className = "btn btn-success";
	}else {
		divAlert.className = "alert-danger";
		divAlert.innerHTML = "<center><strong>Wrong Answer!!</strong></center>"
		i.className = "btn btn-danger";
	}
	
	//checks if it has reached all the questions in the quiz, delays for 2 seconds and goes to the next question or the result view
	//Note: resets the div#alert element
	if (q==totalq){
		setTimeout(function(){divAlert.className=""; divAlert.innerHTML="";result(ans); },2000);
	}else{
		setTimeout(function(){divAlert.className=""; divAlert.innerHTML="";quiz(qnum,q,ans);},2000);
	}
}

//function that runs when the index.html loads
function welcome(){
	//re-assigned values to reset
	score = 0;
	totalq = 0;
	totalc = 0;
	
	//gets the div#message
	var divBody = document.getElementById("message");
	
	//initiate welcome 
	html = "<div class=\"jumbotron\"><h1 class=\"display-3\">Start</h1></div>";
	
	//loads the quizzes
	for (var i = 0; i < json.length; i++){
		html += "<center><button id=\"quiz\" class=\"btn btn-primary btn-block\"onclick=\"quiz("+i+")\">"+json[i]['title']+"</button><br /><br /></center>";
	}
	
	//loads changes values in the div
	divBody.innerHTML = html;
}	

/*loads the questions for the specific quiz a.k.a question view
param qnum = quiz number
      q    = question number
      ans  = correct/wrong answer
*/
function quiz(qnum,q=0,ans=false){
	//assigns the total number of question
	totalq = json[qnum]['questions'].length; 
	
	//if the answer is correct adds 1 to counter totalc(counts all the correct answer)
	if (ans){ totalc+=1; }
	
	//calls calculate function
	calculate()
	
	//assigns the instance of the object-array of the question
	var obj = json[qnum]['questions'][q];
	
	//assigns the div#message element
	var divBody = document.getElementById("message");
	
	//assigns the call change function and its parameters
	var next_process = "change(qnum="+(qnum) + ", q="+ (q+1)+", ";
	
	//html code that generates the question
	html = "<div id=\"score\" class=\"jumbotron\"><h1>Score: " + parseInt(score) +"%</h2>";
	html += "<div id=\"question\">";
	html += "<center><h1 class=\"display-5\">"+ obj['question']+"</h1></div></center></div>"
	//html += "<table>"
	
	//assigns the instance of the object-array for the answers
	obj = obj['answers'];
	html +="<div id=\"ans\">";
	//generates the answers 
	for (i = 0; i < obj.length;i++){
	//	if(i == 0){ html += "<tr>";}
		//if (i%2==0 && i > 0){ html += "</tr>"; }
		//html +="<td id=\"ans\"><button class=\"btn btn-primary\"id=\"b_"+i+"\"onclick=\"" + next_process + "ans="+obj[i]['value']+", i=b_"+i+");\">"+obj[i]['content']+"</td>";
		
		html +="<button class=\"btn btn-primary\"id=\"b_"+i+"\"onclick=\"" + next_process + "ans="+obj[i]['value']+", i=b_"+i+");\">"+obj[i]['content']+"</button>";
		//html +="&nbsp;"//html +="<div class=\"divider\" / >";
	}
	html +="</div>"
	//html += "</tr></table></div>"
		
	//loads and changes the values in the div
	divBody.innerHTML=html;
	
}

//calculates the percentage of the answers
function calculate(){
	if(totalc==totalq){
		score = 100;
	}else{
		score = totalc/totalq * 100;
	}
}

/*result view
param ans = correct/wrong answer
*/
function result(ans){
	//assigns the div#message element
	var divBody = document.getElementById("message");
	
	//if the answer is correct adds 1 to counter totalc(counts all the correct answer)
	if(ans){ totalc+=1;}
	
	//calls calculate function
	calculate()
	
	//generates the html for the result view
	html = "<div class=\"jumbotron\"><button id=\"back\" class=\"btn btn-primary\" onclick=\"welcome();\"><< Back to Welcome Screen</button><br /><br />";
	html += "<h1 class=\"display-5\">Final Score</h1></div><br />";
	//html += "<center><h2>" + parseInt(score) + "%</h2></center>"
	
	//checks if the percentage is a pass or fail
	if(score >= 50){
		html += "<center><div id=\"res\" class=\"btn btn-success\"><br/>" + parseInt(score) + "%<br/> PASS</div></center>"
	}else{
		html += "<center><div id=\"res\" class=\"btn btn-danger\"><br/>" + parseInt(score) + "%<br/>FAIL</div></center>"
	}
	
	//loads and changes the values in the div
	divBody.innerHTML = html;
}