function Player()
{
	this.name = null;
	this.img =  null;
	this.boardPosition = { x: 0, y: 0 };
	this.vector = { x: 0, y: 0 };

	this.onPlayerHit = null;

	this.move = function()
	{
		var pos = this.boardPosition;

		var testvectors = [];
		if (this.vector.x != 1)
			testvectors.push({ x: -1, y: 0 });
		if (this.vector.x != -1)
			testvectors.push({ x: 1, y: 0 });
		if (this.vector.y != 1)
			testvectors.push({ x: 0, y: -1 });
		if (this.vector.y != -1)
			testvectors.push({ x: 0, y: 1 });

		this.shuffle(testvectors);

		if (this.vector.x != 0 || this.vector.y != 0)
			testvectors.push({ x: this.vector.x * -1, y: this.vector.y * -1 });

		for (var i = 0; i < testvectors.length; i++)
		{
			var v = testvectors[i];
			var newpos = { x: pos.x + v.x, y: pos.y + v.y };

			if (!board.isWall(newpos))
			{
				if (this.onPlayerHit)
				{
					var p = board.getPlayer(newpos);
					if (p)
						this.onPlayerHit(p);
				}

				this.vector = v;
				this.boardPosition = board.getPosition(this.boardPosition, v);

				break;
			}
		}
	};

	this.render = function()
	{
		var pos = translateToScreen(translateBoardToPixels(
		{
			x: this.boardPosition.x,
			y: this.boardPosition.y
		}));

		this.img.style.left = pos.x + 'px';
		this.img.style.top = pos.y + 'px';
	};

	this.shuffle = function(arr)
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
	};
}
