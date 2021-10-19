

//<![CDATA[

<!--




function Client(){
//if not a DOM browser, hopeless
	this.min = false; if (document.getElementById){this.min = true;};

	this.ua = navigator.userAgent;
	this.name = navigator.appName;
	this.ver = navigator.appVersion;  

//Get data about the browser
	this.mac = (this.ver.indexOf('Mac') != -1);
	this.win = (this.ver.indexOf('Windows') != -1);

//Look for Gecko
	this.gecko = (this.ua.indexOf('Gecko') > 1);
	if (this.gecko){
		this.geckoVer = parseInt(this.ua.substring(this.ua.indexOf('Gecko')+6, this.ua.length));
		if (this.geckoVer < 20020000){this.min = false;}
	}
	
//Look for Firebird
	this.firebird = (this.ua.indexOf('Firebird') > 1);
	
//Look for Safari
	this.safari = (this.ua.indexOf('Safari') > 1);
	if (this.safari){
		this.gecko = false;
	}
	
//Look for IE
	this.ie = (this.ua.indexOf('MSIE') > 0);
	if (this.ie){
		this.ieVer = parseFloat(this.ua.substring(this.ua.indexOf('MSIE')+5, this.ua.length));
		if (this.ieVer < 5.5){this.min = false;}
	}
	
//Look for Opera
	this.opera = (this.ua.indexOf('Opera') > 0);
	if (this.opera){
		this.operaVer = parseFloat(this.ua.substring(this.ua.indexOf('Opera')+6, this.ua.length));
		if (this.operaVer < 7.04){this.min = false;}
	}
	if (this.min == false){
		alert('Your browser may not be able to handle this page.');
	}
	
//Special case for the horrible ie5mac
	this.ie5mac = (this.ie&&this.mac&&(this.ieVer<6));
}

var C = new Client();

//for (prop in C){
//	alert(prop + ': ' + C[prop]);
//}



//CODE FOR HANDLING NAV BUTTONS AND FUNCTION BUTTONS

//[strNavBarJS]
function NavBtnOver(Btn){
	if (Btn.className != 'NavButtonDown'){Btn.className = 'NavButtonUp';}
}

function NavBtnOut(Btn){
	Btn.className = 'NavButton';
}

function NavBtnDown(Btn){
	Btn.className = 'NavButtonDown';
}
//[/strNavBarJS]

function FuncBtnOver(Btn){
	if (Btn.className != 'FuncButtonDown'){Btn.className = 'FuncButtonUp';}
}

function FuncBtnOut(Btn){
	Btn.className = 'FuncButton';
}

function FuncBtnDown(Btn){
	Btn.className = 'FuncButtonDown';
}

function FocusAButton(){
	if (document.getElementById('CheckButton1') != null){
		document.getElementById('CheckButton1').focus();
	}
	else{
		if (document.getElementById('CheckButton2') != null){
			document.getElementById('CheckButton2').focus();
		}
		else{
			document.getElementsByTagName('button')[0].focus();
		}
	}
}




//CODE FOR HANDLING DISPLAY OF POPUP FEEDBACK BOX

var topZ = 1000;

function ShowMessage(Feedback){
	var Output = Feedback + '<br /><br />';
	document.getElementById('FeedbackContent').innerHTML = Output;
	var FDiv = document.getElementById('FeedbackDiv');
	topZ++;
	FDiv.style.zIndex = topZ;
	FDiv.style.top = TopSettingWithScrollOffset(30) + 'px';

	FDiv.style.display = 'block';

	ShowElements(false, 'input');
	ShowElements(false, 'select');
	ShowElements(false, 'object');
	ShowElements(true, 'object', 'FeedbackContent');

//Focus the OK button
	setTimeout("document.getElementById('FeedbackOKButton').focus()", 50);
	
//
}

function ShowElements(Show, TagName, ContainerToReverse){
// added third argument to allow objects in the feedback box to appear
//IE bug -- hide all the form elements that will show through the popup
//FF on Mac bug : doesn't redisplay objects whose visibility is set to visible
//unless the object's display property is changed

	//get container object (by Id passed in, or use document otherwise)
	TopNode = document.getElementById(ContainerToReverse);
	var Els;
	if (TopNode != null) {
		Els = TopNode.getElementsByTagName(TagName);
	} else {
		Els = document.getElementsByTagName(TagName);
	}

	for (var i=0; i<Els.length; i++){
		if (TagName == "object") {
			//manipulate object elements in all browsers
			if (Show == true){
				Els[i].style.visibility = 'visible';
				//get Mac FireFox to manipulate display, to force screen redraw
				if (C.mac && C.gecko) {Els[i].style.display = '';}
			}
			else{
				Els[i].style.visibility = 'hidden';
				if (C.mac && C.gecko) {Els[i].style.display = 'none';}
			}
		} 
		else {
			// tagName is either input or select (that is, Form Elements)
			// ie6 has a problem with Form elements, so manipulate those
			if (C.ie) {
				if (C.ieVer < 7) {
					if (Show == true){
						Els[i].style.visibility = 'visible';
					}
					else{
						Els[i].style.visibility = 'hidden';
					}
				}
			}
		}
	}
}



