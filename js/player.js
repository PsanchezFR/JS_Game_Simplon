/* everything player-related is here */
define(['Jquery', 'entity', 'logic', 'controls'], function(jquery, entity, logic, controls){
	class playerTemplate extends entity{

		constructor(heightPx, widthPx, speed, canMove, drawable, color) {
			super(heightPx, widthPx, [$(window).height()/2, $(window).width()/2], speed, canMove, drawable);

			this._color = color;
			this._isMoving = false;
			this._canMove = true;
			this._isPlayer = true; // so I can recognize the player in the worldList
			this._lineOfSightIMG = './assets/img/crosshair.png';
			this._$lineOfSight = $("<img id='crosshair' src=" + this._lineOfSightIMG + " height='105' width='105'>");
			this._$body.attr('id', 'playerAvatar');
			this._$body.attr('class', 'player');
			this._rangeOfInteraction = 120;
		}

		// FUNCTIONS ------------------------

		spawnEntity(){
			this._$body.css("height", this._heightPx);
			this._$body.css("width", this._widthPx);
			this._$body.css("left", this._position[1]);
			this._$body.css("z-index", 50);
			this._$body.css("top", this._position[0]);
			this._$body.css("background-color", "rgb("+this._color[0]+","+this._color[1]+","+this._color[2]+")");
			this._$body.appendTo('#player');
			// LoS spawning
			this._$lineOfSight = this._$lineOfSight.appendTo('#player');
			this._$lineOfSight.css('top', this.position[0] + this._$body.height()/2 - this._$lineOfSight.height()/2);
			this._$lineOfSight.css('left', this.position[1] + this._$body.width()/2 - this._$lineOfSight.width()/2);
			this._isSpawned = true;
		}

		// called in renderer.js (graphic stuff)
		drawEntity(){
			this._$body.css("height", this._heightPx);
			this._$body.css("width", this._widthPx);
		}

		// called in logic.js (game logic stuff)
		updateEntity(objectsInWorld){
			this.orientLineOfSight();
		}

		// Triggers the respondInteraction function of nearby interactive objects
		interactWithObject(objectsInWorld){
			let interactiveObjects = [];

			for(let i = 0; i < objectsInWorld.length; i++)
			{
				if(objectsInWorld[i].isInteractive) 
				{
					interactiveObjects.push(objectsInWorld[i]);
				} 
			}

			let	playerY = parseInt(this.$body.css('top')) + parseInt(this.$body.parent().css('top'));
			let playerX = parseInt(this.$body.css('left')) + parseInt(this.$body.parent().css('left'));

			for(let i = 0; i < interactiveObjects.length; i++)
			{
				let elementY = parseInt(interactiveObjects[i].$body.css('top')) + parseInt(interactiveObjects[i].$body.parent().css('top'));
				let elementX = parseInt(interactiveObjects[i].$body.css('left')) + parseInt(interactiveObjects[i].$body.parent().css('left'));

				let distanceY =	Math.abs(elementY - playerY);
				let distanceX =	Math.abs(elementX - playerX);
				if (distanceX + distanceY <= this._rangeOfInteraction)
				{
					interactiveObjects[i].respondInteraction();
				}
			}
		}

		// Gives a direction to the crosshair attached to player avatar
		orientLineOfSight(){
			switch(this._directionFacing){
				case 'top':
					this._$lineOfSight.css('top', this.position[0] + this._$body.height()/2 - this._$lineOfSight.height());
					this._$lineOfSight.css('left', this.position[1] + this._$body.width()/2 - this._$lineOfSight.width()/2);
					break;
				case 'bottom':
					this._$lineOfSight.css('top', this.position[0] + this._$body.height()/2 + this._$lineOfSight.height()/10);
					this._$lineOfSight.css('left', this.position[1] + this._$body.width()/2 - this._$lineOfSight.width()/2);
					break;
				case 'left':
					this._$lineOfSight.css('top', this.position[0] + this._$body.height()/2 - this._$lineOfSight.height()/2);
					this._$lineOfSight.css('left', this.position[1] + this._$body.width()/2 -this._$lineOfSight.width());
					break;
				case 'right':
					this._$lineOfSight.css('top', this.position[0] + this._$body.height()/2 - this._$lineOfSight.height()/2);
					this._$lineOfSight.css('left', this.position[1] + this._$body.width()/2 + this._$lineOfSight.width()/10);
					break;
				default :
					this._$lineOfSight.css('top', this.position[0] + this._$body.height()/2 - this._$lineOfSight.height()/2);
					this._$lineOfSight.css('left', this.position[1] + this._$body.width()/2 - this._$lineOfSight.width()/2);
					break
			}
		}
		

	}

	const player = new playerTemplate(50, 50, 0.8, true, true, [20, 50, 50]);
	
	return player;


});