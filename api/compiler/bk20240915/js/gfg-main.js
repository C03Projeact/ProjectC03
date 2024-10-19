var submission_id = null;
var req_count = 0;
const max_req_count = 50;
const editor_max_length = 100000;

var adImage = {
	"C_big": "https://media.geeksforgeeks.org/img-practice/Successful-Future-with-c-1672898931.gif",
	"C_small": "https://media.geeksforgeeks.org/img-practice/Successful-Future-with-c-1672898931.gif",
	"C_href": "https://practice.geeksforgeeks.org/courses/c-foundation?utm_source=ide&utm_medium=course_c_programming&utm_campaign=inbound_promotions",
	"Cpp_big": "https://media.geeksforgeeks.org/img-practice/CPP(300x600)-1672918468.gif",
	"Cpp_small": "https://media.geeksforgeeks.org/img-practice/CPP(300x600)-1672918468.gif",
	"Cpp_href": "https://practice.geeksforgeeks.org/courses/cpp-programming-basic-to-advanced?utm_source=ide&utm_medium=course_cpp_programming&utm_campaign=inbound_promotions",
	"Cpp14_big": "https://media.geeksforgeeks.org/img-practice/CPP(300x600)-1672918468.gif",
	"Cpp14_small": "https://media.geeksforgeeks.org/img-practice/CPP(300x600)-1672918468.gif",
	"Cpp14_href": "https://practice.geeksforgeeks.org/courses/cpp-programming-basic-to-advanced?utm_source=ide&utm_medium=course_cpp_programming&utm_campaign=inbound_promotions",
	"Csharp_big": "https://media.geeksforgeeks.org/img-practice/CPP(300x600)-1672918468.gif",
	"Csharp_small": "https://media.geeksforgeeks.org/img-practice/CPP(300x600)-1672918468.gif",
	"Csharp_href": "https://practice.geeksforgeeks.org/courses/cpp-programming-basic-to-advanced?utm_source=ide&utm_medium=course_cpp_programming&utm_campaign=inbound_promotions",
	"Java_big": "https://media.geeksforgeeks.org/img-practice/Java-1672922856.gif",
	"Java_small": "https://media.geeksforgeeks.org/img-practice/Java-1672922856.gif",
	"Java_href": "https://practice.geeksforgeeks.org/courses/Java-Programming-basic-to-advanced?utm_source=ide&utm_medium=course_java_programming&utm_campaign=inbound_promotions",
	"Perl_big": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Perl_small": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Perl_href": "https://practice.geeksforgeeks.org/courses/Python-Foundation?utm_source=ide&utm_medium=course_python_programming&utm_campaign=inbound_promotions",
	"Php_big": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Php_small": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Php_href": "https://practice.geeksforgeeks.org/courses/Python-Foundation?utm_source=ide&utm_medium=course_python_programming&utm_campaign=inbound_promotions",
	"Python_big": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Python_small": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Python_href": "https://practice.geeksforgeeks.org/courses/Python-Foundation?utm_source=ide&utm_medium=course_python_programming&utm_campaign=inbound_promotions",
	"Python3_big": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Python3_small": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Python3_href": "https://practice.geeksforgeeks.org/courses/Python-Foundation?utm_source=ide&utm_medium=course_python_programming&utm_campaign=inbound_promotions",
	"Scala_big": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Scala_small": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Scala_href": "https://practice.geeksforgeeks.org/courses/Python-Foundation?utm_source=ide&utm_medium=course_python_programming&utm_campaign=inbound_promotions",
	"Swift_big": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Swift_small": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Swift_href": "https://practice.geeksforgeeks.org/courses/Python-Foundation?utm_source=ide&utm_medium=course_python_programming&utm_campaign=inbound_promotions",
	"Rust_big": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Rust_small": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Rust_href": "https://practice.geeksforgeeks.org/courses/Python-Foundation?utm_source=ide&utm_medium=course_python_programming&utm_campaign=inbound_promotions",
	"Golang_big": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Golang_small": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Golang_href": "https://practice.geeksforgeeks.org/courses/Python-Foundation?utm_source=ide&utm_medium=course_python_programming&utm_campaign=inbound_promotions",
	"R_big": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"R_small": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"R_href": "https://practice.geeksforgeeks.org/courses/Python-Foundation?utm_source=ide&utm_medium=course_python_programming&utm_campaign=inbound_promotions",
	"Nodejs_big": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Nodejs_small": "https://media.geeksforgeeks.org/img-practice/Python-1672989593.gif",
	"Nodejs_href": "https://practice.geeksforgeeks.org/courses/Python-Foundation?utm_source=ide&utm_medium=course_python_programming&utm_campaign=inbound_promotions"
};

