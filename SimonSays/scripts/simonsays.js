
function SimonSays()
{
	var score = 0;

	var colors = ["green", "red", "blue", "yellow"];
	var currentColors = []; //["red", "green"];//, "red", "blue", "yellow"];
	var currentColorIndex = 0;

	var isListening = true;

	var SPEED_MS = 1000;
	var NEXT_COLOR_PAUSE_MS = 1000;

	// ---------------------------------------------

	this.gameStart = function (participants)
	{
		$("#score-board").html('<h1>' + 'Can you beat Simon?' + '</h1><br /><p>Push a button to start...</p>').css("display","block");
		updateScore();


		for (var p = 0; p < participants.length; p++) {

			var cp = participants[p];

			cp.gameController.gamepadPressed = function (left, up, right, down) {
				
				if ($("#score-board").css("display") != "none") {
					console.log("Hiding Score-Board");
					$("#score-board").hide();
					isListening = false;

					score = 0;
					currentColorIndex = 0;
					currentColors = [];

					showNextColor();
				}
				else if (isListening) {
					console.log("Checking key!");

					if (left)		//a
					{
						if (checkCurrentColor("green"))
							greenPad();
						else
							gameOver();
					}
					else if (up)	//w
					{
						if (checkCurrentColor("red"))
							redPad();
						else
							gameOver();
					}
					else if (right)	//d
					{
						if (checkCurrentColor("blue"))
							bluePad();
						else
							gameOver();
					}
					else if (down)	//s
					{
						if (checkCurrentColor("yellow"))
							yellowPad();
						else
							gameOver();
					}

					if (currentColorIndex == currentColors.length) {
						score++;
						showNextColor();
					}
				}
				else {
					console.log("Is NOT Listening!");
				}
				
			};

			cp.gameController.gamepadReleased = function (left, up, right, down) {
		
				if (isListening)
					hidePads();
			
			};

		}

		partyMachineParticipantControllerSelectors.assignParticipants(participants);
	    	
	}

	// ---------------------------------------------

	function updateScore()
	{
		//$("#score").html('Poäng: ' + score).css("display","block");
		$("#score").html(score).css("display","block");
	}

	function checkCurrentColor(colorName)
	{
		console.log("checkCurrentColor: " + colorName);

		var isCurrentColor = false;

		if(currentColors.length != 0)
			isCurrentColor = currentColors[currentColorIndex] == colorName;

		console.log("checkCurrentColor: " + isCurrentColor);

		currentColorIndex++;

		return isCurrentColor;
	}

	function showNextColor()
	{
		var rnd = Math.floor(Math.random()*4);
		console.log("Next color rnd: " + rnd);
		var nextColor = colors[rnd];
		console.log("Next color: " + nextColor);

		currentColors.push(nextColor);

		isListening = false;
		currentColorIndex = 0;

		updateScore();

		window.setTimeout("simonSays.loopColors()", NEXT_COLOR_PAUSE_MS);
	}

	this.loopColors = function()
	{
		var color = currentColors[currentColorIndex];

		switch(color)
		{
			case "green":
				greenPad();
				break;
			case "red":
				redPad();
				break;
			case "blue":
				bluePad();
				break;
			case "yellow":
				yellowPad();
				break;
		}

		currentColorIndex++;

		if(currentColorIndex > currentColors.length)
		{
			hidePads();
			isListening = true;
			currentColorIndex = 0;

			console.log("Is Listening!");
		}
		else
		{
			window.setTimeout("simonSays.loopColorsPause()", SPEED_MS);
		}
	}

	this.loopColorsPause = function()
	{
		hidePads();
		window.setTimeout("simonSays.loopColors()", 100);
	}

	function hidePads()
	{
		$("#green, #red, #blue, #yellow").css("display","none");
	}

	function greenPad()
	{
		$("#red, #blue, #yellow").css("display","none");
		$("#green").css("display","block");
		soundGreen.play();
		//playSound('snd_g.mp3');
	}

	function redPad()
	{
		$("#green, #blue, #yellow").css("display","none");
		$("#red").css("display","block");
		soundRed.play();
		//playSound('snd_r.mp3');
	}

	function bluePad()
	{
		$("#red, #green, #yellow").css("display","none");
		$("#blue").css("display","block");
		soundBlue.play();
		//playSound('snd_b.mp3');
	}

	function yellowPad()
	{
		$("#red, #blue, #green").css("display","none");
		$("#yellow").css("display","block");
		soundYellow.play();
		//playSound('snd_y.mp3');
	}

	function playSound(path)
	{
		var audio = document.createElement('AUDIO');
		audio.src = 'snd/' + path;
		audio.play();
	}

	function gameOver()
	{
		$("#score-board").css("display","block");
		if (score == 0)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>Wtf???<br />Drink 5 beers!</p>');
		else if (score == 1)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>You suck!<br />Drink 4 beers!</p>');
		else if (score == 2)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>FFS?!<br />Drink 3 beers!</p>');
		else if (score == 3)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>How drunk are you?!<br />Drink 2 more beers!</p>');
		else if (score == 4)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>Lol, really bad!<br />Drink 2 beers! And scream like a pig</p>');
		else if (score == 5)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>Ok, you are not she sharpest knife are you?<br />Have a beer!</p>');
		else if (score == 6)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>You are not smart, but not so dumb either?<br />Choose one at the party that has to chug a beer!</p>');
		else if (score == 7)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>Booring score...<br />Nothing happens</p>');
		else if (score == 8)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>Wow, good job!<br />Everybody at the party (except you) have to drink a beer!</p>');
		else if (score == 9)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>WOOT, not bad at all!<br />Everybody at the party (except you) have to drink 2 beers!</p>');
		else if (score == 10)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>Awsome! You are the sensei of awsome brains!<br />Everybody (except you) have to drink 3 beers!</p>');
		else if (score > 10)
			$("#score-board").html('<h1>' + 'You got ' + (score) + ' points!' + '</h1><br /><p>Your a fucking MASTER!<br />Everybody (you too) must have a beer!</p>');
		setTimeout('partyMachine.exit()', 10000);
	}
}