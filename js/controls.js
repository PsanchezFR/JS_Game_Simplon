/* Code for controls*/

define(['Jquery', 'player'], function(jquery, player){
	 class _controlsManager {

		constructor(movementKeys, interactKey) {
			this._movementKeys = movementKeys;
			this._interactKey = interactKey;
			this._self = this;	// to refer to the class inside of a function
			this._world = $('#world');

		}
		// SET AND GET ------------------------

		get movementKeys(){
			return this._movementKeys;
		}

		set movementKeys(newKey){
			this._movementKeys = newKey;
		}

		get interactKey(){
			return this._interactKey;
		}

		set interactKey(newKey){
			this._interactKey = newKey;
		}

		// FUNCTIONS ------------------------

		// To emulate a camera the world is moving around the player character
		// You control the world and not the player
		controlPlayer(catchedKey, movementKeys, interactKey, delta, objectsInWorld){
			let distanceToMove = player.speed * delta;
			let xPositionCurrent = parseInt(this._world.css("left"));
			let yPositionCurrent = parseInt(this._world.css("top"));
			if (player.canMove === true){
				 switch(catchedKey) {
							case interactKey:
								player.interactWithObject(objectsInWorld);
								player.isMoving = false;
								break;
							case movementKeys[0]:
								player.isMoving = true;
								player.directionFacing = 'top';
								this._world.css("top", yPositionCurrent + distanceToMove);
								break;
							case movementKeys[1]:
								player.isMoving = true;
								player.directionFacing = 'left';
								this._world.css("left", xPositionCurrent + distanceToMove);
								break;
							case movementKeys[2]:
								player.isMoving = true;
								player.directionFacing = 'bottom';
								this._world.css("top", yPositionCurrent - distanceToMove);
								break;
							case movementKeys[3]:
								player.isMoving = true;
								player.directionFacing = 'right';
								this._world.css("left", xPositionCurrent - distanceToMove);
								break;
							default:
							player.isMoving = false;
							break;
					}
				}

			}

		// catch the key pressed and feed the control list to controlPlayer()
		catchInput(movementKeys, interactKey, delta, objectsInWorld){
			let that = this._self; // 
							
			// not using jquery because event queue was going mad				
			window.onkeydown = function (e) {
				let event = window.event ? window.event : e;
				let keyPressed = event.keyCode;
				that.controlPlayer(keyPressed, movementKeys, interactKey, delta, objectsInWorld);
			};

		}



	}
	const controls = new _controlsManager([38, 37, 40, 39], 32);	// creating the only one controlManager we need
	return controls;
});