/* Code for actives objects*/
define(['logic', 'Jquery'], function(logic, Jquery){
	const entity = class _entity {
		constructor(heightPx, widthPx, position, speed, canMove, drawable) {
			this._heightPx = heightPx || 10;
			this._widthPx = widthPx || 10;
			this._position = position || [0, 0];
			this._speed = speed || 0;
			this._canMove = canMove || false;
			this._drawable = drawable || true;
			this._$body = $('<canvas/>', {'id':'entity' + Math.floor(Math.random()*10000), 'class' : 'entity'});
			this._body = this._$body[0]; // get the DOM node in the jquery object in case it is needed
			this._body.getContext('2d');
			this._isSpawned = false;
			this._object = this;
			this._isPlayer = false; // to counter the lack of class check in javascript
			// Movement related variables
			this._isMoving = false;
			this._directionFacing = "none";
			// Collision related variables
			this._collider = true;
			this._colliding = false;
			this._collideFromDirection = "none";
			// Interaction related variables 
			this._isInteractive = false;

			// Spawn the object and add it to the list of objects in the world.
			// It's a little tricky because of scope and requireJS loading 
			// everything asynchronously.
			this.create = function (object) {
				var thisObject = object;
				// Wait for the logic module to load then execute the callback function 
				require(["logic"], function (logic){
					logic.createObject(thisObject);
				});
			};
			this.create(this);
			
		}

		// SET AND GET ------------------------
		
		get heightPx(){
			return this._heightPx;
		}

		set heightPx(newValue){
			this._heightPx = newValue;
		}

		get widthPx(){
			return this._widthPx;
		}

		set widthPx(newValue){
			this._widthPx = newValue;
		}

		get speed(){
			return this._speed;
		}

		set speed(newValue){
			this._speed = newValue;
		}

		get position(){
			return this._position;
		}

		set position([x, y]){
			this._position = [x,y];
		}

		get canMove(){
			return this._canMove;
		}

		get isMoving(){
			return this._isMoving;
		}

		set isMoving(newValue){
			if(newValue === true || newValue === false)
			this._isMoving = newValue;
		}

		get directionFacing(){
			return this._directionFacing;
		}

		set directionFacing(newValue){
			if (newValue === 'top' || newValue === 'bottom' || newValue === 'right' || newValue === 'left') {
				this._directionFacing = newValue;
			}
			else {
				this._directionFacing = 'none';
			}
		}

		get isPlayer(){
			return this._isPlayer;
		}

		get $body(){
			return this._$body;
		}

		set canMove(newValue){
			if(newValue === false || newValue === true)
				this._canMove = newValue;
		}

		get drawable(){
			return this._drawable;
		}

		set drawable(newValue){
			if(newValue === false || newValue === true)
				this._drawable = newValue;
		}

		get collider(){
			return this._collider;
		}

		get colliding(){
			return this._colliding;
		}

		set colliding(newValue){
			if(newValue === false || newValue === true)
				this._colliding = newValue;
		}

		get collideFromDirection(){
			return this._collideFromDirection;
		}

		set collideFromDirection(newValue){
			this._collideFromDirection = newValue;
		}

		get isInteractive() {
			return this._isInteractive;
		}
		// FUNCTIONS ------------------------

		// spawn the body of the entity
		spawnEntity(){
			this._$body.css("height", this._heightPx);
			this._$body.css("width", this._widthPx);
			this._$body.css("left", this._position[0]);
			this._$body.css("top", this._position[1]);
			this._$body.css("background-color", "rgb(152,50,0)");
			this._$body.css("z-index", 10);
			this._$body.appendTo('body');
			this._isSpawned = true;
		}

		// update parameters of the body in the css
		drawEntity(){
			this._$body.css("height", this._heightPx);
			this._$body.css("width", this._widthPx);
			this._$body.css("left", this._position[0]);
			this._$body.css("top", this._position[1]);
		}

		// delete the instance of the class, its reference in the world list of objects and its body (see 'logic.js').
		killEntity(){
			var object = this._object;
			require(["logic"], function (logic){
					logic.deleteObjectFromWorld(object);
				});
		}




	}

	return entity;	// returning the class because many instances will be created somewhere else
});