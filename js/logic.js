/* Code for game logic*/

define(['Jquery', 'controls', 'player'], function(Jquery, controls, player){
	class logicHandler {
		 
		constructor() {
			this._updateI = 0; // tracks update iterations number
			this._objectsInWorld = [];
			this._world = $('#world');
			this._logicHandler = this;
		}

		// GET AND SET ------------------------

		get updateI() {
			return this._updateI;
		}

		set updateI(newValue) {
			this._updateI = newValue;
		}

		get objectsInWorld() {
			return this._objectsInWorld;
		}

		// FUNCTIONS ------------------------

		// update all logic-related stuff each frame
		update(mainDelta) {
			this._logicHandler.resetAllCollisions();
			this._logicHandler.collideTest(player, mainDelta);
			player.updateEntity(this._objectsInWorld);
    		controls.catchInput(controls.movementKeys, controls.interactKey, mainDelta, this._objectsInWorld);
		}
		
		//this function is called inside the constructor of entity and its subclasses
		createObject(object) {
			//call the function to spawn the object into the world 
			object.spawnEntity();
			//add the object to a list to track it
			this._objectsInWorld.push(object);
		}

		deleteObjectFromWorld(object){
			//find the object in the array
			let indexFound = this._objectsInWorld.findIndex(
				function (element) {
					return element === object;
				});

			//only if we've got a valid index
			if(typeof indexFound === "number")
			{
				// delete from the world list to stop the renderer creating canvas
				this._objectsInWorld.splice(indexFound,1); 
				// delete the remaining body
				object.$body.remove();
				// delete the instance of the class
				object = null;
			}
			else
			{
				return
			}
		}

		resetAllCollisions() {
			this._objectsInWorld.forEach(function(element){
				element.colliding = false;
				element.collideFromDirection = 'none';
			});
		}


		// test collisions between object and their orientation
		// it is not perfect as every hitbox or object is supposed to be a rectangle
		// a possible improvement would be a detection based on pixels
		collideTest(testedObject, mainDelta) {
			//reference to the class
			let logicHandlerRef = this._logicHandler;
			let worldRef = this._world;
			//size of objects 
			let testedHeight = parseInt(testedObject.$body.css('height'));
			let testedWidth = parseInt(testedObject.$body.css('width'));
			const collisionTolerance = 10;
			let elementHeight = 0 ;
			let elementWidth = 0 ;
			//distance between objects
			let distanceX = 0; 
			let distanceY = 0; 
			// coordinates of the objects
			// x and y values in css take the top-left corner for origin
			let elementX = 0;
			let elementY = 0;
			let testedY = parseInt(testedObject.$body.css('top')) + parseInt(testedObject.$body.parent().css('top'));		
			let testedX = parseInt(testedObject.$body.css('left')) + parseInt(testedObject.$body.parent().css('left'));


			// USING A FOR LOOP BECAUSE FOREACH CAN'T USE BREAK STATEMENTS
			// We want to catch collision one object at a time
			// Or the avatar will go through things because of bumping
			for (let i = 0; i < this._objectsInWorld.length; i++) {
				if (this._objectsInWorld[i] !== testedObject && testedObject.colliding === false) {

				// Storing the values
					elementHeight = parseInt(this._objectsInWorld[i].$body.css('height'));
					elementWidth = parseInt(this._objectsInWorld[i].$body.css('width'));
					elementY = parseInt(this._objectsInWorld[i].$body.css('top')) + parseInt(this._objectsInWorld[i].$body.parent().css('top'));
					elementX = parseInt(this._objectsInWorld[i].$body.css('left')) + parseInt(this._objectsInWorld[i].$body.parent().css('left'));

					// making the calculations of distances
					distanceX = testedX - elementX;
					distanceY = testedY - elementY;
					
					if((testedX + testedWidth + collisionTolerance >= elementX  && testedX - collisionTolerance  <= elementX + elementWidth) && (testedY + testedHeight + collisionTolerance >= elementY  && testedY - collisionTolerance <= elementY + elementHeight))
					{

						if(distanceX < 0)
						{
							// colliding from left.
							if(testedObject.isPlayer){
							worldRef.css('left',  parseInt(worldRef.css('left')) + testedObject.speed*mainDelta);
							}
							testedObject.colliding = true;
							testedObject.canMove = false;
							break;
						}
						
						if(distanceX > elementWidth - collisionTolerance)
						{
							// colliding from right.
							if(testedObject.isPlayer){
							worldRef.css('left',  parseInt(worldRef.css('left')) - (testedObject.speed*mainDelta*2));
							}
							testedObject.colliding = true;
							testedObject.canMove = false;
							break;
						}

						if (distanceY < 0) {
							// colliding from top.
							if(testedObject.isPlayer){
							worldRef.css('top',  parseInt(worldRef.css('top')) + (testedObject.speed*mainDelta));
							}
							testedObject.colliding = true;
							testedObject.canMove = false;
							break;
						}
						
						if (distanceY > elementHeight - collisionTolerance)
						{
							// colliding from bottom.
							if(testedObject.isPlayer){
							worldRef.css('top',  parseInt(worldRef.css('top')) - (testedObject.speed*mainDelta*2));
							}
							testedObject.colliding = true;
							testedObject.canMove = false;
							break;
						}	
					}	
				}
				else {
					testedObject.colliding = false;
					testedObject.canMove = true
				}
			}				
		}

	}
	const logic = new logicHandler;	// creating the only one logicHandler we need
	return logic;
});

