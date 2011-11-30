if(!this.JSON){this.JSON={}}(function(){function f(n){return n<10?"0"+n:n}if(typeof Date.prototype.toJSON!=="function"){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z":null};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf()}}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==="string"?c:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==="[object Array]"){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}if(typeof JSON.stringify!=="function"){JSON.stringify=function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})}}if(typeof JSON.parse!=="function"){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}());

var partyMachine =
{
	debug : function(str)
		{
			var div = document.getElementById('Debug');
			if (div) {
				div.innerText += str + '\r\n';
			}
		},
	_isHostAvailable: function()
	{
		return typeof(partyMachineHost) != 'undefined';
	},

	_participants: null,
	_currentParticipant: null,
	_gameControllerMap: [],

	_init: function()
	{
		if (partyMachine._isHostAvailable())
		{
			partyMachine._participants = JSON.parse(partyMachineHost.participants);
			partyMachine._currentParticipant = partyMachine.getParticipant(partyMachineHost.currentParticipant);

			partyMachine._gameControllerMap[partyMachineHost.currentParticipantGameControllerId] = partyMachine._currentParticipant;

			partyMachineHost.gameControllerJoystickChanged = partyMachine._gameControllerJoystickChanged;
			partyMachineHost.gameControllerGamepadPressed = partyMachine._gameControllerGamepadPressed;
			partyMachineHost.gameControllerGamepadReleased = partyMachine._gameControllerGamepadReleased;
			partyMachineHost.gameControllerButtonsPressed = partyMachine._gameControllerButtonsPressed;
			partyMachineHost.gameControllerButtonsReleased = partyMachine._gameControllerButtonsReleased;
		}
		else
		{
			partyMachine._participants =
			[
				{ Name: 'Pub', ImageUrl : 'Resources/Images/christhumb.png' },
				{ Name: 'Randy', ImageUrl : 'Resources/Images/cliffordthumb.png' },
				{ Name: 'Magnecyl', ImageUrl : 'Resources/Images/danielthumb.png' },
				{ Name: 'Geggin', ImageUrl : 'Resources/Images/gegginthumb.png' },
				{ Name: 'Mejje', ImageUrl : 'Resources/Images/jockethumb.png' },
				{ Name: 'Joel', ImageUrl : 'Resources/Images/joelthumb.png' },
				{ Name: 'Fold', ImageUrl : 'Resources/Images/jonasthumb.png' },
				{ Name: 'Blaizer', ImageUrl : 'Resources/Images/ollethumb.png' },
				{ Name: 'Deamo', ImageUrl : 'Resources/Images/stellanthumb.png' },
				{ Name: 'Wipeout', ImageUrl : 'Resources/Images/svardthumb.png' },
				{ Name: 'Vico', ImageUrl : 'Resources/Images/jimmythumb.png' },
				{ Name: 'Shahin', ImageUrl : 'Resources/Images/shahinthumb.png' },
				{ Name: 'Jesse', ImageUrl : 'Resources/Images/erikthumb.png' }
			];

			partyMachine._currentParticipant = partyMachine._participants[Math.floor(Math.random() * partyMachine._participants.length)];

			partyMachine._gameControllerMap[0] = partyMachine._currentParticipant;
		}

		for (var i = 0; i < partyMachine._participants.length; i++)
			partyMachine._participants[i].gameController =
			{
				joystick: function(x, y) { },
				gamepadPressed: function(left, up, right, down) { },
				gamepadReleased: function(left, up, right, down) { },
				buttonsPressed: function(buttonA, buttonB, buttonC, buttonD) { },
				buttonsReleased: function(buttonA, buttonB, buttonC, buttonD) { }
			};
	},

	getParticipants: function()
	{
		return partyMachine._participants;
	},

	getCurrentParticipant: function()
	{
		return partyMachine._currentParticipant;
	},

	getParticipant: function(name)
	{
		var plist = partyMachine.getParticipants();
		for (var i = 0; i < plist.length; i++)
			if (plist[i].Name == name)
				return plist[i];
	},

	_gameControllerJoystickChanged: function(controllerId, x, y)
	{
		var p = partyMachine._gameControllerMap[controllerId];
		if (p)
			p.gameController.joystick(x, y);
	},

	_gameControllerGamepadPressed: function(controllerId, left, up, right, down)
	{
		var p = partyMachine._gameControllerMap[controllerId];
		if (p)
			p.gameController.gamepadPressed(left, up, right, down);
	},

	_gameControllerGamepadReleased: function(controllerId, left, up, right, down)
	{
		var p = partyMachine._gameControllerMap[controllerId];
		if (p)
			p.gameController.gamepadReleased(left, up, right, down);
	},

	_gameControllerButtonsPressed: function(controllerId, buttonA, buttonB, buttonC, buttonD)
	{
		var p = partyMachine._gameControllerMap[controllerId];
		if (p)
			p.gameController.buttonsPressed(buttonA, buttonB, buttonC, buttonD);
	},

	_gameControllerButtonsReleased: function(controllerId, buttonA, buttonB, buttonC, buttonD)
	{
		var p = partyMachine._gameControllerMap[controllerId];
		if (p)
			p.gameController.buttonsReleased(buttonA, buttonB, buttonC, buttonD);
	},

	assignGameControllers: function(participant1, participant2, participant3, participant4, participant5, participant6, participant7)
	{
		var plist = arguments;

		if (partyMachine._isHostAvailable())
		{
			partyMachineHost.assignGameControllers(
				participant1 ? participant1.Name : undefined,
				participant2 ? participant2.Name : undefined,
				participant3 ? participant3.Name : undefined,
				participant4 ? participant4.Name : undefined,
				participant5 ? participant5.Name : undefined,
				participant6 ? participant6.Name : undefined,
				participant7 ? participant7.Name : undefined);

			partyMachineHost.gameControllersAssigned = function()
			{
				for (var i = 0; i < arguments.length; i++)
					partyMachine._gameControllerMap[arguments[i]] = plist[i];

				partyMachine.gameControllersAssigned();
			};
		}
		else
		{
			for (var i = 0; i < arguments.length; i++)
				partyMachine._gameControllerMap[i] = plist[i];

			partyMachine.gameControllersAssigned();
		}
	},

	exit: function()
	{
		if (partyMachine._isHostAvailable())
			partyMachineHost.exit();
		else if (confirm('Plugin exited, restart?'))
			window.location.reload(true);
	},

	gameControllersAssigned: function()
	{
	}
};

partyMachine._init();

if (!partyMachine._isHostAvailable())
{
	window.addEventListener('keydown', function(e)
	{
		virtualGameController(e, true);
	}, true);

	window.addEventListener('keyup', function(e)
	{
		virtualGameController(e, false);
	}, true);
}

//TODO: create virtual game controller class
var _joy0Left = false, _joy0Up = false, _joy0Right = false, _joy0Down = false,
	_joy0ButtonADown = false, _joy0ButtonBDown = false;
var _joy1Left = false, _joy1Up = false, _joy1Right = false, _joy1Down = false,
	_joy1ButtonADown = false, _joy1ButtonBDown = false;
var _joy2Left = false, _joy2Up = false, _joy2Right = false, _joy2Down = false,
	_joy2ButtonADown = false, _joy2ButtonBDown = false;

function virtualGameController(e, keyDown)
{
	if (e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40 || e.keyCode == 46 || e.keyCode == 34)
	{
		e.preventDefault();

		var p = partyMachine._gameControllerMap[0];
		if (p)
		{
			if (e.keyCode == 37)
			{
				if (keyDown && !_joy0Left)
				{
					_joy0Left = true;
					p.gameController.gamepadPressed(true, false, false, false);
				}
				else if (!keyDown && _joy0Left)
				{
					_joy0Left = false;
					p.gameController.gamepadReleased(true, false, false, false);
				}
			}
			else if (e.keyCode == 38)
			{
				if (keyDown && !_joy0Up)
				{
					_joy0Up = true;
					p.gameController.gamepadPressed(false, true, false, false);
				}
				else if (!keyDown && _joy0Up)
				{
					_joy0Up = false;
					p.gameController.gamepadReleased(false, true, false, false);
				}
			}
			else if (e.keyCode == 39)
			{
				if (keyDown && !_joy0Right)
				{
					_joy0Right = true;
					p.gameController.gamepadPressed(false, false, true, false);
				}
				else if (!keyDown && _joy0Right)
				{
					_joy0Right = false;
					p.gameController.gamepadReleased(false, false, true, false);
				}
			}
			else if (e.keyCode == 40)
			{
				if (keyDown && !_joy0Down)
				{
					_joy0Down = true;
					p.gameController.gamepadPressed(false, false, false, true);
				}
				else if (!keyDown && _joy0Down)
				{
					_joy0Down = false;
					p.gameController.gamepadReleased(false, false, false, true);
				}
			}
			else if (e.keyCode == 46)
			{
				if (keyDown && !_joy0ButtonADown)
				{
					_joy0ButtonADown = true;
					p.gameController.buttonsPressed(true, false, false, false);
				}
				else if (!keyDown && _joy0ButtonADown)
				{
					_joy0ButtonADown = false;
					p.gameController.buttonsPressed(true, false, false, false);
				}
			}
			else if (e.keyCode == 34)
			{
				if (keyDown && !_joy0ButtonBDown)
				{
					_joy0ButtonBDown = true;
					p.gameController.buttonsPressed(false, true, false, false);
				}
				else if (!keyDown && _joy0ButtonBDown)
				{
					_joy0ButtonBDown = false;
					p.gameController.buttonsPressed(false, true, false, false);
				}
			}

			var x;
			if (_joy0Left && !_joy0Right)
				x = -1;
			else if (_joy0Right && !_joy0Left)
				x = 1;
			else
				x = 0;

			var y;
			if (_joy0Up && !_joy0Down)
				y = -1;
			else if (_joy0Down && !_joy0Up)
				y = 1;
			else
				y = 0;

			p.gameController.joystick(x, y);
		}
	}

	if (e.keyCode == 65 || e.keyCode == 87 || e.keyCode == 68 || e.keyCode == 83 || e.keyCode == 81 || e.keyCode == 69)
	{
		e.preventDefault();

		var p = partyMachine._gameControllerMap[1];
		if (p)
		{
			if (e.keyCode == 65)
			{
				if (keyDown && !_joy1Left)
				{
					_joy1Left = true;
					p.gameController.gamepadPressed(true, false, false, false);
				}
				else if (!keyDown && _joy1Left)
				{
					_joy1Left = false;
					p.gameController.gamepadReleased(true, false, false, false);
				}
			}
			else if (e.keyCode == 87)
			{
				if (keyDown && !_joy1Up)
				{
					_joy1Up = true;
					p.gameController.gamepadPressed(false, true, false, false);
				}
				else if (!keyDown && _joy1Up)
				{
					_joy1Up = false;
					p.gameController.gamepadReleased(false, true, false, false);
				}
			}
			else if (e.keyCode == 68)
			{
				if (keyDown && !_joy1Right)
				{
					_joy1Right = true;
					p.gameController.gamepadPressed(false, false, true, false);
				}
				else if (!keyDown && _joy1Right)
				{
					_joy1Right = false;
					p.gameController.gamepadReleased(false, false, true, false);
				}
			}
			else if (e.keyCode == 83)
			{
				if (keyDown && !_joy1Down)
				{
					_joy1Down = true;
					p.gameController.gamepadPressed(false, false, false, true);
				}
				else if (!keyDown && _joy1Down)
				{
					_joy1Down = false;
					p.gameController.gamepadReleased(false, false, false, true);
				}
			}
			else if (e.keyCode == 81)
			{
				if (keyDown && !_joy1ButtonADown)
				{
					_joy1ButtonADown = true;
					p.gameController.buttonsPressed(true, false, false, false);
				}
				else if (!keyDown && _joy1ButtonADown)
				{
					_joy1ButtonADown = false;
					p.gameController.buttonsReleased(true, false, false, false);
				}
			}
			else if (e.keyCode == 69)
			{
				if (keyDown && !_joy1ButtonBDown)
				{
					_joy1ButtonBDown = true;
					p.gameController.buttonsPressed(false, true, false, false);
				}
				else if (!keyDown && _joy1ButtonBDown)
				{
					_joy1ButtonBDown = false;
					p.gameController.buttonsReleased(false, true, false, false);
				}
			}

			var x;
			if (_joy1Left && !_joy1Right)
				x = -1;
			else if (_joy1Right && !_joy1Left)
				x = 1;
			else
				x = 0;

			var y;
			if (_joy1Up && !_joy1Down)
				y = -1;
			else if (_joy1Down && !_joy1Up)
				y = 1;
			else
				y = 0;

			p.gameController.joystick(x, y);
		}
	}

	if (e.keyCode == 74 || e.keyCode == 73 || e.keyCode == 76 || e.keyCode == 75 || e.keyCode == 85 || e.keyCode == 79)
	{
		e.preventDefault();

		var p = partyMachine._gameControllerMap[2];
		if (p)
		{
			if (e.keyCode == 74)
			{
				if (keyDown && !_joy2Left)
				{
					_joy2Left = true;
					p.gameController.gamepadPressed(true, false, false, false);
				}
				else if (!keyDown && _joy2Left)
				{
					_joy2Left = false;
					p.gameController.gamepadReleased(true, false, false, false);
				}
			}
			else if (e.keyCode == 73)
			{
				if (keyDown && !_joy2Up)
				{
					_joy2Up = true;
					p.gameController.gamepadPressed(false, true, false, false);
				}
				else if (!keyDown && _joy2Up)
				{
					_joy2Up = false;
					p.gameController.gamepadReleased(false, true, false, false);
				}
			}
			else if (e.keyCode == 76)
			{
				if (keyDown && !_joy2Right)
				{
					_joy2Right = true;
					p.gameController.gamepadPressed(false, false, true, false);
				}
				else if (!keyDown && _joy2Right)
				{
					_joy2Right = false;
					p.gameController.gamepadReleased(false, false, true, false);
				}
			}
			else if (e.keyCode == 75)
			{
				if (keyDown && !_joy2Down)
				{
					_joy2Down = true;
					p.gameController.gamepadPressed(false, false, false, true);
				}
				else if (!keyDown && _joy2Down)
				{
					_joy2Down = false;
					p.gameController.gamepadReleased(false, false, false, true);
				}
			}
			else if (e.keyCode == 85)
			{
				if (keyDown && !_joy2ButtonADown)
				{
					_joy2ButtonADown = true;
					p.gameController.buttonsPressed(true, false, false, false);
				}
				else if (!keyDown && _joy2ButtonADown)
				{
					_joy2ButtonADown = false;
					p.gameController.buttonsReleased(true, false, false, false);
				}
			}
			else if (e.keyCode == 79)
			{
				if (keyDown && !_joy2ButtonBDown)
				{
					_joy2ButtonBDown = true;
					p.gameController.buttonsPressed(false, true, false, false);
				}
				else if (!keyDown && _joy2ButtonBDown)
				{
					_joy2ButtonBDown = false;
					p.gameController.buttonsReleased(false, true, false, false);
				}
			}

			var x;
			if (_joy2Left && !_joy2Right)
				x = -1;
			else if (_joy2Right && !_joy2Left)
				x = 1;
			else
				x = 0;

			var y;
			if (_joy2Up && !_joy2Down)
				y = -1;
			else if (_joy2Down && !_joy2Up)
				y = 1;
			else
				y = 0;

			p.gameController.joystick(x, y);
		}
	}
}
