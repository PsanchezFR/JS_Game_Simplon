/* Main structure for the game */



//RequireJS configuration ------------------------------
requirejs.config({
	baseUrl: 'js',
	paths: {
		// libraries
		Jquery: 'lib/jquery-3.2.1',
		JqueryUI: 'lib/jquery-ui-1.12.1/jquery-ui',
		// modules
		logic: 'logic',
		renderer: 'renderer',
		entity: 'entity',
		controls: 'controls',
		player: 'player',
		camera: 'camera',
		wall: 'environment',
		npc: 'npcs',
		uiManager: 'ui',
		main: 'main'
	}

});

//Import ------------------------------
define(['Jquery', 'logic', 'renderer', 'entity', 'controls', 'player', 'camera', 'wall', 'npc', 'uiManager'], function(Jquery, logic, renderer, entity, controls, player, camera, wall, npc, uiManager){
	//Main code unit ------------------------------
	const main = function Game() {				
		/*A big chunk of this structure comes from http://isaacsukin.com 
		and can be found on google*/

		// mainLoop() variables
		const maxFPS = 60;
	    const timestep = 1000 / maxFPS;		// fixed framerate because we want to avoid the game changing speed
	    let fps = 60;
	    let lastFpsUpdate = 0;
	    let framesThisSecond = 0;
	    let delta = 0;					// the amount of time between each frame
		let lastFrameTimeMs = 0; 			// stocks the time of the last frame

		//Looping part of the code ------------------------------
		function mainLoop(timestamp) {

			//Do nothing if the ellapsed time isn't enough
			if (timestamp < lastFrameTimeMs + (1000 / maxFPS)) {
		        requestAnimationFrame(mainLoop);
		        return;
		    }

		    delta += timestamp - lastFrameTimeMs;
		    lastFrameTimeMs = timestamp;

		    if (timestamp > lastFpsUpdate + 1000) {
		        fps = 0.25 * framesThisSecond + 0.75 * fps;
		        lastFpsUpdate = timestamp;
		        framesThisSecond = 0;
		    }
		    framesThisSecond++;

		    //this part keeps the simulated time in check
		    // if it goes crazy
		    var numUpdateSteps = 0;
		    while (delta >= timestep) {
		        logic.update(timestep);
		        delta -= timestep;
		        if (numUpdateSteps++ >= 240) {
		            delta = 0;
		            break;
		        }
		    }

		    //draw the objects listed in logic.js
			renderer.draw(logic.objectsInWorld);
			requestAnimationFrame(mainLoop);	// calls the callback function when the browser is ready for a new frame, creating a loop 
		}
		//End of the loop ------------------------------	
		let wall1 = new wall(1100, 100, [0, 100], 0, false, true, [10, 80, 20]);
		let wall2 = new wall(100, 1000, [100, 100], 0, false, true, [10, 211, 38]);
		let wall3 = new wall(100, 1100, [0, 1100], 0, false, true, [10, 60, 100]);
		let wall4 = new wall(1100, 100, [1100, 100], 0, false, true, [118, 60, 30]);
		let wall5 = new wall(200, 200, [1000, 1000], 0, false, true, [0, 0, 0]);
		let npc1 = new npc(50, 50, [300, 300], 0, false, true, [250, 100, 100])
		uiManager.drawFixedUI();
		requestAnimationFrame(mainLoop);	// calls the callback function when the browser is ready for a new frame, creating a loop 

	}
	
	 requestAnimationFrame(main);

	 return main;
}

);