function HideFeedback(){
	document.getElementById('FeedbackDiv').style.display = 'none';
	ShowElements(true, 'input');
	ShowElements(true, 'select');
	ShowElements(true, 'object');
	if (Finished == true){
		Finish();
	}
}


//GENERAL UTILITY FUNCTIONS AND VARIABLES

//PAGE DIMENSION FUNCTIONS
function PageDim(){
//Get the page width and height
	this.W = 600;
	this.H = 400;
	this.W = document.getElementsByTagName('body')[0].clientWidth;
	this.H = document.getElementsByTagName('body')[0].clientHeight;
}

var pg = null;

function GetPageXY(El) {
	var XY = {x: 0, y: 0};
	while(El){
		XY.x += El.offsetLeft;
		XY.y += El.offsetTop;
		El = El.offsetParent;
	}
	return XY;
}

function GetScrollTop(){
	if (typeof(window.pageYOffset) == 'number'){
		return window.pageYOffset;
	}
	else{
		if ((document.body)&&(document.body.scrollTop)){
			return document.body.scrollTop;
		}
		else{
			if ((document.documentElement)&&(document.documentElement.scrollTop)){
				return document.documentElement.scrollTop;
			}
			else{
				return 0;
			}
		}
	}
}

function GetViewportHeight(){
	if (typeof window.innerHeight != 'undefined'){
		return window.innerHeight;
	}
	else{
		if (((typeof document.documentElement != 'undefined')&&(typeof document.documentElement.clientHeight !=
     'undefined'))&&(document.documentElement.clientHeight != 0)){
			return document.documentElement.clientHeight;
		}
		else{
			return document.getElementsByTagName('body')[0].clientHeight;
		}
	}
}

function TopSettingWithScrollOffset(TopPercent){
	var T = Math.floor(GetViewportHeight() * (TopPercent/100));
	return GetScrollTop() + T; 
}

//CODE FOR AVOIDING LOSS OF DATA WHEN BACKSPACE KEY INVOKES history.back()
var InTextBox = false;

function SuppressBackspace(e){ 
	if (InTextBox == true){return;}
	if (C.ie) {
		thisKey = window.event.keyCode;
	}
	else {
		thisKey = e.keyCode;
	}

	var Suppress = false;

	if (thisKey == 8) {
		Suppress = true;
	}

	if (Suppress == true){
		if (C.ie){
			window.event.returnValue = false;	
			window.event.cancelBubble = true;
		}
		else{
			e.preventDefault();
		}
	}
}

if (C.ie){
	document.attachEvent('onkeydown',SuppressBackspace);
	window.attachEvent('onkeydown',SuppressBackspace);
}
else{
	if (window.addEventListener){
		window.addEventListener('keypress',SuppressBackspace,false);
	}
}

function ReduceItems(InArray, ReduceToSize){
	var ItemToDump=0;
	var j=0;
	while (InArray.length > ReduceToSize){
		ItemToDump = Math.floor(InArray.length*Math.random());
		InArray.splice(ItemToDump, 1);
	}
}

function Shuffle(InArray){
	var Num;
	var Temp = new Array();
	var Len = InArray.length;

	var j = Len;

	for (var i=0; i<Len; i++){
		Temp[i] = InArray[i];
	}

	for (i=0; i<Len; i++){
		Num = Math.floor(j  *  Math.random());
		InArray[i] = Temp[Num];

		for (var k=Num; k < (j-1); k++) {
			Temp[k] = Temp[k+1];
		}
		j--;
	}
	return InArray;
}

function WriteToInstructions(Feedback) {
	document.getElementById('InstructionsDiv').innerHTML = Feedback;

}




