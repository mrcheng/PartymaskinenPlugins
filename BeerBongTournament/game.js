var game = {};
var storageKey = "BeerPongTournament";
var gameReady = false;
var alreadyVoted = false;
var hasSelectedWinner = false;

function partyMachinePlugin(plugin) {

    setupGame(plugin);

    waitForWinner(plugin);

    clear();

}

function setupGame(plugin) {

    this.game = JSON.parse(localStorage.getItem(this.storageKey));

    if (this.game === null) {

        this.game = {};

        this.game.players = plugin.participants.random(8).map(function (el, index) {
            return new Player(el.name, (index + 1));
        });

        this.game.semi = [];
        this.game.final = [];
        this.game.winner = null;
        this.game.current = {
            top: getPlayer(1),
            bot: getPlayer(8),
            round: 1
        };

    }

    this.game.players.forEach(function (player) {

        var dom = document.getElementById("s" + player.seed);

        dom.innerHTML = player.name;

        if (player.loser) {

            dom.style.textDecoration = "line-through";

        }
        
        if (game.current.round === 1 && (game.current.top.seed === player.seed || game.current.bot.seed === player.seed)) {

            dom.style.color = "#f00";

        }

    });

    this.game.semi.forEach(function (player) {

        var id;

        switch (player.seed) {
            case 1:
            case 8:
                id = "w1";
                break;
            case 4:
            case 5:
                id = "w2";
                break;
            case 2:
            case 7:
                id = "w3";
                break;
            case 3:
            case 6:
                id = "w4";
                break;
        }

        var dom = document.getElementById(id);

        dom.innerHTML = player.name;

        if (player.loser) {

            dom.style.textDecoration = "line-through";

        }
        
        if (game.current.round === 2 && (game.current.top.seed === player.seed || game.current.bot.seed === player.seed)) {

            dom.style.color = "#f00";

        }

    });

    this.game.final.forEach(function (player) {

        var id;

        switch (player.seed) {
            case 1:
            case 8:
            case 4:
            case 5:
                id = "f1";
                break;
            case 2:
            case 7:
            case 3:
            case 6:
                id = "f2";
                break;
        }

        var dom = document.getElementById(id);

        dom.innerHTML = player.name;

        if (player.loser) {

            dom.style.textDecoration = "line-through";

        }
        
        if (game.current.round === 3 && (game.current.top.seed === player.seed || game.current.bot.seed === player.seed)) {

            dom.style.color = "#f00";

        }

    });

    if (this.game.winner !== null) {

        document.getElementById("badge").style.display = "block";
        document.getElementById("counter").style.display = "block";
        document.getElementById("counter").innerHTML = this.game.winner.name;
        document.getElementById("winner").innerHTML = this.game.winner.name;
        document.getElementById("tournament").style.display = "none";
        document.getElementById("currentgame").style.display = "none";

    }

    document.getElementById("player1").innerHTML = this.game.current.top.name;
    document.getElementById("player2").innerHTML = this.game.current.bot.name;

    showCurrentGame();

}


function showCurrentGame() {
        
    playSound("Pingu_Opening_Theme.mp3");

    var counter = 11;

    var id = setInterval(function () {

        counter = counter - 1;

        if (counter === -1) {

            clearInterval(id);

            document.getElementById("tournament").style.opacity = "0";

            document.getElementById("currentgame").style.opacity = "1";

            playSound("Marcus_Price_amp_Carli_-_Brs_Till_Alla.mp3");

            this.gameReady = true;

        }

    }, 1000);

}

function getPlayer(seed) {
    return this.game.players.filter(function (player) {
        return player.seed === seed;
    })[0];
}

function setLoser(player, playerList) {

    playerList.forEach(function (p) {
        if (p.seed === player.seed) {
            p.loser = true;
        }
    });

}

