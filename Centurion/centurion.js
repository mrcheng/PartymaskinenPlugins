
// SETTINGS
var totalShots = 0;
var shotDelay = 0; // delay between shots in seconds
var secs = 0;
var msecs = 0;
var shotSize = 0;

var shotsLeft = 0;

// COUNTERS
var printCounter = 0;
var secTimer = 0;
var secTimer2 = 0;

function playSound(path) {
	var audio = document.createElement('AUDIO');
	audio.autoplay = true;
	audio.src = path;
	audio.play();
}

function startTimer() {

	totalShots = 16;
	shotDelay = 60;
	secs = shotDelay;
	msecs = 0;
	shotSize = 0.03;
	
	// Start time
	var clock = new Date();
	var hours = addZero(clock.getHours());
	var minutes = addZero(clock.getMinutes());
	$('#startTime').html(hours + ":" + minutes);

	// Stop time
	var hours2 = hours; var minutes2 = minutes;
	var totalTime = (totalShots * shotDelay) / 60;
	for (var i = totalTime; i > 0; i--) {
		if (minutes2 == 59) {
			minutes2 = 0;
			if (hours2 == 23) { hours2 = 0; }
			else { hours2++; }
		}
		else { minutes2++; }
	}
	hours2 = addZero(hours2);
	minutes2 = addZero(minutes2);
	$('#stopTime').html(hours2 + ":" + minutes2);

	shotsLeft = totalShots;
	print();

}

function print() {
	if (shotsLeft > 0) {
		
		shotsLeft--;
		
		// Stats on page
		$('#shotsleft').html(shotsLeft);
		$('#shotsdone').html(totalShots - shotsLeft);

		printTimer = setTimeout('print(' + totalShots + ', ' + shotsLeft + ');', shotDelay * 1000);

		// Secods timer
		if (shotsLeft > 0) {
			playSound('buzz.mp3');
			$('#secs').className = "normalcounter";
			clearTimeout(secTimer);
			clearTimeout(secTimer2);
			secs = shotDelay;
			msecs = 0;
			var secTimer = seconds();
		}

	}
}

function addZero(x) {
	return (x > 9) ? x : '0' + x;
}

function seconds() {
	if (msecs <= 0) {
		msecs = 9;
		secs -= 1;
	}
	if (secs == shotDelay / 10) {
		$('#secs').addClass("redcounter");
	}
	if (secs <= -1) {
		msecs = 0;
		secs += 1;
	}
	else {
		msecs -= 1;
	}

	$('#secs').html(secs + "." + msecs);
	if (!(secs == 0 && msecs == 0)) {
		secTimer2 = setTimeout("seconds()", 100);
	}
} 