function EscapeDoubleQuotes(InString){
	return InString.replace(/"/g, '&quot;')
}

function TrimString(InString){
        var x = 0;

        if (InString.length != 0) {
                while ((InString.charAt(InString.length - 1) == '\u0020') || (InString.charAt(InString.length - 1) == '\u000A') || (InString.charAt(InString.length - 1) == '\u000D')){
                        InString = InString.substring(0, InString.length - 1)
                }

                while ((InString.charAt(0) == '\u0020') || (InString.charAt(0) == '\u000A') || (InString.charAt(0) == '\u000D')){
                        InString = InString.substring(1, InString.length)
                }

                while (InString.indexOf('  ') != -1) {
                        x = InString.indexOf('  ')
                        InString = InString.substring(0, x) + InString.substring(x+1, InString.length)
                 }

                return InString;
        }

        else {
                return '';
        }
}

function FindLongest(InArray){
	if (InArray.length < 1){return -1;}

	var Longest = 0;
	for (var i=1; i<InArray.length; i++){
		if (InArray[i].length > InArray[Longest].length){
			Longest = i;
		}
	}
	return Longest;
}

//UNICODE CHARACTER FUNCTIONS
function IsCombiningDiacritic(CharNum){
	var Result = (((CharNum >= 0x0300)&&(CharNum <= 0x370))||((CharNum >= 0x20d0)&&(CharNum <= 0x20ff)));
	Result = Result || (((CharNum >= 0x3099)&&(CharNum <= 0x309a))||((CharNum >= 0xfe20)&&(CharNum <= 0xfe23)));
	return Result;
}

function IsCJK(CharNum){
	return ((CharNum >= 0x3000)&&(CharNum < 0xd800));
}

//SETUP FUNCTIONS
//BROWSER WILL REFILL TEXT BOXES FROM CACHE IF NOT PREVENTED
function ClearTextBoxes(){
	var NList = document.getElementsByTagName('input');
	for (var i=0; i<NList.length; i++){
		if ((NList[i].id.indexOf('Guess') > -1)||(NList[i].id.indexOf('Gap') > -1)){
			NList[i].value = '';
		}
		if (NList[i].id.indexOf('Chk') > -1){
			NList[i].checked = '';
		}
	}
}

//EXTENSION TO ARRAY OBJECT
function Array_IndexOf(Input){
	var Result = -1;
	for (var i=0; i<this.length; i++){
		if (this[i] == Input){
			Result = i;
		}
	}
	return Result;
}
Array.prototype.indexOf = Array_IndexOf;

//IE HAS RENDERING BUG WITH BOTTOM NAVBAR
function RemoveBottomNavBarForIE(){
	if ((C.ie)&&(document.getElementById('Reading') != null)){
		if (document.getElementById('BottomNavBar') != null){
			document.getElementById('TheBody').removeChild(document.getElementById('BottomNavBar'));
		}
	}
}




//HOTPOTNET-RELATED CODE

var HPNStartTime = (new Date()).getTime();
var SubmissionTimeout = 30000;
var Detail = ''; //Global that is used to submit tracking data

function Finish(){
//If there's a form, fill it out and submit it
	if (document.store != null){
		Frm = document.store;
		Frm.starttime.value = HPNStartTime;
		Frm.endtime.value = (new Date()).getTime();
		Frm.mark.value = Score;
		Frm.detail.value = Detail;
		Frm.submit();
	}
}



function Card(ID, OverlapTolerance){
	this.elm=document.getElementById(ID);
	this.name=ID;
	this.css=this.elm.style;
	this.elm.style.left = 0 +'px';
	this.elm.style.top = 0 +'px';
	this.HomeL = 0;
	this.HomeT = 0;
	this.tag=-1;
	this.index=-1;
	this.OverlapTolerance = OverlapTolerance;
}

function CardGetL(){return parseInt(this.css.left)}
Card.prototype.GetL=CardGetL;

function CardGetT(){return parseInt(this.css.top)}
Card.prototype.GetT=CardGetT;

function CardGetW(){return parseInt(this.elm.offsetWidth)}
Card.prototype.GetW=CardGetW;

function CardGetH(){return parseInt(this.elm.offsetHeight)}
Card.prototype.GetH=CardGetH;

function CardGetB(){return this.GetT()+this.GetH()}
Card.prototype.GetB=CardGetB;

function CardGetR(){return this.GetL()+this.GetW()}
Card.prototype.GetR=CardGetR;

function CardSetL(NewL){this.css.left = NewL+'px'}
Card.prototype.SetL=CardSetL;

function CardSetT(NewT){this.css.top = NewT+'px'}
Card.prototype.SetT=CardSetT;

function CardSetW(NewW){this.css.width = NewW+'px'}
Card.prototype.SetW=CardSetW;

function CardSetH(NewH){this.css.height = NewH+'px'}
Card.prototype.SetH=CardSetH;

function CardInside(X,Y){
	var Result=false;
	if(X>=this.GetL()){if(X<=this.GetR()){if(Y>=this.GetT()){if(Y<=this.GetB()){Result=true;}}}}
	return Result;
}
Card.prototype.Inside=CardInside;

function CardSwapColours(){
	var c=this.css.backgroundColor;
	this.css.backgroundColor=this.css.color;
	this.css.color=c;
}
Card.prototype.SwapColours=CardSwapColours;

function CardHighlight(){
	this.css.backgroundColor='#000000';
	this.css.color='#ffffff';
}
Card.prototype.Highlight=CardHighlight;

function CardUnhighlight(){
	this.css.backgroundColor='#ffffff';
	this.css.color='#000000';
}
Card.prototype.Unhighlight=CardUnhighlight;

function CardOverlap(OtherCard){
	var smR=(this.GetR()<(OtherCard.GetR()+this.OverlapTolerance))? this.GetR(): (OtherCard.GetR()+this.OverlapTolerance);
	var lgL=(this.GetL()>OtherCard.GetL())? this.GetL(): OtherCard.GetL();
	var HDim=smR-lgL;
	if (HDim<1){return 0;}
	var smB=(this.GetB()<OtherCard.GetB())? this.GetB(): OtherCard.GetB();
	var lgT=(this.GetT()>OtherCard.GetT())? this.GetT(): OtherCard.GetT();
	var VDim=smB-lgT;
	if (VDim<1){return 0;}
	return (HDim*VDim);	
}
Card.prototype.Overlap=CardOverlap;

function CardDockToR(OtherCard){
	this.SetL(OtherCard.GetR() + 5);
	this.SetT(OtherCard.GetT());
}

Card.prototype.DockToR=CardDockToR;

function CardSetHome(){
	this.HomeL=this.GetL();
	this.HomeT=this.GetT();
}
Card.prototype.SetHome=CardSetHome;

function CardGoHome(){
	this.SetL(this.HomeL);
	this.SetT(this.HomeT);
}

Card.prototype.GoHome=CardGoHome;

//Fix for 6.2.5.2: avoid image dragging problem in draggable cards
function CardSetHTML(HTML){
	this.elm.innerHTML = HTML;
	var DragImgs = this.elm.getElementsByTagName('img');
	if (DragImgs.length > 0){
		for (var i=0; i<DragImgs.length; i++){
			DragImgs[i]. onmousedown = function(){return false;}
		}
	}
}

Card.prototype.SetHTML = CardSetHTML;

function doDrag(e) {
	if (CurrDrag == -1) {return};
	if (C.ie){var Ev = window.event}else{var Ev = e}
	var difX = Ev.clientX-window.lastX; 
	var difY = Ev.clientY-window.lastY; 
	var newX = DC[CurrDrag].GetL()+difX; 
	var newY = DC[CurrDrag].GetT()+difY; 
	DC[CurrDrag].SetL(newX); 
	DC[CurrDrag].SetT(newY);
	window.lastX = Ev.clientX; 
	window.lastY = Ev.clientY; 
	return false;
} 

function beginDrag(e, DragNum) { 
	CurrDrag = DragNum;
	if (C.ie){
		var Ev = window.event;
		document.onmousemove=doDrag;
		document.onmouseup=endDrag;
	}
	else{
		var Ev = e;
		window.onmousemove=doDrag; 
		window.onmouseup=endDrag;
	} 
	DC[CurrDrag].Highlight();
	topZ++;
	DC[CurrDrag].css.zIndex = topZ;
	window.lastX=Ev.clientX; 
	window.lastY=Ev.clientY;
	return false;  
} 

function endDrag(e) { 
	if (CurrDrag == -1) {return};
	DC[CurrDrag].Unhighlight();
	if (C.ie){document.onmousemove=null}else{window.onmousemove=null;}
	onEndDrag();	
	CurrDrag = -1;
//Need a bugfix for Opera focus problem here
	if (C.opera){FocusAButton();}
	return true;
} 

var CurrDrag = -1;
var topZ = 100;





//JMIX DRAG-DROP OUTPUT FORMAT CODE

var Punctuation = '';

var Openers = '';
var CorrectResponse = 'Correcto';
var IncorrectResponse = 'Respuesta Incorrecta';
var ThisMuchCorrect = 'Esta parte de la respuesta es correcta';
var TheseAnswersToo = 'Estas respuestas tambi&#x00E9;n son correctas';
var YourScoreIs = 'Su puntuaci&#x00F3;n es';
var NextCorrect = 'Se ha a&#x00F1;adido una palabra correcta';
var FeedbackWidth = 200; //default
var ExBGColor = '#ffffff';
var PageBGColor = '#e0e0e0';
var TextColor = '#000000';
var TitleColor = '#004080';
var DropTotal = 3; // number of lines that will be available for dropping on
var Gap = 4; //Gap between two segments when they're next to each other on a line
var DropHeight = 30;
var CapitalizeFirst = false;
var CompiledOutput = '';
var TempSegment = '';
var FirstSegment = -1;
var FirstDiv = -1;
var Penalties = 0;
var Score = 0;
var TimeOver = false;

var CurrDrag = -1;
var topZ = 100;
var Cds = new Array();
var L = new Array();
var Finished = false;

var Locked = false;
var DivWidth = 600;
var LeftColPos = 100;
var DragTop = 120;
var DragNumber = -1;
var AnswersTried = '';

Lines = new Array();

function CapFirst(InString){
	var i = 0;
	if ((Openers.indexOf(InString.charAt(i))>-1)||(InString.charAt(i) == ' ')){
		i++;
	}
	if ((Openers.indexOf(InString.charAt(i))>-1)||(InString.charAt(i) == ' ')){
		i++;
	}
	var Temp = InString.charAt(i);
	Temp = Temp.toUpperCase();
	InString = InString.substring(0, i) + Temp + InString.substring(i+1, InString.length);
	return InString;
}

function CheckResults(ChkType){
//Get sequence student has chosen
	GetGuessSequence();

//Compile the answer
	CompiledOutput = CompileString(GuessSequence);

//Check the answer
	CheckAnswer(ChkType);
}

function GetGuessSequence(){
//Put pointers to draggables in arrays based on the lines they're sitting on
	var Drops = new Array();
	for (var i=0; i<L.length; i++){
		Drops[i] = new Array();
	}

	var CardPos = 0;
	
	for (i=0; i<Cds.length; i++){
		for (var j=0; j<L.length; j++){
//Slight modification for 6.0.4: allow some leeway for 1px inaccuracy in card placing by browser.
			CardPos = L[j].GetB() - (Cds[i].GetH()+2);
			if (((Cds[i].GetT() - CardPos) < 4)&&((Cds[i].GetT() - CardPos) > -4)){
				Drops[j][Drops[j].length] = Cds[i];
			}
		}
	}

//Sort the drop arrays based on the Left of each div
	for (i=0; i<Drops.length; i++){
		Drops[i].sort(CompDrags);
	}

//Put the tags into the GuessSequence array
	GuessSequence.length = 0;
	for (i=0; i<Drops.length; i++){
		for (j=0; j<Drops[i].length; j++){
			GuessSequence[GuessSequence.length] = Drops[i][j].tag;
		}
	}

//Set the variable recording which div is first
	var NewFirstDiv = -1;
	for (i=0; i<Drops.length; i++){
		if (Drops[i].length > 0){
			NewFirstDiv = Drops[i][0].index;
			break;
		}
	}
	return NewFirstDiv;
}

function CompDrags(a,b){
	return a.GetL() - b.GetL(); 
}

function FindSegment(SegID){
	var Seg = '';
	for (var i=0; i<Segments.length; i++){
		if (Segments[i][1] == SegID){
			Seg = Segments[i][0];
			break;
		}
	}
	return Seg;
}

function CompileString(InArray){
	var OutString = '';
	var i = 0;
	OutArray = new Array();

	for (i=0; i<InArray.length; i++){
		OutArray[OutArray.length] = FindSegment(InArray[i]);
	}

	if (OutArray.length > 0){
		OutString = OutArray[0];
	}
	else{
		OutString = '';
	}
	var Spacer = '';

	for (i=1; i<OutArray.length; i++){
		Spacer = ' ';
		if ((Openers.indexOf(OutString.charAt(OutString.length-1)) > -1)||(Punctuation.indexOf(OutArray[i].charAt(0)) > -1)){
			Spacer = '';
		}
		OutString = OutString + Spacer + OutArray[i];		
	}

//Capitalize the first letter if necessary
	if (CapitalizeFirst == true){
		OutString = CapFirst(OutString);
	}
	return OutString;
}

function CheckAnswer(CheckType){
	if (Locked == true){return;}
	if (GuessSequence.length < 1){
		if (CheckType == 1){
			Penalties++;
			ShowMessage(NextCorrect + '<br /><br />' + FindSegment(Answers[0][0]));
		}
		return;
	}
	var i = 0;
	var j = 0;
	var k = 0;
	var WellDone = '';
	var WhichCorrect = -1;
	var TryAgain = '';
	var LongestCorrectBit = '';
	TempCorrect = new Array();
	LongestCorrect = new Array();
	var TempHint = '';
	var HintToReturn = 1;
	var OtherAnswers = '';
	var AllDone = false;

	for (i=0; i<Answers.length; i++){
		TempCorrect.length = 0;
		for (j=0; j<Answers[i].length; j++){
			if (Answers[i][j] == GuessSequence[j]){
				TempCorrect[j] = GuessSequence[j];
			}
			else{
				TempHint = Answers[i][j];
				break;
			}
		}
		if ((TempCorrect.length == GuessSequence.length)&&(TempCorrect.length == Answers[i].length)){
			WhichCorrect = i;
			break;
		}
		else{
			if (TempCorrect.length > LongestCorrect.length){
				LongestCorrect.length = 0;
				for (k=0; k<TempCorrect.length; k++){
					LongestCorrect[k] = TempCorrect[k];
				}
				HintToReturn = TempHint;
			} 
		}	
	}
	if (WhichCorrect > -1){
		AllDone = true;
		for (i=0; i<Answers.length; i++){
			if (i!=WhichCorrect){
				OtherAnswers += '<br />' + CompileString(Answers[i]);
			}
		}
		WellDone = '<span class="CorrectAnswer">' + CompiledOutput + '</span><br /><br />' + CorrectResponse + '<br />';
		
		if (AnswersTried.length > 0){AnswersTried += ' | ';}
		AnswersTried += CompiledOutput;

//Do score calculation here
		Score = Math.floor(((Segments.length-Penalties) * 100)/Segments.length);
		WellDone += YourScoreIs + ' ' + Score + '%.<br />';


		if (OtherAnswers.length > 0){
			WellDone += TheseAnswersToo + '<span class="CorrectAnswer">' + OtherAnswers + '</span>';
		}


		ShowMessage(WellDone);
		WriteToInstructions(YourScoreIs + ' ' + Score + '%.');
	}

	else{
		var WrongGuess = CompileString(GuessSequence);
		if (AnswersTried.length > 0){AnswersTried += ' | ';}
		AnswersTried += WrongGuess;
		TryAgain = '<span class="Guess">' + WrongGuess + '</span><br /><br />';
		if ((CheckType == 0)||(LongestCorrect.length==0)){
			TryAgain += IncorrectResponse + '<br />';
		}

		if (LongestCorrect.length > 0){
			LongestCorrectBit = CompileString(LongestCorrect);
			GuessSequence.length = LongestCorrect.length;
			TryAgain += '<br />' + ThisMuchCorrect + '<br /><span class="Guess">' + LongestCorrectBit + '</span><br />';
		}

		if (CheckType == 1){
			TryAgain += '<br />' + NextCorrect + '<br />' + FindSegment(HintToReturn);
		}
		

		if (TimeOver == true){
			Score = Math.floor(((LongestCorrect.length-Penalties) * 100)/Segments.length);
			if (Score < 0){Score = 0;}
			TryAgain += YourScoreIs + ' ' + Score + '%.<br />';
		}

		Penalties++; //Penalty for inaccurate check
		ShowMessage(TryAgain);
	}
	
//If the exercise is over, deal with that
	if ((AllDone == true)||(TimeOver == true)){


		window.clearInterval(Interval);

		TimeOver = true;
		Locked = true;
		Finished = true;
		setTimeout('Finish()', SubmissionTimeout);
		WriteToInstructions(YourScoreIs + ' ' + Score + '%.'); 
	}
	

}


var Segments = new Array();
Segments[0] = new Array();
Segments[0][0] = '\u0063\u006F\u006E\u0073\u0075\u006D\u0069\u0064\u006F\u0073';
Segments[0][1] = 8;
Segments[0][2] = 0;
Segments[1] = new Array();
Segments[1][0] = '\u0075\u0074\u0069\u006C\u0069\u007A\u0061\u0064\u006F\u0073';
Segments[1][1] = 10;
Segments[1][2] = 0;
Segments[2] = new Array();
Segments[2][0] = '\u0061\u0072\u0063\u0068\u0069\u0076\u006F\u0073';
Segments[2][1] = 5;
Segments[2][2] = 0;
Segments[3] = new Array();
Segments[3][0] = '\u0075\u0073\u0075\u0061\u0072\u0069\u006F\u0073';
Segments[3][1] = 13;
Segments[3][2] = 0;
Segments[4] = new Array();
Segments[4][0] = '\u0053\u0065\u0072\u0076\u0069\u0064\u006F\u0072';
Segments[4][1] = 1;
Segments[4][2] = 0;
Segments[5] = new Array();
Segments[5][0] = '\u006D\u0061\u006E\u0065\u006A\u0061\u006E';
Segments[5][1] = 4;
Segments[5][2] = 0;
Segments[6] = new Array();
Segments[6][0] = '\u0061\u0072\u0063\u0068\u0069\u0076\u006F';
Segments[6][1] = 3;
Segments[6][2] = 0;
Segments[7] = new Array();
Segments[7][0] = '\u0070\u0061\u0072\u0061';
Segments[7][1] = 6;
Segments[7][2] = 0;
Segments[8] = new Array();
Segments[8][0] = '\u0070\u006F\u0072';
Segments[8][1] = 11;
Segments[8][2] = 0;
Segments[9] = new Array();
Segments[9][0] = '\u006C\u006F\u0073';
Segments[9][1] = 12;
Segments[9][2] = 0;
Segments[10] = new Array();
Segments[10][0] = '\u0073\u0065\u0072';
Segments[10][1] = 7;
Segments[10][2] = 0;
Segments[11] = new Array();
Segments[11][0] = '\u0064\u0065';
Segments[11][1] = 2;
Segments[11][2] = 0;
Segments[12] = new Array();
Segments[12][0] = '\u006F';
Segments[12][1] = 9;
Segments[12][2] = 0;


var GuessSequence = new Array();

var Answers = new Array();
Answers[0] = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13);
Answers[1] = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13);


