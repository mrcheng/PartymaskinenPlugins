
var CenturionKamelasa = function(ctx, width, height)
{
	var _ctx = ctx,
		_width = width,
		_height = height,
		_counter = 0,
		_charXpos = 0,
		_charYpos = 120,
		_drinking = false,
		_scroller = 900,
		_drinkCounter = 0,
		_audio = document.createElement("audio"),
		_endGame = 0;

	var _drawBackground = function(x, y, width, height)
	{
		_ctx.beginPath();
	    _ctx.fillStyle = "black";
		_ctx.rect(x, y, width, height);
		_ctx.closePath();
		_ctx.fill();	
	};
	
	var _calcCenter = function(counter)
	{
		if(counter == 1)
		{
			_charXpos = 350		
		}
		else if(counter == 0 || (counter > 1 && counter < 10) || counter == 11)
		{
			_charXpos = 310;
		}
		else if ((counter > 11 && counter < 20) || counter == 10)
		{
			_charXpos = 250;
		}
		else if(counter == 21 || counter == 31 || counter == 41 || counter == 51)
		{
			_charXpos = 230;
		}
		else
		{
			_charXpos = 190;
		}
	};
		
	var _drinkNow = function()
	{
		_drinkCounter++;

		if (_drinkCounter == 1)
		{
			_drawBackground(0, 200, _width, _height);	 	
	
			var background = new Image();
			
			background.onload = function () 
			{
				_ctx.drawImage(background, 0, 280);    
			}
	
			background.src = "jockeTwo.png";			
			
			_ctx.fillStyle = '#FFFFFF';
			_ctx.font = '130px Jersey M54';
			_ctx.textBaseline = 'top';
			_ctx.fillText("DRINK", 250, 220);
			_ctx.fillText("NOW", 280, 330);		
			_audio.play();
		}
		
		if(_drinkCounter == 20)
		{
			_drinkCounter = 0;
			_counter = 0;
			_drinking = false;
			
			_endGame++;
			
			if(_endGame == 1)
			{
				partyMachine.exit();
			}
		}
	};
	
	var _drawScroller = function()
	{
		if(!_drinking)
		{
			_drawBackground(0, 520, _width, _height);	 	

			_ctx.fillStyle = '#FFFFFF';
			_ctx.font = 'bold 14px sans-serif';
			_ctx.textBaseline = 'top';
			_ctx.fillText("RELAPSE CENTURION DRINKING GAME!                                        YOU WEED? WE NEED!", _scroller, 540);
			
			_scroller -= 1;
			
			if(_scroller <= -600)
			{
				_scroller = 900;
			}
		}
	};
	
	var _draw = function()
	{	
		$("#console").html("" + _drinking + " " + _counter)
		if (_drinking)
		{
			_drinkNow();
			return;
		}
	
	 	if(_counter == 60)
	 	{
	 		_drinking = true;
	 		return;
	 	}
	
		_drawBackground(0, 200, _width, 319);	 	
	 	_calcCenter(_counter);
	 	
		_ctx.fillStyle = '#FFFFFF';
		_ctx.font = '400px Jersey M54';
		_ctx.textBaseline = 'top';
		_ctx.fillText(_counter, _charXpos, _charYpos);
	

		_counter++;
	};
	
	var _init = function()
	{
	    _audio.setAttribute('src', "lol.mp3");
    	_audio.load();

		_drawBackground(0, 0, _width, _height);	 	

	    var background = new Image();
	    
	    background.onload = function () 
        {
			_ctx.drawImage(background, 90, 20);    
        }

		background.src = "relapse-logo.png";	
	};
	
	_init();
	
	return {
		draw: _draw,
		drawScroller: _drawScroller
	}
}