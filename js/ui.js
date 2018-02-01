/* Interface stuff is here*/
define(['Jquery', 'JqueryUI'], function(Jquery, JqueryUI){
	class _uiManager {

		constructor(){
			this._uiManagerRef = this;
		}
			//draw the ui part that doesn't need to be refreshed 
			// each frame. You shouldn't call it more than once.
			drawFixedUI(){
				this.HelpButton();
			}

			// create a "help" button in top left corner
			HelpButton(){
				$('#ui').button({
					icon: "ui-icon-gear",
				}).click(function() {
	       					$('#dialog').dialog( {
	       						show: {effect: 'fold', duration: 1000},
								hide: {effect: 'blind', duration: 1000},
								buttons: [
											{
												html: "AIDE : <br /> <br /> DEPLACEMENT :<br /> flèches directionnelles <br /><br /> INTERACTION: <br />barre d'espace (à condition d'être proche d'un élément interactif) <br /><br /> ELEMENT INTERACTIF : <br />le carré rose est un PNJ",
												click: function() {
												this._uiManagerRef.HelpButton();
						       					$( this ).dialog( "close" );
												},
											}
										],
	       					});
						},
				);
			}
		}
	const uiManager = new _uiManager;	// creating the only one renderer we need
	return uiManager;
});