function doDrag(e) {
	if (CurrDrag == -1) {return};
	if (C.ie){var Ev = window.event}else{var Ev = e}
	var difX = Ev.clientX-window.lastX; 
	var difY = Ev.clientY-window.lastY; 
	var newX = Cds[CurrDrag].GetL()+difX; 
	var newY = Cds[CurrDrag].GetT()+difY; 
	Cds[CurrDrag].SetL(newX); 
	Cds[CurrDrag].SetT(newY);
	window.lastX = Ev.clientX; 
	window.lastY = Ev.clientY; 
	return false;
} 

function beginDrag(e, DragNum) { 
	CurrDrag = DragNum;
	if (C.ie){
		var Ev = window.event;
		document.onmousemove=doDrag;
		document.onmouseup=endDrag;
	}
	else{
		var Ev = e;
		window.onmousemove=doDrag; 
		window.onmouseup=endDrag;
	} 
	Cds[CurrDrag].SwapColours();
	topZ++;
	Cds[CurrDrag].css.zIndex = topZ;
	window.lastX=Ev.clientX; 
	window.lastY=Ev.clientY;
	return true;  
} 

function endDrag(e) { 
	if (CurrDrag == -1) {return};
	Cds[CurrDrag].SwapColours();
	if (C.ie){document.onmousemove=null}else{window.onmousemove=null;}
	onEndDrag();	
	CurrDrag = -1;
	return true;
} 

