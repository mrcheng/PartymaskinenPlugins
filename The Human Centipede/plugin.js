function method(obj, fun, args) {
 
  return function() {
    if (obj === true)
      obj = this;
    var f = typeof fun === "string" ? obj[fun] : fun;
	

    return f.apply(obj, Array.prototype.slice.call(args || [])
        .concat(Array.prototype.slice.call(arguments)));
  };
}

function onload()
{

		
}


Player = function() {
	this.currentPos = {x:0,y:0};
	this.lastPos = {x:0,y:0};
	this.currentDirection=0;
	this.image=null;
	this.participant=null;
	this.isDead = false;
}

Player.prototype = {
	showAvatar: function() {$(this.image).show();},
	movingLeft: function() {return this.currentDirection == 0},
	movingUp: function() {return this.currentDirection == 1},
	movingRight: function() {return this.currentDirection == 2},
	movingDown: function() {return this.currentDirection == 3},
	moveLeft: function() {if(this.currentDirection !=2 && this.currentDirection != 0) this.currentDirection = 0;},
	moveRight: function() {if(this.currentDirection !=0 && this.currentDirection != 2) this.currentDirection = 2;},
	moveUp: function() {if(this.currentDirection !=3 && this.currentDirection != 1) this.currentDirection = 1;},
	moveDown: function() {if(this.currentDirection !=1 && this.currentDirection != 3) this.currentDirection = 3;},
	
	gamepadPressed: function(left,up,right,down) {
		//console.log(left + "," +up+ "," +right+ "," +down);
		if(left)
			this.moveLeft();
		if(up)
			this.moveUp();
		if(right)
			this.moveRight();
		if(down)
			this.moveDown();

	},

	gamepadReleased: function(left,up,right,down) {
		if(left)
			this.left = false;
		if(up)
			this.up = false;
		if(right)
			this.right = false;
		if(down)
			this.down = false;
	},
} 

HumanCentipede = function() {

};

