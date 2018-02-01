// Everything environment related
//
define(['Jquery', 'entity', 'logic'], function(jquery, entity, logic){
	const wall = class wall extends entity{

		constructor(heightPx, widthPx, position, speed, canMove, drawable, color) {
			super(heightPx, widthPx, position, speed, canMove, drawable);
			this._color = color;
			this._$body.attr('id', 'wall' + Math.floor(Math.random()*10000));
			this._$body.attr('class', 'wall');
			this._canMove = false;
		}

		spawnEntity(){
			this._$body.css("height", this._heightPx);
			this._$body.css("width", this._widthPx);
			this._$body.css("left", this._position[0]);
			this._$body.css("top", this._position[1]);
			this._$body.css("z-index", 15);
			this._$body.css("background-color", "rgb("+this._color[0]+","+this._color[1]+","+this._color[2]+")");
			this._$body.appendTo('#world');
			this._isSpawned = true;

		}
	}
	
	return wall;


});