function onEndDrag(){
//Snap to lines
	var i = 0;
	var SnapLine = Cds[CurrDrag].GetT();
	var BiggestOverlap = -1;
	var OverlapRect = 0;
	for (i=0; i<L.length; i++){
		if (Cds[CurrDrag].Overlap(L[i]) > OverlapRect){
			OverlapRect = Cds[CurrDrag].Overlap(L[i]);
			BiggestOverlap = i;
		}
	}
	if (BiggestOverlap > -1){
		SnapLine = L[BiggestOverlap].GetB() - (Cds[CurrDrag].GetH() + 2);
		Cds[CurrDrag].SetT(SnapLine);
		CheckOver(-1);
	}
	if (CapitalizeFirst==true){
		setTimeout('DoCapitalization()', 50);
	}
}

//Following function modified for 6.2.5.2; avoids image dragging bug.
function DoCapitalization(){
//Capitalize first segment if necessary
	var FD = GetGuessSequence();
	if ((FD == -1)&&(FirstDiv > -1)){
		Cds[FirstDiv].SetHTML(Segments[FirstDiv][0]);
	}
	if (((FD != FirstDiv)&&(CapitalizeFirst == true))&&(FD > -1)){
		if (FirstDiv > -1){
			Cds[FirstDiv].SetHTML(Segments[FirstDiv][0]);
		}
	}
	if ((FD > -1)&&(CapitalizeFirst == true)){
		var Temp = CapFirst(Segments[FD][0]);
		Cds[FD].SetHTML(Temp);
		FirstDiv = FD;
	}
}

