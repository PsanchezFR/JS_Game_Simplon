/* code for rendering the objects on screen */
define(['Jquery', 'entity', 'uiManager'], function(Jquery, entity, uiManager){
	class _renderer {

		constructor(){

		}
		// update very objects graphic representation in game.
		draw(listOfObjects) {
			if (typeof listOfObjects !== "undefined") {
				listOfObjects.forEach(function(element) {
						if (element._drawable && element instanceof entity )
						{
							element.drawEntity();
						}
						else{
							return;
						}
					});
				}
			}
		}
	const renderer = new _renderer;	// creating the only one renderer we need
	return renderer;
});