$(document).ready(function () {
	var editor = null;
	if ($("#editor").length)
		editor = ace.edit('editor')

	var the = localStorage.getItem('theme');
	if (the == null || the == 'light') {
		loadLight();
	} else {
		loadDark();
	}

	$(".themeLight").click(function () {
		loadLight();
	});

	$(".themeDark").click(function () {
		loadDark();
	});

	function loadLight() {
		localStorage.setItem('theme', 'light');
		// $( "body" ).css( "background-color", "#fff" );
		// $( ".gb" ).css( "background-color", "" ); //gray back
		// $( ".wf" ).css( "color", "" ); //white fore
		// $( ".bb" ).css( "background-color", "" ); //black back
		$(".g-recaptcha").attr("data-theme", "light");
		$(".jumbotron").css("background-color", "");
		var themeImgLight = document.getElementById('themeLight')
		themeImgLight.style.display = 'none'
		var themeImgDark = document.getElementById('themeDark')
		themeImgDark.style.display = 'unset'

		if (editor != null) {
			editor.setTheme("ace/theme/chrome");
		}
	}

	function loadDark() {
		localStorage.setItem('theme', 'dark');
		// $( "body" ).css( "background-color", "#000" );
		// $( ".gb" ).css( "background-color", "#2F2F2F" ); //gray back
		// $( ".wf" ).css( "color", "#FFFFFF" ); //white fore
		// $( ".bb" ).css( "background-color", "#000000" ); //black back
		$(".g-recaptcha").attr("data-theme", "dark");
		$(".jumbotron").css("background-color", "#2A2A2A");
		var themeImgDark = document.getElementById('themeDark')
		themeImgDark.style.display = 'none'
		var themeImgLight = document.getElementById('themeLight')
		themeImgLight.style.display = 'unset'

		if (editor != null) {
			editor.setTheme("ace/theme/vibrant_ink");
		}
	}

	if (editor == null) {
		return;
	}
	//auto and live completion 
	ace.require("ace/ext/language_tools");
	editor.setOptions({
		enableBasicAutocompletion: true,
		enableSnippets: true,
		enableLiveAutocompletion: true
	});
	//end
	editor.$blockScrolling = Infinity;
	//disables vertical line in ace editor
	editor.setOption("showPrintMargin", false);

	var tabSize = 4;
	var tabCode = [];
	var tabLang = [];
	var tabVis = [];
	var currentTab = 0;
	editor.focus();

	var norOps = {
		minLines: 25,
		maxLines: null,
		fontSize: "12pt"
	};

	var fullOps = {
		minLines: null,
		maxLines: null
	};

	editor.setOptions(norOps);

	function toggleFullScreen() {
		var elem = document.getElementById("editor");
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.msRequestFullscreen) {
			elem.msRequestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen();
		}
	}
	$("#full").click(function () {
		toggleFullScreen();
	});


	$("#splitScreen").click(function () {
		if ($(window).width() > 768) {
			if ($("#splitScreen span").hasClass('glyphicon-resize-full')) {
				$(".leftDiv").append($(".mainleftDiv"));
				$(".rightDiv").append($('.mainRightDiv'));
				$(".screen").hide();
				$(".fullScreen").show();
				$("#splitScreen span").removeClass('glyphicon-resize-full');
				$("#splitScreen span").addClass('glyphicon-resize-small');

				$("#splitScreen")
					.attr('title', 'Single Screen');

				$("body").css('overflow-x', 'hidden');
				$(".inputDiv").css('margin-left', '-75px');
				$("#inputDivClass").removeClass('col-sm-7');
				$(".buttonDiv").css('margin-left', '-75px');
				$(".inputRunDiv").css('display', 'grid');
				$(".mainRightDiv").css('margin-left', '15px');
				$("#codeBlock").css('padding-left', '60px');
			} else if ($("#splitScreen span").hasClass('glyphicon-resize-small')) {
				$(".normalScreen").append($(".mainleftDiv"));
				$(".normalScreen").append($(".mainRightDiv"));
				$(".leftDiv").empty();
				$(".rightDiv").empty();
				$(".fullScreen").hide();
				$(".screen").show();
				$("#splitScreen span").removeClass('glyphicon-resize-small');
				$("#splitScreen span").addClass('glyphicon-resize-full');

				$("#splitScreen")
					.attr('title', 'Split Screen');

				$(".inputDiv").css('margin-left', '');
				$("#inputDivClass").addClass('col-sm-7');
				$(".buttonDiv").css('margin-left', '');
				$(".inputRunDiv").css('display', 'unset');
				$(".mainRightDiv").css('margin-left', '-45px');
				$("#codeBlock").css('padding-left', '40px');
			}
		}
		else {
			$(".mainRightDiv").css('margin-left', '15px');
		}
	});

	$(document).on('keyup', function (evt) {
		if (evt.keyCode == 27 && $("#splitScreen span").hasClass('glyphicon-resize-small')) {
			$(".normalScreen").append($(".mainleftDiv"));
			$(".normalScreen").append($(".mainRightDiv"));
			$(".leftDiv").empty();
			$(".rightDiv").empty();
			$(".fullScreen").hide();
			$(".screen").show();
			$("#splitScreen span").removeClass('glyphicon-resize-small');
			$("#splitScreen span").addClass('glyphicon-resize-full');

			$("#splitScreen")
				.attr('title', 'Split Screen');

			$(".inputDiv").css('margin-left', '');
			$("#inputDivClass").addClass('col-sm-7');
			$(".buttonDiv").css('margin-left', '');
			$("#codeBlock").css('padding-left', '40px');
		} else if (evt.keyCode == 27 && $("body").hasClass("fullScreen")) {
			toggleFullScreen();
			e.preventDefault();
		}
	});



	/*	$(".ace_editor").keydown(function(e) {
			if( e.which == 122 || ( e.which == 27 && $( "body" ).hasClass( "fullScreen" ) ) ) {
				toggleFullScreen();
				e.preventDefault();
			}
		}); */

	var defaultC = '#include <stdio.h>\n\nint main() {\n\t//code\n\tprintf("Hello World !");\n\treturn 0;\n}';
	var defaultCPP = '#include <iostream>\nusing namespace std;\n\nint main() {\n\tcout<<"GfG!";\n\treturn 0;\n}';
	var defaultJava = '/*package whatever //do not write package name here */\n\nimport java.io.*;\n\nclass GFG {\n\tpublic static void main (String[] args) {\n\t\tSystem.out.println("GfG!");\n\t}\n}';
	var defaultPython = '#code\nprint("GfG")';
	var defaultCs = 'using System;\n\npublic class GFG{\n\tstatic public void Main (){\n\t\t//Code\n\t}\n}';
	var defaultScala = 'object Main {\n\tdef main(args: Array[String]) {\n\t\t//Code\n\t}\n}';
	var defaultPerl = '#!/usr/bin/perl\n# your code here\n';
	var defaultPhp = '<?php\n\t//code\n?>';
	var defaultSwift = 'print("GFG")';
	var defaultRust = 'fn main(){\n\tprintln!("GFG!");\n}';
	var defaultGolang = 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("GFG")\n}';
	var defaultR = 'print("GFG")';
	var defaultJS = 'console.log("GFG");';

	function insertTemplate() {
		console.log('language -> ', language)
		var text = editor.session.getValue();
		if (language == 'C') {
			editor.session.setMode("ace/mode/c_cpp");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultRust || text == defaultR || text == defaultGolang || text == defaultSwift) {
				editor.session.setValue(defaultC);
			}
		} else if (language == 'Cpp' || language == 'Cpp14') {
			editor.session.setMode("ace/mode/c_cpp");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultRust || text == defaultR || text == defaultGolang || text == defaultSwift) {
				editor.session.setValue(defaultCPP);
			}
		} else if (language == 'Java') {
			editor.session.setMode("ace/mode/java");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultRust || text == defaultR || text == defaultGolang || text == defaultSwift) {
				editor.session.setValue(defaultJava);
			}
		} else if (language == 'Python' || language == 'Python3') {
			editor.session.setMode("ace/mode/python");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultRust || text == defaultR || text == defaultGolang || text == defaultSwift) {
				editor.session.setValue(defaultPython);
			}
		} else if (language == 'Csharp') {
			editor.session.setMode("ace/mode/csharp");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultRust || text == defaultR || text == defaultGolang || text == defaultSwift) {
				editor.session.setValue(defaultCs);
			}
		} else if (language == 'Scala') {
			editor.session.setMode("ace/mode/scala");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultRust || text == defaultR || text == defaultGolang || text == defaultSwift) {
				editor.session.setValue(defaultScala);
			}
		} else if (language == 'Perl') {
			editor.session.setMode("ace/mode/perl");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultRust || text == defaultR || text == defaultGolang || text == defaultSwift) {
				editor.session.setValue(defaultPerl);
			}
		} else if (language == 'Php') {
			editor.session.setMode("ace/mode/php");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultRust || text == defaultR || text == defaultGolang || text == defaultSwift) {
				editor.session.setValue(defaultPhp);
			}
		} else if (language == 'Nodejs') {
			editor.session.setMode("ace/mode/javascript");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultRust || text == defaultR || text == defaultGolang || text == defaultSwift) {
				editor.session.setValue(defaultJS);
			}
		} else if (language == 'Golang') {
			editor.session.setMode("ace/mode/golang");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultGolang || text == defaultRust || text == defaultR || text == defaultSwift) {
				editor.session.setValue(defaultGolang);
			}
		} else if (language == 'R') {
			editor.session.setMode("ace/mode/r");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultR || text == defaultRust || text == defaultGolang || text == defaultSwift) {
				editor.session.setValue(defaultR);
			}
		} else if (language == 'Swift') {
			editor.session.setMode("ace/mode/swift");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultSwift || text == defaultRust || text == defaultR || text == defaultGolang) {
				editor.session.setValue(defaultSwift);
			}
		} else if (language == 'Rust') {
			editor.session.setMode("ace/mode/rust");
			if (text === '' || text == defaultJava || text == defaultCPP || text == defaultC || text == defaultPython || text == defaultCs || text == defaultScala || text == defaultPerl
				|| text == defaultPhp || text == defaultJS || text == defaultRust || text == defaultGolang || text == defaultR || text == defaultSwift) {
				editor.session.setValue(defaultRust);
			}

		}
		tabCode[currentTab] = editor.session.getValue();
		insertAd();
	}

	function insertAd() {
		var currentDate = new Date();
		var endDate = new Date("2023-01-11 00:00:00");

		var adElem = document.createElement("a");
		adElem.setAttribute('href', adImage[language + '_href']);
		adElem.setAttribute('target', "_blank");
		adElem.style.position = "relative";
		var imageElem = document.createElement("img");
		imageElem.className = 'img-responsive';

		if (currentDate < endDate) {
			var adRibbonDiv = document.createElement("div");
			adRibbonDiv.className = 'ribbon';
			var adRibbonSpan = document.createElement("span");
			adRibbonSpan.style.right = "0";
			var adRibbonText = document.createTextNode("Save 20%");
			adRibbonSpan.append(adRibbonText)
			adRibbonDiv.append(adRibbonSpan)
			adElem.append(adRibbonDiv)
		}

		if (window.innerWidth <= 768) {
			imageElem.src = adImage[language + '_small'];
		}
		else if (window.innerWidth > 768) {
			imageElem.src = adImage[language + '_big'];
		}

		if (!window.onresize) {
			window.onresize = () => {
				if (window.innerWidth <= 768) {
					imageElem.src = adImage[language + '_small'];
				}
				else if (window.innerWidth > 768) {
					imageElem.src = adImage[language + '_big'];
				}
				adElem.append(imageElem)
				$('#div-ide-img').empty();
				$('#div-ide-img').append(adElem);
			};
		};

		adElem.append(imageElem)
		$('#div-ide-img').empty();
		$('#div-ide-img').append(adElem);
	}

	var data = [];
	data = getSessionStorage(language, tabSize);
	if (data.length == 0) data = getLocalStorage(language, tabSize);

	console.log('data -> ', data);
	var tabCounter = data[0];
	currentTab = data[1] || 0;
	tabCode = data[2] || [];
	tabLang = data[3] || [];
	tabVis = data[4] || [];

	var valid = true;
	if (!tabCounter) valid = false;
	else {
		if (tabVis[currentTab] == false || tabVis[0] == false) valid = false;
		for (var i = 1; i < tabSize; i++) {
			if (tabVis[i] == true && tabVis[i - 1] == false) {
				valid = false;
				break;
			}
		}
	}
	if (!valid) {
		for (var i = 1; i < tabSize; i++) {
			tabVis[i] = false;
		}
		tabCode[0] = '';
		tabLang[0] = tabLang[0] || language || 'C';
		tabVis[0] = true;
		currentTab = 0;
		setPageTitleHeading(tabLang[0])
	}
	tabVis[currentTab] = true;
	if (tabLang[currentTab] == '') tabLang[currentTab] = 'C';
	if (!tabCounter || tabCounter == 0) tabCounter = 1;
	var text = editor.session.getValue();
	if (text != '') {
		for (var i = 1; i < tabSize; i++) {
			tabVis[i] = false;
		}
		tabCode[0] = text;
		tabLang[0] = language;
		tabVis[0] = true;
		currentTab = 0;
		tabCounter = 1;
	} else {
		language = tabLang[currentTab];
	}
	if (tabCode[currentTab] != '') {
		editor.session.setValue(tabCode[currentTab]);
	}
	currentTabId = 'tab' + currentTab
	$(`div[id=${currentTabId}]`).css({ 'border-left': '1.5px solid #adadad', 'border-right': '1.5px solid #adadad', 'border-top': '1.5px solid #adadad', 'background-color': '#ebebeb' });
	$(`div[id=${currentTabId}]`).css({ 'border-bottom': 'none' });
	$('#tab' + currentTab + ' > .closeTab').css({ 'background-color': '#ebebeb' });
	insertTemplate();
	for (var i = 0; i < tabSize; i++) {
		if (tabVis[i]) {
			elem = 'tab' + i
			$(`div[id=${elem}]`).show();
		}
		else break;
	}
	if (tabCounter == tabSize) $('#addTab').fadeOut();
	if (tabCounter == 1) $('.closeTab').fadeOut();
	$('#addTab').click(function () {
		if (tabCounter >= tabSize) { alert("Can't add more tabs!"); return; }
		$('div#tab' + tabCounter).show();
		tabCode[tabCounter] = '';
		tabLang[tabCounter] = language;
		tabVis[tabCounter] = true;
		tabCode[currentTab] = editor.session.getValue();
		tabLang[currentTab] = language;
		$('div#tab' + tabCounter + ' > .text').text($('[l=' + tabLang[tabCounter] + ']').html());
		$('div#tab' + currentTab).css({ 'border-left': '1px solid #adadad', 'border-right': '1px solid #adadad', 'border-top': '1px solid #adadad', 'background-color': '#ffffff' });
		$('div#tab' + currentTab).css({ 'border-bottom': '2px solid #adadad' });
		$('div#tab' + currentTab + ' > .closeTab').css({ 'background-color': '#ffffff' });
		currentTab = tabCounter;
		$('div#tab' + currentTab).css({ 'border-left': '1.5px solid #adadad', 'border-right': '1.5px solid #adadad', 'border-top': '1.5px solid #adadad', 'background-color': '#ebebeb' });
		$('div#tab' + currentTab).css({ 'border-bottom': 'none' });
		$('div#tab' + currentTab + ' > .closeTab').css({ 'background-color': '#ebebeb' });
		language = tabLang[tabCounter];
		editor.session.setValue(tabCode[i]);
		insertTemplate();
		$(".lang").css("background-color", "#ffffff");
		$(".lang").css("color", "#000000");
		$("[l=" + language + "]").css("background-color", "#39B54A");
		$("[l=" + language + "]").css("color", "#000000");
		tabCounter++;
		if (tabCounter == tabSize) {
			$('#addTab').fadeOut();
		}
		$('.closeTab').fadeIn();
	});

	function addTabFn() {
		if (tabCounter >= tabSize) { alert("Can't add more tabs!"); return; }
		$('div#tab' + tabCounter).show();
		tabCode[tabCounter] = '';
		tabLang[tabCounter] = language;
		tabVis[tabCounter] = true;
		tabCode[currentTab] = editor.session.getValue();
		tabLang[currentTab] = language;
		$('div#tab' + tabCounter + ' > .text').text($('[l=' + tabLang[tabCounter] + ']').html());
		$('div#tab' + currentTab).css({ 'border-left': '1px solid #adadad', 'border-right': '1px solid #adadad', 'border-top': '1px solid #adadad', 'background-color': '#ffffff' });
		$('div#tab' + currentTab).css({ 'border-bottom': '2px solid #adadad' });
		$('div#tab' + currentTab + ' > .closeTab').css({ 'background-color': '#ffffff' });
		currentTab = tabCounter;
		$('div#tab' + currentTab).css({ 'border-left': '1.5px solid #adadad', 'border-right': '1.5px solid #adadad', 'border-top': '1.5px solid #adadad', 'background-color': '#ebebeb' });
		$('div#tab' + currentTab).css({ 'border-bottom': 'none' });
		$('div#tab' + currentTab + ' > .closeTab').css({ 'background-color': '#ebebeb' });
		language = tabLang[tabCounter];
		editor.session.setValue(tabCode[i]);
		insertTemplate();
		$(".lang").css("background-color", "#ffffff");
		$(".lang").css("color", "#000000");
		$("[l=" + language + "]").css("background-color", "#39B54A");
		$("[l=" + language + "]").css("color", "#000000");
		tabCounter++;
		if (tabCounter == tabSize) {
			$('#addTab').fadeOut();
		}
		$('.closeTab').fadeIn();
	}

	$('.closeTab').click(function () {
		if (tabCounter == 1) {
			alert('Can\'t close this tab!');
			return;
		}
		var name = parseInt($(this).attr('name'));
		console.log('name -> ', name);
		var tmp = name;
		tabCode[currentTab] = editor.session.getValue();
		tabLang[currentTab] = language;
		for (var i = name + 1; i < tabSize; i++) {
			if (tabVis[i]) {
				tabVis[name] = true;
				tabCode[name] = tabCode[i];
				tabLang[name] = tabLang[i];
				$('div#tab' + name + ' > .text').text($('[l=' + tabLang[i] + ']').html());
				name++;
			}
		}
		$('div#tab' + name).hide();
		tabVis[name] = false;
		$('div#tab' + currentTab).css({ 'border-left': '1px solid #adadad', 'border-right': '1px solid #adadad', 'border-top': '1px solid #adadad', 'background-color': '#ffffff' });
		$('div#tab' + currentTab).css({ 'border-bottom': '2px solid #adadad' });
		$('div#tab' + currentTab + ' > .closeTab').css({ 'background-color': '#ffffff' });
		if (parseInt(tabCounter) == parseInt(currentTab) + 1) currentTab--;
		$('div#tab' + currentTab).css({ 'border-left': '1.5px solid #adadad', 'border-right': '1.5px solid #adadad', 'border-top': '1.5px solid #adadad', 'background-color': '#ebebeb' });
		$('div#tab' + currentTab).css({ 'border-bottom': 'none' });
		$('div#tab' + currentTab + ' > .closeTab').css({ 'background-color': '#ebebeb' });
		language = tabLang[currentTab];
		editor.session.setValue(tabCode[currentTab]);
		insertTemplate();
		$(".lang").css("background-color", "#ffffff");
		$(".lang").css("color", "#000000");
		$("[l=" + language + "]").css("background-color", "#39B54A");
		$("[l=" + language + "]").css("color", "#000000");
		tabCounter--;
		if (tabCounter == 1) $('.closeTab').fadeOut();
		$('#addTab').fadeIn();
	});

	function closeTabFn() {
		if (tabCounter == 1) {
			alert('Can\'t close this tab!');
			return;
		}
		var name = 0;
		var tmp = name;
		tabCode[currentTab] = editor.session.getValue();
		tabLang[currentTab] = language;
		for (var i = name + 1; i < tabSize; i++) {
			if (tabVis[i]) {
				tabVis[name] = true;
				tabCode[name] = tabCode[i];
				tabLang[name] = tabLang[i];
				$('div#tab' + name + ' > .text').text($('[l=' + tabLang[i] + ']').html());
				name++;
			}
		}
		$('div#tab' + name).hide();
		tabVis[name] = false;
		$('div#tab' + currentTab).css({ 'border-left': '1px solid #adadad', 'border-right': '1px solid #adadad', 'border-top': '1px solid #adadad', 'background-color': '#ffffff' });
		$('div#tab' + currentTab).css({ 'border-bottom': '2px solid #adadad' });
		$('div#tab' + currentTab + ' > .closeTab').css({ 'background-color': '#ffffff' });
		if (parseInt(tabCounter) == parseInt(currentTab) + 1) currentTab--;
		$('div#tab' + currentTab).css({ 'border-left': '1.5px solid #adadad', 'border-right': '1.5px solid #adadad', 'border-top': '1.5px solid #adadad', 'background-color': '#ebebeb' });
		$('div#tab' + currentTab).css({ 'border-bottom': 'none' });
		$('div#tab' + currentTab + ' > .closeTab').css({ 'background-color': '#ebebeb' });
		language = tabLang[currentTab];
		editor.session.setValue(tabCode[currentTab]);
		insertTemplate();
		$(".lang").css("background-color", "#ffffff");
		$(".lang").css("color", "#000000");
		$("[l=" + language + "]").css("background-color", "#39B54A");
		$("[l=" + language + "]").css("color", "#000000");
		tabCounter--;
		if (tabCounter == 1) $('.closeTab').fadeOut();
		$('#addTab').fadeIn();
	}

	$('.tab').click(function (e) {
		if (e.target.tagName != 'DIV') return;
		var id = $(this).attr('name');
		tabCode[currentTab] = editor.session.getValue();
		tabLang[currentTab] = language;
		$('div#tab' + currentTab).css({ 'border-left': '1px solid #adadad', 'border-right': '1px solid #adadad', 'border-top': '1px solid #adadad', 'background-color': '#ffffff' });
		$('div#tab' + currentTab).css({ 'border-bottom': '2px solid #adadad' });
		$('div#tab' + currentTab + ' > .closeTab').css({ 'background-color': '#ffffff' });
		currentTab = id;
		$('div#tab' + currentTab).css({ 'border-left': '1.5px solid #adadad', 'border-right': '1.5px solid #adadad', 'border-top': '1.5px solid #adadad', 'background-color': '#ebebeb' });
		$('div#tab' + currentTab).css({ 'border-bottom': 'none' });
		$('div#tab' + currentTab + ' > .closeTab').css({ 'background-color': '#ebebeb' });
		language = tabLang[currentTab];
		editor.session.setValue(tabCode[currentTab]);
		insertTemplate();
		$(".lang").css("background-color", "#ffffff");
		$(".lang").css("color", "#000000");
		$("[l=" + language + "]").css("background-color", "#39B54A");
		$("[l=" + language + "]").css("color", "#000000");
	});

	$(window).unload(function () {
		const editorText = editor.session.getValue().replace(/\s/g, '')
		if (editorText.length > editor_max_length) {
			window.alert("Maximum character limit is " + editor_max_length);
			return;
		}

		tabCode[currentTab] = editor.session.getValue();
		tabLang[currentTab] = language;

		setSessionStorage(currentTab, tabCode, tabLang, tabVis, tabSize);
		setLocalStorage(currentTab, tabCode, tabLang, tabVis, tabSize);
	});
	//add tabs section  ends here

	$("[l=" + language + "]").css("background-color", "#39B54A");
	$("[l=" + language + "]").css("color", "#000000");
	$('div#tab' + currentTab + ' > .text').text($('[l=' + language + ']').html());

	function getExtension() {
		if (language == 'C') return 'c';
		if (language == 'Cpp' || language == 'Cpp14') return 'cpp';
		if (language == 'Java') return 'java';
		if (language == 'Python' || language == 'Python3') return 'py';
		if (language == 'Scala') return 'scala';
		if (language == 'Php') return 'php';
		if (language == 'Perl') return 'perl';
		if (language == 'Csharp') return 'cs';
		if (language == 'Nodejs') return 'js';
		if (language == 'Swift') return 'swift';
		if (language == 'R') return 'r';
		if (language == 'Rust') return 'rs';
		if (language == 'Golang') return 'go';
	}
	$("#saveFile").add('#saveFileSmallScreen').click(function () {
		var saver = document.createElement('a');
		saver.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(editor.getSession().getValue()));
		saver.setAttribute('download', 'code.' + getExtension());
		saver.style.display = 'none';
		document.body.appendChild(saver);
		saver.click();
		document.body.removeChild(saver);
		return false;
	});

	$("#reset").add('#reset1').click(function () {
		editor.getSession().setValue('');
		insertTemplate();
		return false;
	});

	var isSubmissionQueued = false;

	// function to display code execution result
	function displayResult(this1, data) {
		isSubmissionQueued = false;
		console.log('data.compResult -> ', data.compResult)
		if (data.errorCode != "" && data.errorCode != null) {
			// If comiplation fails
			if (data.compResult && data.compResult == 'F') {
				// If compilation Error present then display it other wise a custom message.
				if (data.cmpError != "" && data.cmpError != null) {
					// Show compilation errors.
					$(".cmp").show();
					$(".cmp pre").text(data.cmpError);
				}
				else {
					// Show compilation errors.
					$(".cmp").show();
					$(".cmp pre").text("Compilation Error occured!!!");
				}
			}
			else if (data.errorCode == "OLE") {
				$(".war").show();
				$(".war pre").text(data.rntError);
				$(".out").show();
			}
			else {
				$(".rnt").show();
				$(".rnt pre").text(data.rntError);
			}
		}
		else {
			$(".stats").show();
			$(".stats .time").text(data.time);
			$(".stats .memory").text(data.memory);
			$(".out").show();
		}
		if (data.output != "" && data.output != null) {
			$(".out pre").text(data.output);
			$(".out").show();
		} else {
			$(".out pre").text('No Output');
			$(".out").show();
		}

		// If run+url was clicked the data will have a unique id
		if (data.save == true) {
			var permaLink = cdnUrl + 'online-' + language.toLowerCase() + '-compiler/' + data.submission_id;
			$(".url pre").text(permaLink);
			$(".url").show();
			window.history.replaceState(null, "", permaLink);

			this1.html('<span class="glyphicon glyphicon-chevron-right"></span> <b>Run+URL (Generates URL as well)</b>');
			this1.removeAttr("disabled");
		} else {
			$("#run").html('<span class="glyphicon glyphicon-chevron-right"></span> <b>Run</b>');
			$("#run").removeAttr("disabled");
		}

		$("html, body").animate({ scrollTop: $(".sbt-group").offset().top + 60 }, "slow");

	}


	$("#run, #runurl").click(function () {
		const editorText = editor.session.getValue().replace(/\s/g, '')
		if (editorText.length > editor_max_length) {
			window.alert("Maximum character limit is " + editor_max_length);
			return;
		}

		tabCode[currentTab] = editor.session.getValue();
		tabLang[currentTab] = language;

		setSessionStorage(currentTab, tabCode, tabLang, tabVis, tabSize);
		setLocalStorage(currentTab, tabCode, tabLang, tabVis, tabSize);

		if (isSubmissionQueued != false) {
			if (confirm("You have one request in queue already. Are you sure you want to make another submission?")) {
				$("#runurl").html('<span class="glyphicon glyphicon-chevron-right"></span> <b>Run+URL (Generates URL as well)</b>');
				$("#run").html('<span class="glyphicon glyphicon-chevron-right"></span> <b>Run</b>');
				$("#runurl").removeAttr("disabled");
				$("#run").removeAttr("disabled");
				clearInterval(subResult);
			} else {
				return;
			}
		}

		// prepare for output to display
		this1 = $(this);
		$(this).html('<span class="glyphicon glyphicon-refresh refreshIcon"></span> <b>Request Queued</b>');
		$(this).attr("disabled", "disabled");
		$("html, body").animate({ scrollBottom: $(document).height() }, "slow");
		$(".cmp").hide();
		$(".rnt").hide();
		$(".out").hide();
		$(".war").hide();
		$("#linkDiv").hide();
		$(".stats").hide();
		$(".url").hide();
		isSubmissionQueued = true;

		// prepare payload
		languageData = language.toLowerCase();
		if (languageData == "nodejs") {
			languageData = "js";
		}
		if (languageData == "golang") {
			languageData = "go";
		}
		data = {
			language: languageData,
			code: editor.getSession().getValue(),
			input: $("#input").val(),
			save: (this1.attr("id") == "run") ? false : true,
		}

		// submit request
		console.log(ide_backend_url);

		let codeId = language == 'C' ? "50" : "71"
		var settings = {
			"url": "https://moderator.adaface.com/compile",
			"method": "POST",
			"timeout": 0,
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			"data": {
				"language_id": codeId,
				"source_code": editor.getSession().getValue(),
				"stdin": ""
			}
		};

		$.ajax(settings).done(function (response) {
			console.log(response);
			let data = null;
			if (response.responseToSend.error) {
				data = {
					output: null,
					errorCode: "RTE",
					rntError: response.responseToSend.stdout,
					compResult: "s",
				}
			} else {
				data = {
					output: response.responseToSend.stdout,
					errorCode: "",
					rntError: "",
					compResult: "s",
				}
			}

			displayResult(this1, data);
		});

		return false;
		$.ajax({
			type: "POST",
			// url: ide_backend_url + "submit-request",
			url: "api/compiler.php",
			data: { 'data': JSON.stringify(data) },
			success: function (data) {
				data = JSON.parse(data)
				displayResult(this1, data);

				return;

				// check for status
				if (data.status == "success") {
					// update submission_id
					submission_id = data.submission_id;
					// Set interval polling for request status
					var interval = setInterval(function () {
						req_count++;
						// GET - get-status/{submission_id}
						$.ajax({
							type: "GET",
							url: ide_backend_url + 'get-status/' + submission_id,
							success: function (data) {
								// check for status
								if (data.status == "in-queue") {
									// console the data
								}
								else {
									// call function displayResult
									displayResult(this1, data);

									clearInterval(interval);
									// reset req_count
									req_count = 0;
								}
							},
							error: function (jqXHR, exception, errorThrown) {
								this1.html('<span class="glyphicon glyphicon-chevron-right"></span> <b>Run</b>');
								$(".err").show().delay(5000).slideUp(200, function () {
									$(this).hide();
								});
								isSubmissionQueued = false;
								clearInterval(interval);
							}
						});
						// Check for maximum tries for status
						if (req_count >= max_req_count) {
							req_count = 0;
							clearInterval(interval);
						}
					}, 1500);
				}
			},
			error: function (jqXHR, exception, errorThrown) {
				this1.html('<span class="glyphicon glyphicon-chevron-right"></span> <b>Run</b>');
				$(".err").show().delay(5000).slideUp(200, function () {
					$(this).hide();
				});
				isSubmissionQueued = false;
				$("html, body").animate({ scrollTop: $(".sbt-group").offset().top + 60 }, "slow");
			}
		});

		return false;
	});

	// var subResult;
	// var isSubmissionQueued = false;

	// function getSubmissionsResults( id ) {
	// 	$.ajax({
	//             	type: "POST",
	//                 url: '/submissionResult.php',
	//     	        data: { sid:id, requestType:'fetchResults', save:save },
	// 		dataType: "json",
	//             	success: function(data) {
	// 			if(data['status'] == 'SUCCESS') {
	// 				clearInterval(subResult);
	// 	        	        isSubmissionQueued = false;

	// 				var stats = "";
	// 				if( data.rntError != "" && data.rntError != null ) {
	// 					$( ".rnt" ).show();
	// 					$( ".rnt pre" ).text( data.rntError );
	// 				}
	// 				if( data.cmpError != "" && data.cmpError != null  ) {
	// 					if( data.compResult == "F" ){
	// 						$( ".cmp" ).show();
	// 						$( ".cmp pre" ).text( data.cmpError );
	// 					}else{
	// 						$( ".war" ).show();
	// 						$( ".war pre" ).text( data.cmpError );
	// 					}
	// 				}
	// 				$( ".stats" ).show();
	// 				$( ".stats .time" ).text( data.time );
	// 				$( ".stats .memory" ).text( data.memory );
	// 				$( ".out" ).show();
	// 				if( data.output != "" && data.output != null ) {
	// 					$( ".out pre" ).text( data.output );
	// 				} else {
	// 					$( ".out pre" ).text( 'No Output' );
	// 				}
	// 				$("html, body").animate({ scrollTop: $(".sbt-group").offset().top + 60 }, "slow");
	// 				if ( save == true ) {
	// 	                                 $("#runurl").html('<span class="glyphicon glyphicon-chevron-right"></span> <b>Run+URL (Generates URL as well)</b>');
	//              			         $("#runurl").removeAttr( "disabled" );
	// 					 if( data.hasOwnProperty('id') ) {
	// 	                                        var permaLink = (data.id !=null && data.id != '') ? 'https://ide.geeksforgeeks.org/' + data.id : 'Problem in generating URL. If you are facing this issue consistently,pls contact support@geeksforgeeks.org';
	//             		                        $( ".url pre" ).text( permaLink );
	//                             		        $( ".url" ).show();
	// 	                                        if(data.id !=null && data.id != '') {
	//             		                                history.pushState( null, "", permaLink );
	//                             		        }
	//                             		}
	// 				} else {
	// 	                                 $("#run").html('<span class="glyphicon glyphicon-chevron-right"></span> <b>Run</b>');
	//              			         $("#run").removeAttr( "disabled" );
	// 				} 


	// 			}

	// 		},
	// 		error: function(jqXHR, exception, errorThrown) {
	//                     },
	//                     complete: function() {
	//                     }
	// 	});
	// }

	// var save = false;

	// $("#run, #runurl").click(function() {
	// 	if ( isSubmissionQueued != false ) {
	//             if ( confirm ("You have one request in queue alraedy. Are you sure you want to make another submission?") ) {
	// 	        $("#runurl").html('<span class="glyphicon glyphicon-chevron-right"></span> <b>Run+URL (Generates URL as well)</b>');
	// 	        $("#run").html('<span class="glyphicon glyphicon-chevron-right"></span> <b>Run</b>');
	// 			$("#runurl").removeAttr( "disabled" );
	// 			$("#run").removeAttr( "disabled" );
	//     	    	clearInterval(subResult);
	//             } else {
	//     	        return;
	//         	    }
	//     	}
	// 	this1 = $(this);
	// 	$(this).html('<span class="glyphicon glyphicon-refresh refreshIcon"></span> <b>Request Queued</b>');
	// 	$(this).attr( "disabled", "disabled" );
	// 	$("html, body").animate({ scrollBottom: $(document).height() }, "slow");
	// 	$( ".cmp" ).hide();
	// 	$( ".rnt" ).hide();
	// 	$( ".out" ).hide();
	// 	$( ".war" ).hide();
	// 	$( "#linkDiv" ).hide();
	// 	$( ".stats" ).hide();
	// 	$( ".url" ).hide();
	// 	isSubmissionQueued = true;
	// 	save = (this1.attr("id") == "run") ? false: true;
	// 	$.ajax({
	// 		type: "POST",
	// 		url: 'main.php',
	// 		data: { lang: language, code: editor.getSession().getValue(), input: $( "#input" ).val(), save: save },
	// 		dataType: "json",
	// 		success: function( response ) {
	// 	                if ( response['status'] == "ERROR" ) {
	// 				$( ".out" ).show();
	//             			isSubmissionQueued = false;
	// 	                    	$( ".out pre" ).html( response['message'] );
	//             		} else if(response['status'] == 'SUCCESS') {
	// 				    subResult = setInterval(function() { getSubmissionsResults(response['sid']); }, 2000);
	// 			}

	// 		},
	// 		error: function(jqXHR, exception, errorThrown) {
	// 			var btnText = (save == false)?"Run":"Run+URL (Generates URL as well)";
	// 			this1.html('<span class="glyphicon glyphicon-chevron-right"></span> <b>'+btnText+'</b>');
	// 			this1.removeAttr( "disabled" );
	//                 	$( ".err" ).show().delay(5000).slideUp(200, function() {
	// 				$(this).hide();
	// 			});
	// 		}
	// 	});
	// 	return false;
	// });

	//copy to clipboard section
	//copy code from editor
	function setTooltip(btn, message) {
		$(btn).tooltip('hide')
			.attr('data-original-title', message)
			.tooltip('show');
	}

	function hideTooltip(btn) {
		$(btn).tooltip('hide')
			.attr('data-original-title', 'Copy');
	}

	var copyBtn = document.getElementById('btnEditor');
	var clipboard = new Clipboard(copyBtn, {
		text: function () {
			return editor.session.getValue();
		}
	});
	//change copy to copied for 2 secs
	clipboard.on('success', function (event) {
		event.clearSelection();

		setTooltip(event.trigger, 'Copied!');

		window.setTimeout(function () {
			hideTooltip(event.trigger);
		}, 2000);
	});

	clipboard.on('error', function (event) {
		setTooltip(event.trigger, 'Copy Failed!');
		hideTooltip(event.trigger);
	});

	//copy input
	var clipboard = new Clipboard('.btnInput', {
		text: function () {
			return document.getElementById('input').value;
		}
	});

	clipboard.on('success', function (event) {
		event.clearSelection();
		event.trigger.textContent = 'Copied';
		window.setTimeout(function () {
			event.trigger.textContent = 'Copy';
		}, 2000);
	});

	//copy output
	var clipboard = new Clipboard('.btnOutput', {
		text: function () {
			return document.getElementById('preOutput').innerHTML;
		}
	});

	clipboard.on('success', function (event) {
		event.clearSelection();
		event.trigger.textContent = 'Copied';
		window.setTimeout(function () {
			event.trigger.textContent = 'Copy';
		}, 2000);
	});

	//copy link
	var clipboard = new Clipboard('.btnLink', {
		text: function () {
			return document.getElementById('preLink').innerHTML;
		}
	});

	clipboard.on('success', function (event) {
		event.clearSelection();
		event.trigger.textContent = 'Copied';
		window.setTimeout(function () {
			event.trigger.textContent = 'Copy';
		}, 2000);
	});

	var campaignLink = "?utm_source=ide&utm_medium=referral&utm_campaign=ide_free_courses";
	var courseCard = {
		"C":
		{
			"name": "Placement 100",
			"image": "https://cdnpractice.geeksforgeeks.org/images/courses/P100_IDE.png",
			"url": "https://practice.geeksforgeeks.org/courses/placement-100-2019/"
		},
		"Cpp":
		{
			"name": "Placement 100",
			"image": "https://cdnpractice.geeksforgeeks.org/images/courses/P100_IDE.png",
			"url": "https://practice.geeksforgeeks.org/courses/placement-100-2019/"
		},
		"Python":
		{
			"name": "Placement 100",
			"image": "https://cdnpractice.geeksforgeeks.org/images/courses/P100_IDE.png",
			"url": "https://practice.geeksforgeeks.org/courses/placement-100-2019/"
		},
		"Java":
		{
			"name": "Placement 100",
			"image": "https://cdnpractice.geeksforgeeks.org/images/courses/P100_IDE.png",
			"url": "https://practice.geeksforgeeks.org/courses/placement-100-2019/"
		}
	}

	var courseUrl = "https://practice.geeksforgeeks.org/courses";
	courseTemplate(language);
	function courseTemplate(Lang) {
		$(".exploreCard").show();
		//$(".courseSubText").show();
		if (Lang == "C") {
			$(".courseImage").attr("src", courseCard["C"]["image"]);
			$(".courseName").text(courseCard["C"]["name"]);
			courseUrl = courseCard["C"]["url"];
		} else if (Lang == "Cpp" || Lang == "Cpp14") {
			$(".courseImage").attr("src", courseCard["Cpp"]["image"]);
			$(".courseName").text(courseCard["Cpp"]["name"]);
			courseUrl = courseCard["Cpp"]["url"];
		} else if (Lang == "Python" || Lang == "Python3") {
			$(".courseImage").attr("src", courseCard["Python"]["image"]);
			$(".courseName").text(courseCard["Python"]["name"]);
			courseUrl = courseCard["Python"]["url"];
		} else if (Lang == "Java") {
			$(".courseImage").attr("src", courseCard["Java"]["image"]);
			$(".courseName").text(courseCard["Java"]["name"]);
			courseUrl = courseCard["Java"]["url"];
		} else {
			$(".courseName").text("Placement 100");
			$(".courseImage").attr("src", "https://cdnpractice.geeksforgeeks.org/images/courses/P100_IDE.png");
			courseUrl = "https://practice.geeksforgeeks.org/courses/placement-100-2019/";
			//$('.exploreCard').hide();
			//$(".courseSubText").hide();
		}
	}
	$(".lang").click(function () {
		var selectLang = $(this).attr("l");
		courseTemplate(selectLang);
	});

	$(".courseCard").click(function () {
		window.location = courseUrl + campaignLink;
	});

	$(".exploreCard").click(function () {
		window.location = "https://practice.geeksforgeeks.org" + campaignLink;
	});

	addTabFn()
	setTimeout(() => {
		closeTabFn()
	}, 100);

});

