

var AusMitDerHose = function (ctx, cns)
{
	var INTRO_TEXT = [ { text : "GET READY FOR SOME PANTS DROPPING ACTION", xpos : 20, ypos : 60, timer : 3 }, 
					   { text : "PANTS OFF!", xpos : 20, ypos : 60, timer : 3 } ];
	
	var m_dudes = partyMachine.getParticipants(),
		canvas = cns,
		m_ctx = ctx;

	var m_imgPants = new Image();
	var m_imgWidth = 315;
	var m_imgHeight = 323;
	var m_pantsYPos = 20;
	var m_showPants = false;
	var m_windowHeight = 768; 
	var m_windowWidth = 1024;
	var m_frame = 0;
	var m_pantsFrame = 0;
	var m_showIdiot = false;
	var m_idioten = null;
	
	var _drawText = function (text, color, x, y)
	{
		m_ctx.font = "40px TannenbergFett";
		m_ctx.fillStyle = color;
		m_ctx.fillText(text, x, y);				
	}
	
	var _drawPants = function ()
	{		
		if(m_pantsYPos <= 0)
		{
			m_pantsYPos = 10;
		}
		else
		{
			m_pantsYPos -= 2;
		}
		
		m_ctx.drawImage(m_imgPants, (m_windowWidth / 2) - (315 / 2), (m_windowHeight / 2) - (m_imgHeight / 2) + m_pantsYPos + 100);		
	}

	var _draw = function ()
	{
		m_ctx.clearRect(0, 0, m_windowWidth, m_windowHeight);
		
		if(m_frame <= 100)
		{
			_drawText("Mr. Cheng presents:", "#000", 330, 270);		
		}
		else if(m_frame > 100 && m_frame <= 180)
		{
			_drawText("AUS MIT DER HOSE!", "#000", 320, 270);
		}
		else if(m_frame > 180 && m_frame <= 270)
		{
			_drawText("A game where one random idiot...", "#000", 220, 270);
		}
		else if(m_frame > 270 && m_frame <= 360)
		{
			_drawText("...drops his pants", "#000", 350, 270);			
		}
		else if(m_frame > 360 && m_frame <= 420)
		{
			_drawText("For a total shame experience!", "#000", 280, 270);			
		}
		
		setTimeout(function () { m_showPants = true; }, 17000);
		
		if(m_showPants)
		{
			if(m_pantsFrame <= 15)
			{
				_drawText("Ajn", "#000", 500, 270);		
			}
			else if(m_pantsFrame > 15 && m_pantsFrame <= 30)
			{
				_drawText("Svaj", "#000", 500, 270);
			}
			else if(m_pantsFrame > 30 && m_pantsFrame <= 45)
			{
				_drawText("Draj", "#000", 500, 270);
			}
			else 
			{
				_drawText("Auf mit dem Hosen", "#000", 330, 270);		
			
				_drawPants();
			}
			m_pantsFrame++;
		}
		
		setTimeout(function () { m_showIdiot = true; }, 29190);
		
		if(m_showIdiot)
		{

			if(!m_idioten)
			{
						m_idioten = m_dudes[Math.floor(Math.random() * m_dudes.length)];
			}

			m_ctx.clearRect(0, 0, m_windowWidth, m_windowHeight);
			_drawText(m_idioten.Name, "#000", 330, 270);
		}
		
		m_frame++;
	}
	
	var _shuffle = function ()
	{
		var i = m_dudes.length;
		
		if(i == 0)
		{
			return false;
		}
		
		while(--i)
		{
			var j = Math.floor(Math.random() * (i + 1));
			var tempi = m_dudes[i];
			var tempj = m_dudes[j];
			m_dudes[i] = tempj;
			m_dudes[j] = tempi;
		}
	}
	
	var _init = function()
	{
		m_ctx.canvas.width  = m_windowWidth;
  		m_ctx.canvas.height = m_windowHeight;
		
		m_imgPants.onload = function()
		{
			m_ctx.drawImage(m_imgPants, 0, 0);			
		};
	
		m_imgPants.src = "hosen.png";
		m_ctx.clearRect(0, 0, m_windowWidth, m_windowHeight);
		
		_shuffle();
	}
	
	_init();
	
	return {
		draw : _draw
	};
};