function CheckOver(NoMove){
//This recursive function spreads out the Cards on a line if two of them are overlapping;
//if the spread operation moves one beyond the end of a line, it wraps it to the next line.
	for (var i=0; i<Cds.length; i++){
		for (var j=0; j<Cds.length; j++){
			if (i!=j){
				if (Cds[i].Overlap(Cds[j]) > 0){
					if ((i==NoMove)||(Cds[i].GetL() < Cds[j].GetL())){
						Cds[j].DockToR(Cds[i]);
						if (Cds[j].GetR() > (LeftColPos + DivWidth)){
							Cds[j].SetL(LeftColPos);
							Cds[j].SetT(Cds[j].GetT() + DropHeight);
						}
						CheckOver(j);
					}
					else{
						Cds[i].DockToR(Cds[j]);
						if (Cds[i].GetR() > (LeftColPos + DivWidth)){
							Cds[i].SetL(LeftColPos);
							Cds[i].SetT(Cds[i].GetT() + DropHeight);
						}
						CheckOver(i);	
					}
				}
			}	
		}
	}
}

function StartUp(){







	Segments = Shuffle(Segments);

//Calculate page dimensions and positions
	pg = new PageDim();
	DivWidth = Math.floor((pg.W*4)/5);
	LeftColPos = Math.floor(pg.W/10);
	DragTop = parseInt(document.getElementById('CheckButtonDiv').offsetHeight) + parseInt(document.getElementById('CheckButtonDiv').offsetTop) + 10;

	var CurrTop = DragTop + 10;

//Position the drop divs
	for (var i=0; i<DropTotal; i++){
		L[i] = new Card('Drop' + i, 0);
		L[i].SetT(CurrTop)
		L[i].tag = CurrTop-5;
		L[i].SetL(LeftColPos);
		L[i].css.backgroundColor = '#e0e0e0';
		CurrTop += L[i].GetH();
		topZ++;
		L[i].css.zIndex = topZ;
	}
	DropHeight = L[0].GetH();

	CurrTop = DragTop;
	var TempInt = 0;
	var DropHome = 0;

	for (i=0; i<Segments.length; i++){
//Create a new pointer in the C array to ref the card div
		Cds[i] = new Card('D'+i, 0);
//Fix for 6.2.5.2 image dragging bug
		Cds[i].SetHTML(Segments[i][0]);
		//Cds[i].elm.innerHTML = Segments[i][0]; //Old version
		Cds[i].SetT(CurrTop);
		Cds[i].SetL(LeftColPos);
		Cds[i].css.cursor = 'move';
		TempInt = Cds[i].GetH();
		CurrTop = CurrTop + TempInt + 5;
		Cds[i].css.backgroundColor = '#ffffff';
		Cds[i].css.color = '#000000';
		topZ++;
		Cds[i].css.zIndex = topZ;
		Cds[i].tag = Segments[i][1];
		Cds[i].index = i;
	}
//Place them at the bottom of the page
	SetInitialPositions();


	StartTimer();

}

