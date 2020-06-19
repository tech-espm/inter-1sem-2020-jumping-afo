function gameover() {
	
	var texto;
	
	this.preload = function () {
		
		// Define a cor do fundo para cinza escuro.
		game.stage.backgroundColor = "#444444";
		game.load.image("Fundo", "over.png");
		
	};
	
	this.create = function () {
		
		game.add.tileSprite(0, 0, 600, 600, "Fundo");
		
		var estilo = {
			font: "normal 24px MuseoModerno",
			fill: "#ffffff"
		};
		
		texto = game.add.text(150, 450, "Clique aqui para recomeçar", estilo);
		
		texto.inputEnabled = true;
		texto.input.useHandCursor = true;
		texto.events.onInputDown.add(textoFoiClicado);
		
		fadeIn();
		
	};
	
	this.update = function () {
		
	};
	
	function textoFoiClicado() {
		
		fadeOut(fadeOutAcabou);
		
	}
	
	function fadeOutAcabou() {
		
		game.state.start("menu");
		
	}
	
}