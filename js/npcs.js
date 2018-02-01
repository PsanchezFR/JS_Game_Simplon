/* everything for non player characters is here */
define(['Jquery', 'entity', 'logic', 'player', 'JqueryUI'], function(jquery, entity, logic, player, JqueryUI){
	const npc =	class npcTemplate extends entity{

		constructor(heightPx, widthPx, position, speed, canMove, drawable, color) {
			super(heightPx, widthPx, position, speed, canMove, drawable);
			this._color = color;
			this._$body.attr('id', 'npc' + Math.floor(Math.random()*10000));
			this._$body.attr('class', 'npc');
			this._isInteractive = true;
		}

		spawnEntity(){
			this._$body.css("height", this._heightPx);
			this._$body.css("width", this._widthPx);
			this._$body.css("left", this._position[0]);
			this._$body.css("top", this._position[1]);
			this._$body.css("z-index", 16);
			this._$body.css("background-color", "rgb("+this._color[0]+","+this._color[1]+","+this._color[2]+")");
			this._$body.appendTo('#world');
			this._isSpawned = true;
		}

		// Triggered by the player
		respondInteraction(){
			$('#dialog').dialog({
				closeOnEscape: true,
				modal: true,
				show: {effect: 'fold', duration: 1000},
				hide: {effect: 'blind', duration: 1000},
				buttons: [
					{
						text: "Je suis ici pour témoigner de la motivation de Paul Sanchez !",
						click: function() {
       					$( this ).dialog( "close" );
						},
					}
				],

			});
		} 

	}

	return npc;


});