// ctrl+enter key combination for run program code
$('body').keydown(function (e) {
	if (e.ctrlKey && e.keyCode == 13) {
		// Ctrl-Enter pressed
		$('#run').click();
	}
});

$("#shortkeys").click(function (e) {
	$("#shortkeysModal").modal('show');
});


function openGuestLoginModal() {
	if (jQuery('.header--sidebar').find('.header--nav__item').find('.login-modal-btn').length) {
		function openModalforGuests() {
			setTimeout(function () {
				jQuery('.header--sidebar').find('.header--nav__item').find('.login-modal-btn').trigger('click');
			}, 5000)
		}

		function setCookie() {
			var guest = document.cookie.indexOf('guest=');
			if (guest == -1) {
				date = new Date();
				date.setTime(date.getTime() + (2 * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
				document.cookie = "guest=yes" + expires + "; path=/";
				openModalforGuests()
			}
		}
		var callGuestModal = !1;
		if (localStorage.getItem('guestPageCount')) {
			localStorage.setItem('guestPageCount', parseInt(localStorage.getItem('guestPageCount')) + 1);
			if (parseInt(localStorage.getItem('guestPageCount')) > 2) {
				callGuestModal = !0;
				localStorage.removeItem('guestPageCount')
			}
		} else if (!localStorage.getItem('guestPageCount') && document.cookie.indexOf('guest=') == -1) {
			localStorage.setItem('guestPageCount', 1)
		}
		if (callGuestModal) {
			setCookie()
		}
		if (!callGuestModal) {
			setTimeout(function () {
				setCookie()
			}, 20000)
		}
	}
}


$(document).ready(function () {
	openGuestLoginModal();
	$('[data-toggle="popover"]').popover();
})


