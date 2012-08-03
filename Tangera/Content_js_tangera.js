
function createTangera() {

	(function (tangera, $, undefined) {
		var contenders;
		var suites = ['c', 'd', 'h', 's'];
		var ranks = ['2', '3', '4', '5', '6', '7', '8', '9', 't', 'j', 'q', 'k', 'a'];
		var deck = [];
		var smallImgPath = 'Content_img_cards_small_';
		var audioSupported = !!document.createElement('audio').play;
		var cardsDrawn = 0;
		var currentCard;
		var exitAfterCardTimeout = 18000;
		var rules = [];

		var ruleCount = 0;
		rules[ruleCount++] = 'Shout "SK≈≈≈≈≈≈L!" before drinking';
		rules[ruleCount++] = "No pointing!";
		rules[ruleCount++] = "Only nicknames from now on!";
		rules[ruleCount++] = 'You may not address other people using "You"';
		rules[ruleCount++] = "Drink with your opposite mainhand!";

		var scoreRanks = [];
		scoreRanks['a'] = function () { chug(1); };
		scoreRanks['2'] = function () { chug(2); };
		scoreRanks['3'] = function () { chug(3); };
		scoreRanks['4'] = function () { chug(4); };
		scoreRanks['5'] = function () { chug(5); };
		scoreRanks['6'] = function () { snuff(); };
		scoreRanks['7'] = function () { smoke(); };
		scoreRanks['8'] = function () { rule(); };
		scoreRanks['9'] = function () { category(); };
		scoreRanks['t'] = function () { waterfall(); };
		scoreRanks['j'] = function () { chug(10); };
		scoreRanks['q'] = function () { scream(); };
		scoreRanks['k'] = function () { spirits(); };

		function getRandom(max) {

			var m = new MersenneTwister();
			var rnd = (m.genrand_int31() % max);

			return rnd;
		}

		function getRandomParticipant() {
			if (!contenders || contenders.length <= 0) {
				return null;
			}

			var chosenIndex = getRandom(contenders.length);
			var chosenOne = contenders[chosenIndex];

			return chosenOne;
		}

		function playSound(soundId) {
			if (audioSupported) {
				var snd = $(soundId);
				if (snd.length > 0) {
					snd.get(0).play();
				}
			}
		}

		function shuffle() {
			for (var i = 0; i < deck.length; ++i) {
				var r = i + Math.floor(Math.random() * (52 - i));
				var temp = deck[i];
				deck[i] = deck[r];
				deck[r] = temp;
			}

			playSound("#shuffle");
		}

		tangera.init = function (participants) {
			contenders = participants;

			for (var i = 0; i < ranks.length; ++i) {
				for (var j = 0; j < suites.length; ++j) {
					deck[i * suites.length + j] = ranks[i] + suites[j];
				}
			}

			shuffle();

			playSound("#background");

		};

		tangera.getCard = function () {
			deal();
		};

		tangera.makeVisible = function (elemId) {
			$(elemId).show();
			playSound("#card_drop");
		};

		function deal() {

			currentCard = null;

			var cardImg = $("#currentCard");

			cardImg.attr("src", smallImgPath + "back-blue.png");
			cardImg.hide();

			// start new deck if necessary
			var time = 0;
			if (cardsDrawn > 52) {
				shuffle();
				cardsDrawn = 0;
				time += 1000;
			}

			currentCard = deck[cardsDrawn++];

			cardImg.attr("src", smallImgPath + currentCard + ".png");
			setTimeout("tangera.makeVisible('#currentCard')", time += 250);

			scoreCards(currentCard);

		}


		function copyInstruction(instructionNr) {
			var instructions = $("#instructions").find('.cardinstruction_cnt');

			$.each(instructions, function (index, value) {
				var target = $(value);

				var targetRel = parseInt(target.attr("rel"), 10);

				if (targetRel === instructionNr) {
					target.clone().appendTo("#oneinstruction").fadeIn('normal');
					return false;
				}

			});

		}

		function appendParticipant(contenders, chosenText) {
			var target = $("#participants");
			var container = $("<div class='participant_cnt instructiontext'></div>)");
			var c;
			var chosenOne = null;

			if (!contenders || contenders.length === 0) {
				return;
			}

			if (chosenText) {
				for (c = 0; c < contenders.length; c++) {
					chosenOne = contenders[c];
					container.append("<img src='" + chosenOne.imageUrl + "' class='smallpartimg'></img><h6 class='instructiontext cardinstr2'>" + chosenText + "</h6>");
				}
			}
			else {
				for (c = 0; c < contenders.length; c++) {
					chosenOne = contenders[c];
					container.append("<img src='" + chosenOne.imageUrl + "' class='smallpartimg'></img>");
				}
			}

			target.append(container);
		}

		function exit() {
			setTimeout("partyMachine.exit()", exitAfterCardTimeout);
		}

		function appendInstruction(text) {

			var target = $("#participants");
			var container = $("<div class='participant_cnt instructiontext'><h5 class='instructiontext cardinstr2'>" + text + "</h5></div>)");
			target.append(container);
		}

		//A - 5: Dela ut antalet klunkar korter visar till valfri person, ‰ven dig sj‰lv om du vill. (A = 1 klunk, 2 = 2 klunkar, osv.)
		function chug(nrOfChugs) {
			var distributedChugs = 0;
			var targetsToChugs = {};
			var chosenOne;

			copyInstruction(1);

			while (distributedChugs < nrOfChugs) {
				var chugsToDistribute = getRandom(nrOfChugs - distributedChugs) + 1;
				distributedChugs += chugsToDistribute;

				chosenOne = getRandomParticipant();

				targetsToChugs[chosenOne.name] = targetsToChugs[chosenOne.name] || 0;
				targetsToChugs[chosenOne.name] += chugsToDistribute;

			}

			var groupedBySips = [];

			for (var p = 0; p < contenders.length; p++) {
				var contender = contenders[p];
				var sips = targetsToChugs[contender.name] || 0;

				if (sips) {
					groupedBySips[sips] = groupedBySips[sips] || [];
					groupedBySips[sips].push(contender);
				}
			}

			var soundDelayAdd = 2000;
			var soundSipsDelayAdd = 4000;

			var soundDelay = -2000;

			for (var sip = 1; sip < 11; sip++) {
				var contendersPerSip = groupedBySips[sip];
				if (contendersPerSip && contendersPerSip.length > 0) {
					appendParticipant(contendersPerSip, sip > 1 ? sip + " sips" : sip + " sip");

					for (c = 0; c < contendersPerSip.length; c++) {
						chosenOne = contendersPerSip[c];


						//					setTimeout('try { playSound("#Content_audio_' + chosenOne.name.toLowerCase() + '"); } catch(e) {}', soundDelay += soundDelayAdd);

						//					setTimeout('try { playSound("#sips' + sip + '"); } catch(e) {}', soundDelay += soundDelayAdd);

						soundDelay += soundDelayAdd;

						setTimeout(playSound("#Content_audio_" + chosenOne.name.toLowerCase(), soundDelay));

						soundDelay += soundSipsDelayAdd;

						setTimeout(playSound("#" + sip + "sips"), soundDelay);

						// playSound("#sips' + sip + '"); } 

					}

				}
			}

			playSound("#chug");

			exit();

		}

		//6: Kisskort. (Du fÂr enbart gÂ och kissa om du har en 6a. Du behÂller kortet 6 i din hand tills du kissat, 
		// sedan l‰gger du det i hˆgen med redan dragna kort. Om man gÂr och kissar utan kisskort bestraffas man med att dricka ett fullt glas av sin dricka)
		function snuff() {
			copyInstruction(2);
			var chosenOne = getRandomParticipant();
			appendParticipant([chosenOne]);
			playSound("#snuff");

			setTimeout(playSound("#Content_audio_" + chosenOne.name.toLowerCase(), 2000));

			exit();
		}

		//7: Rˆk-/snuskort. (precis som med kisskort, du fÂr bara rˆka eller snusa om du har en 7a. Rˆker/snusar du utan kortet bestraffas du med ett fullt
		// glas av din dricka. du behÂller kortet 7 i din hand tills du rˆkt/snusar, sedan l‰gger du det i hˆgen med redan dragna kort.)
		function smoke() {
			copyInstruction(3);
			var chosenOne = getRandomParticipant();
			appendParticipant([chosenOne]);
			playSound("#smoke");
			setTimeout(playSound("#Content_audio_" + chosenOne.name.toLowerCase(), 2000));


			exit();
		}

		// 8: Regel. (Best‰m en regel, t.ex mÂste slÂ i bordet eller ropa "skÂl" innan man dricker. Glˆmmer man detta bestraffas man med 3 klunkar 
		// utˆver det man skulle dricka. B‰sta regeln ever ‰r "Man fÂr inte peka", kort sagt om nÂgon pekar mÂste h*n dricka 3 klunkar. 
		// Slutar alltid med att alla pekar pÂ varandra fˆr att s‰ga "DU PEKA!!!". Med regelkort kan du ‰ven ta bort tidigare regler.)  
		function rule() {
			copyInstruction(4);

			if (!rules || rules.length <= 0) {
				return;
			}

			var chosenRule = getRandom(rules.length);

			appendInstruction(rules[chosenRule]);

			playSound("#rule");
			exit();
		}

		//9: Kategori. (V‰lj en kategori, T.ex bilm‰rken. Den som valde kategorin bˆrjar att s‰ga ett bilm‰rke(eller vilken kategori man nu valt) sedan ‰r det n‰stas tur, gÂ klockans hÂll. 
		// Den som inte kan ge ett svar ska dricka 3 klunkar.
		function category() {
			copyInstruction(5);
			exit();
		}

		//10: Vattenfall. (Alla mÂste klunka sina glas tills personen som fÂr vattenfall slutar dricka (fÂr sluta dricka n‰r han vill).
		// DÂ fÂr endast personen efter honom sluta dricka, n‰r denna slutat dricka fÂr n‰sta sluta och sÂ vidare tills det gÂtt bordet runt. 
		// Om man slutar dricka innan det ‰r ens tur att sluta fÂr man 3 straffklunkar, undantag dock om glaset tar slut. DÂ ‰r det okej att sluta utan bestraffning.

		function waterfall() {
			copyInstruction(6);
			var chosenOne = getRandomParticipant();
			appendParticipant([chosenOne], "Starts drinking! Stop when he/she does!");
			playSound("#waterfall");
			setTimeout(playSound("#Content_audio_" + chosenOne.name.toLowerCase(), 2000));

			exit();
		}

		// Dam: Tangera! (SÂ fort det kommer en dam ska alla ropa "Tangera!", den som ropar sist ska dricka 3 klunkar.)

		function scream() {
			copyInstruction(7);
			playSound("#shout");
			exit();
		}

		// Kung: Glas. (St‰ll ett glas i mitten av bordet, varje gÂng nÂgon fÂr en kung ska denna fylla 1/4 av glaset med sin dricka. 
		// Den som fÂr den 4e och sista kungen ska svepa glaset som nu fˆrhoppningsvis bestÂr av en vidrig blandning av ˆl, cider och roliga groggar! )
		// Starksprit/Whisky
		function spirits() {
			copyInstruction(8);
			var chosenOne = getRandomParticipant();
			appendParticipant([chosenOne]);
			playSound("#spirits");
			setTimeout(playSound("#Content_audio_" + chosenOne.name.toLowerCase(), 2000));

			exit();
		}

		function scoreCards(cards) {
			for (var i = 0; i < 1; ++i) {
				var card = cards[i];
				if (card != "") {
					scoreRanks[card.charAt(0)]();
				}
			}
		}

	} (window.tangera = window.tangera || {}, jQuery));

}