HumanCentipede.prototype = {
	participants: null,
	lastTick:0,
	fps:60,
	framesDrawn:0,
	canvas:null,
	player:null,
	width:320,
	height:240,
	scale:2,
	players: new Array(),
	playerDefaults: {0:{color:'#FFFFFF',start:{x:10,y:10},direction:2},
					 1:{color:'#00FFCC',start:{x:310,y:10},direction:0},
					 2:{color:'#FF0066',start:{x:10,y:230},direction:2},
					 3:{color:'#F00066',start:{x:310,y:230},direction:0},
					},
					
	messageReceived: function(e) {
		var data = JSON.parse(e.data);
	
		if (data.event === 'startPlugin') {
			this.assignControllers(data.participants);
			this.init();
			this.startGame();
		}
	},

	init: function() {

		this.canvas = $('#maincanvas')[0];
		this.fpsDiff = 1000 / this.fps;



	
		console.log(this.width + " " + this.height);

		var ctx = this.canvas.getContext('2d');
		ctx.globalAlpha = 0.9;
		ctx.fillStyle = "#000000";
		ctx.fillRect(0,0,640,480);
		ctx.globalAlpha = 1;

		this.board = new Array(this.width);
		for (var x=0;x<this.width;x++) {
			this.board[x] = new Array(this.height);
			for(var y=0;y<this.height;y++) {
				this.board[x][y] = false;
			}
		}

	$(document).keydown(function() {console.log("OK");});
	$(document).keydown(method(this,this.onKeyDown));
	this.switchBackground();
	this.startGame();
	

	//	setTimeout(method(this,this.switchBackground,null),5000);
	},

	gameControllersAssigned: function() {
		this.startGame();
	},

	assignControllers: function(participants) {
		
		this.shuffle(participants);

		var players = 2;
		var participantsActive = new Array();
		for(var i = 0;i<players;i++) {
			var player = this.newPlayer(i,participants[i]);
			
			this.players.push(player);
			participantsActive.push(participants[i]);
			console.log(player.participant.name);
		}

		partyMachine.gameControllersAssigned =  method(this,this.gameControllersAssigned,null);

		//THERE WILL BE NO ASSIGNING YET
		return;

		if(players == 1)
			partyMachine.assignGameControllers(participantsActive[0]);
		else if(players == 2)
			partyMachine.assignGameControllers(participantsActive[0],participantsActive[1]);
		else if(players == 3)
			partyMachine.assignGameControllers(participantsActive[0],participantsActive[1],participantsActive[2]);
		else if(players == 4)
			partyMachine.assignGameControllers(participantsActive[0],participantsActive[1],participantsActive[2],participantsActive[3]);
	},

	switchBackground: function() {
		var body = $('body');

		body.addClass('game');
		body.removeClass('start');

		$('#players').show();
		
		//setTimeout(method(this,this.assignControllers,null),2000);
	},

	startGame: function() {

		this.gameLoop();
	},

	newPlayer: function(number,participant) {
		var player = new Player();
		player.image = $('.player')[number];
		player.image.src = participant.imageUrl;
		
		player.participant = participant;
		//player.participant.gameController.gamepadPressed = method(player,player.gamepadPressed,null);
		player.settings = this.playerDefaults[number];
		player.currentPos.x = player.settings.start.x;
		player.currentPos.y = player.settings.start.y;
		player.currentDirection = player.settings.direction;

		$('span',$(player.image).parent()).html(player.participant.name);
		
		return player;
	},

	gameLoop: function() {
		var top = 100;
		var fade = "#maincanvas";

		if(this.stop == true) {
			$(fade).animate({
				opacity: 0,
				}, 5000, function() {
					// Animation complete, yeah!.
				});

			var winner = 0;
			for (var i in this.players) {
				var player = this.players[i];
				console.log("Player " + player.participant.Name + " isDead:" + player.isDead)
				if(player.isDead) {
					console.log("Death, winner: " + winner)
					$(player.image).parent().animate({
					left:150+150*winner,
					top:top,
					}, 5000, function() {
					// Animation complete.
					});
					winner++;
				} else {
					$(player.image).parent().animate({
					opacity: 0,
					}, 5000, function() {
					// Animation complete.
					});
				}
			}

			$("#losers").animate({
				opacity: 0.5,
				}, 5000, function() {

			});

			setTimeout(method(this,this.exitGame,null),10000);

			return;

		}
		var now = new Date().getTime();
		var delta = now - this.lastTick;

		
		if(delta >= this.fpsDiff) {
			this.currentFps = (this.framesDrawn / delta) * 1000;
			this.framesDrawn = 0;
			this.tick();
			this.lastTick = new Date().getTime();
			this.draw();
		}

		setTimeout(method(this,this.gameLoop,null),10);
	},

	exitGame: function() {
		partyMachine.exit()
	},

	draw: function() {
		this.framesDrawn++;
		var ctx = this.canvas.getContext('2d');			

		for (var i in this.players) {
			var player = this.players[i];
			if(!player.isDead) {	
				ctx.fillStyle = player.settings.color;
				ctx.fillRect(player.currentPos.x*this.scale-this.scale/2,player.currentPos.y*this.scale-this.scale/2,this.scale+4,this.scale+4);
			}
			
		}
		

	},

	tick: function() {
		this.moveObjects();
		this.checkCollisions();
		this.checkWinner();
		this.markPositions();
	},

	checkWinner: function() {
		if(this.stop)
			return;
		var deadPlayers = 0;
		for (var i in this.players) {
			var player = this.players[i];
			if(player.isDead)
				deadPlayers++;
		}
		if(deadPlayers >= this.players.length-1)
			this.stop = true;
	},

	markPositions: function() {
		if(this.stop)
			return;

		for (var i in this.players) {
			var player = this.players[i];
			if(player.currentPos.x >= 0 && player.currentPos.y >= 0)
				this.board[player.currentPos.x][player.currentPos.y] = true;
		}
	},

	checkCollisions: function() {
		this.checkCollision(this.player);
	},

	checkCollision: function(player)
	{
		for (var i in this.players) {
			var player = this.players[i];
			if(player.isDead)
				continue;

			if(player.currentPos.x >= this.width)
				this.hasDied(player);
			else if(player.currentPos.x < 0)
				this.hasDied(player);
			else if(player.currentPos.y >= this.height)
				this.hasDied(player);
			else if(player.currentPos.y < 0)
				this.hasDied(player);
			else if(this.board[player.currentPos.x][player.currentPos.y] == true)
				this.hasDied(player);
		}
	},

	hasDied: function(player) {
		console.log("Player died: " + player.participant.name);
		player.isDead = true;
	},

	moveObjects: function() {
		var steps = 1;
		for (var i in this.players) {
			var player = this.players[i];
			
			if(player.movingLeft())
				player.currentPos.x += -steps;
			else if(player.movingRight())
				player.currentPos.x += steps;
			else if(player.movingUp())
				player.currentPos.y += -steps;
			else if(player.movingDown())
				player.currentPos.y += steps;
		}
		
		//console.log(i + ":" + player.currentPos.x + "," + player.currentPos.y);

	},

	shuffle: function(arr)
		{
			var i = arr.length;
			if (i == 0)
				return false;

			while (--i)
			{
				var j = Math.floor(Math.random() * (i + 1));
				var tempi = arr[i];
				var tempj = arr[j];
				arr[i] = tempj;
				arr[j] = tempi;
			}
		},
	

	 onKeyDown: function(e) {
			if (e.keyCode == 37 /* LEFT */)
				this.players[0].moveLeft();
			else if (e.keyCode == 38 /* UP */)
				this.players[0].moveUp();
			else if (e.keyCode == 39 /* RIGHT */)
				this.players[0].moveRight();
			else if (e.keyCode == 40 /* DOWN */)
				this.players[0].moveDown();
			else if (e.keyCode == 65 /* A */)
				this.players[1].moveLeft();
			else if (e.keyCode == 87 /* W */)
				this.players[1].moveUp();
			else if (e.keyCode == 68 /* D */)
				this.players[1].moveRight();
			else if (e.keyCode == 83 /* S */)
				this.players[1].moveDown();
		},

		onKeyUp: function() {
		
			var e = window.event;
			console.log("Up:" + e.keyCode);

			if (e.keyCode == 37 /* LEFT */)
				this.player.moveLeft();
			else if (e.keyCode == 38 /* UP */)
				this.player.keyboard.up = false;
			else if (e.keyCode == 39 /* RIGHT */)
				this.player.keyboard.right = false;
			else if (e.keyCode == 40 /* DOWN */)
				this.player.keyboard.down = false;
			else if (e.keyCode == 65 /* A */)
				rightKeysDown |= 1;
			else if (e.keyCode == 87 /* W */)
				rightKeysDown |= 2;
			else if (e.keyCode == 68 /* D */)
				rightKeysDown |= 4;
			else if (e.keyCode == 18 /* S */)
				rightKeysDown |= 8;
		},

};


