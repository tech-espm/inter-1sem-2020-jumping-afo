var telas = ["menu", "regras", "jogo", "gameover"];
var larguraJogo = 600;
var alturaJogo = 600;

function menu() {
	
	var texto;
	
	this.preload = function () {
		
		// Define a cor do fundo para azul claro.
		game.stage.backgroundColor = "#0066ff";
		game.load.image("Fundo", "menuinicial.png");
		
	};
	
	this.create = function () {
		game.add.tileSprite(0, 0, 600, 600, "Fundo");

		var estilo = {
			font: "normal 50px MuseoModerno",
			fill: "#ffffff"
		};
		
		
		texto = game.add.text(210, 50, "Jumping \n    Afo!", estilo);
		
		
		texto.inputEnabled = true;
		
		texto.input.useHandCursor = true;
		
		texto.events.onInputDown.add(textoFoiClicado);
		
		
		fadeIn();
		
	};
	
	this.update = function () {
		
	};
	
	function textoFoiClicado() {
		
		// Em vez de simplesmente iniciar a tela, como
		// estamos utilizando fade, devemos esperar o
		// fade acabar para começar a outra tela!
		fadeOut(fadeOutAcabou);
		
	}
	
	function fadeOutAcabou() {
		
		// Apenas inicia a primeira tela do jogo.
		game.state.start("regras");
		
	}
	
}