function SetInitialPositions(){
//Places all the divs at the bottom of the page in centred rows
//First, get the vertical position of the first row
	var RTop = L[L.length-1].GetB() + 10;

//Create an array to hold the numbers of Cards for each row
	CRows = new Array();
	CRows[0] = new Array();
	Widths = new Array();
	var i=0;
	var r=0;
	var RowWidth=0;
//Sort the Cards into rows, storing their numbers in the array

	while (i<Cds.length){
//if it fits on this row, add it
		if ((RowWidth + Cds[i].GetW() + 5) < DivWidth){
			CRows[r][CRows[r].length] = i;
			RowWidth += Cds[i].GetW() + 5;
//Store the width in the Widths array for later
			Widths[r] = RowWidth;
		}
//if not, increment the row number, and add it to the next row
		else{
			r++;
			CRows[r] = new Array();
			CRows[r][CRows[r].length] = i;
			RowWidth = Cds[i].GetW() + 5;
//Store the width in the Widths array for later
			Widths[r] = RowWidth;
		}
//move to the next Card
		i++;
	}
//Now we have the numbers in rows, set out each row
	r=0;
	var Indent=0;
	for (r=0; r<CRows.length; r++){
//Get the required indent for this row
		Indent = Math.floor((DivWidth-Widths[r])/2);
//Set the first card in position
		Cds[CRows[r][0]].SetL(Indent + LeftColPos);
		Cds[CRows[r][0]].SetT(RTop);
		Cds[CRows[r][0]].SetHome();
		for (i=1; i<CRows[r].length; i++){
			Cds[CRows[r][i]].DockToR(Cds[CRows[r][i-1]]);
			Cds[CRows[r][i]].SetHome();
		}
//Increment the row height
		RTop += Cds[0].GetH() + 5;
	}
}

function TimerStartUp(){
	setTimeout('StartUp()', 300);
}


function TimesUp() {
	document.getElementById('Timer').innerHTML = 'El tiempo Termino';

	TimeOver = true;
	CheckAnswer(0);
	Locked = true;

}






//CODE FOR HANDLING TIMER
//Timer code
var Seconds = 600;
var Interval = null;

function StartTimer(){
	Interval = window.setInterval('DownTime()',1000);
	document.getElementById('TimerText').style.display = 'inline';
}

function DownTime(){
	var ss = Seconds % 60;
	if (ss<10){
		ss='0' + ss + '';
	}

	var mm = Math.floor(Seconds / 60);

	if (document.getElementById('Timer') == null){
		return;
	}

	document.getElementById('TimerText').innerHTML = mm + ':' + ss;
	if (Seconds < 1){
		window.clearInterval(Interval);
		TimeOver = true;
		TimesUp();
	}
	Seconds--;
}






//-->

//]]>