function waitForWinner(plugin) {

    var participant = getParticipant(plugin.participants, this.game.current.top.name);
   
    participant.gameController.buttonsPressed = function (a, b, c, d) {
        
        participantButtonsPressed(participant, a, b, c, d);
        
    };
    
    participant.gameController.gamepadPressed = function (left, up, right, down) {
        
        participantGamepadPressed(participant, left, up, right, down);
        
    };
    
    var gameControllersAssigned = function () {

        // Hmm
        
    };

    partyMachineParticipantControllerSelectors.assignParticipants([participant], gameControllersAssigned);

    window.addEventListener("keydown", function (e) {

        if (e.keyCode === 88) { // X

            updatePlayers(this.game.current.top, this.game.current.bot);

            saveGameAndExit();

        } else if (e.keyCode === 89) { // Y

            updatePlayers(this.game.current.bot, this.game.current.top);

            saveGameAndExit();

        }

    }, true);

}

function getParticipant(participants, name) {
    
    return participants.filter(function (participant) {

        return participant.name === name;

    })[0];
    
}

function participantButtonsPressed(participant, a, b, c, d) {
        
    if (this.gameReady && this.hasSelectedWinner && !this.alreadyVoted && (a || b || c || d)) {

        this.alreadyVoted = true;
        
        var p1 = document.getElementById("player1");
        
        if (p1.classList.contains("selected")) {

            updatePlayers(this.game.current.top, this.game.current.bot);

            saveGameAndExit();

        } else {

            updatePlayers(this.game.current.bot, this.game.current.top);

            saveGameAndExit();

        }

    } 

}

function participantGamepadPressed(participant, left, up, right, down) {

    var p1 = document.getElementById("player1");
    var p2 = document.getElementById("player2");

    if (left) {

        p1.classList.add("selected");
        p2.classList.remove("selected");
        this.hasSelectedWinner = true;

    } else {

        p2.classList.add("selected");
        p1.classList.remove("selected");
        this.hasSelectedWinner = true;

    }

}

function updatePlayers(winner, loser) {

    if (this.game.current.round === 1) {

        this.game.semi.push(winner);

        setLoser(loser, this.game.players);

        switch (winner.seed) {
            case 1:
            case 8:
                this.game.current.top = getPlayer(4);
                this.game.current.bot = getPlayer(5);
                break;
            case 4:
            case 5:
                this.game.current.top = getPlayer(2);
                this.game.current.bot = getPlayer(7);
                break;
            case 2:
            case 7:
                this.game.current.top = getPlayer(3);
                this.game.current.bot = getPlayer(6);
                break;
            case 3:
            case 6:
                this.game.current.top = this.game.semi[0];
                this.game.current.bot = this.game.semi[1];
                this.game.current.round = 2;
        }

    } else if (this.game.current.round === 2) {

        this.game.final.push(winner);

        setLoser(loser, this.game.semi);

        if (winner.name === this.game.semi[0].name || winner.name === this.game.semi[1].name) {

            this.game.current.top = this.game.semi[2];
            this.game.current.bot = this.game.semi[3];

        } else {

            this.game.current.top = this.game.final[0];
            this.game.current.bot = this.game.final[1];
            this.game.current.round = 3;
        }

    } else {

        setLoser(loser, this.game.final);

        this.game.winner = winner;

    }

}

function saveGameAndExit() {

    localStorage.setItem(this.storageKey, JSON.stringify(this.game));

    var timeout = 1000;

    if (this.game.winner != null) {
        
        document.getElementById("tournament").style.display = "none";
        document.getElementById("currentgame").style.display = "none";
        document.getElementById("badge").style.display = "block";
        
        var dom = document.getElementById("counter");
        dom.style.display = "block";
        dom.innerHTML = this.game.winner.name;
        timeout = 10000;

        localStorage.clear();

    }

    setTimeout("partyMachine.exit()", timeout);

}

function playSound(path) {
    
    var audio = document.createElement("audio");
    audio.src = path;
    audio.play();
    
}

function clear() {

    window.addEventListener("keydown", function (e) {

        if (e.keyCode === 76) { // L

            localStorage.clear();

            window.location.reload();

        }

    }, true);

}