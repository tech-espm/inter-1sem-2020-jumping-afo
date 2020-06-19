function jogo() {
	//Adicionando Variáveis globais
	var Seta;
	var Plataformas;
	var ProximaPlat;
	var Boneco;
	var IntervaloInicial = 2500;
	var VelocidadeInicial = 40;
	var AtualizacaoPlacar;
	var AtualizacaoDificuldade;
	var Placar = 0;
	var texto;
	var cont;
	var PlatxAtual;
	var PlatyAtual;
	var PlatxAnterior = 0;
	var PlatyAnterior = 151;
	
	function BonecoCaiu(){

				fadeOut(fadeOutAcabou);
				
			}
			
	function fadeOutAcabou() {
		
		game.state.start("gameover");
		
	}
	
	this.preload = function () {
		//Carregando imagens e sprites
		//game.load.image("Fundo", "examples/assets/background2.png");
		game.load.image("Fundo", "fundo2.png");
		game.load.image("Plataforma", "livro.png");
		//game.load.image("Plataforma", "examples/assets/bullet0.png");
		//game.load.spritesheet("boneco", "examples/assets/dude.png", 32, 48);
		game.load.spritesheet("boneco", "Boneco2.png", 38, 48);
		
		
		ProximaPlat = game.time.now;
	};
	
	this.create = function () {
		//Criando variáveis locais
		cont = 0;
		var i;
		var estilo = {
			font: "normal 36px MuseoModerno",
			fill: "#000000"
		};
		
	
		Seta = game.input.keyboard.createCursorKeys();
		
		//Colocando Fundo e sprite Boneco
		game.add.tileSprite(0, 0, 600, 600, "Fundo");
		Boneco = game.add.sprite(300, 100, "boneco");
		texto = game.add.text(0, 0, "Pontuação: ", estilo);
		
		//Adicionando fisica e animações para Boneco
		game.physics.arcade.enable(Boneco);
		//Boneco.animations.add("esquerda", [0, 1, 2, 3], 8, true);
		//Boneco.animations.add("parado", [4], 1, true);
		//Boneco.animations.add("direita", [5, 6, 7, 8], 8, true);
		//Boneco.animations.play("parado");
		
		Boneco.animations.add("esquerda", [5, 4, 3, 2, 1, 0], 8, true);
		Boneco.animations.add("parado", [6], 1, true);
		Boneco.animations.add("direita", [6, 7, 8, 9, 10, 11], 8, true);
		Boneco.animations.play("parado");
		
		
		//Impedir que Boneco saia da tela, colocar gravidade e velocidade máxima
		Boneco.body.collideWorldBounds = true;
		Boneco.body.gravity.y = 800;
		Boneco.body.maxVelocity.x = 1000;
		
		
		
		Plataformas = game.add.group();
	
		Plataformas.enableBody = true;
		Plataformas.physicsBodyType = Phaser.Physics.ARCADE;
		
		for (i = 0; i < 14; i++) {
			var Plataforma = Plataformas.create(0, 0, "Plataforma");
			Plataforma.exists = false;
			Plataforma.visible = false;
		}
		AtualizacaoPlacar = game.time.now + 3000;
		AtualizacaoDificuldade = game.time.now + 30000;
	};
	
	this.update = function () {
		
		game.physics.arcade.collide(Boneco, Plataformas);
		
		
		//Controlando comandos do Boneco
		if (Seta.left.isDown) {
			Boneco.body.velocity.x = -300;
			Boneco.animations.play("esquerda");
		} 
		else if (Seta.right.isDown){
			Boneco.body.velocity.x = 300;
			Boneco.animations.play("direita");
		} 
		else if(Seta.up.isDown && (Boneco.body.onFloor() || Boneco.body.touching.down)){
			Boneco.body.velocity.y = -500;
		}
		else if(Seta.down.isDown){
			Boneco.body.velocity.y = 400;
		}
		else{
			Boneco.body.velocity.x = 0;
			Boneco.animations.play("parado");
		}	
		
		var agora = game.time.now;	
		if (agora >= AtualizacaoDificuldade) {
			if (IntervaloInicial !== 0){
			IntervaloInicial = IntervaloInicial + 250;
			}
			VelocidadeInicial = VelocidadeInicial + 60;
			AtualizacaoDificuldade = agora + 30000;
		}
		
		if (agora >= AtualizacaoPlacar) {
			Placar = Placar + 30;
			texto.setText("Pontuação: " + Placar);
			AtualizacaoPlacar = agora + 3000;
		}
		if (agora >= ProximaPlat) {
			
			var Plataforma = Plataformas.getFirstExists(false);
			
			if (Plataforma) {
				if (PlatxAnterior < 100){
					PlatxAtual = game.rnd.integerInRange(300, 400);
				}
				else if (PlatxAnterior < 200 && PlatxAnterior > 100){
					PlatxAtual = game.rnd.integerInRange(400, 500);
				}
				else if (PlatxAnterior <= 300 && PlatxAnterior >= 200){
					PlatxAtual = game.rnd.integerInRange(0, 550);
				}
				else if (PlatxAnterior < 400 && PlatxAnterior > 300){
					PlatxAtual = game.rnd.integerInRange(500, 550);
				}
				else if (PlatxAnterior < 500 && PlatxAnterior > 400){
					PlatxAtual = game.rnd.integerInRange(200, 300);
				}
				else {
					PlatxAtual = game.rnd.integerInRange(100, 200);
				}
				
				if (PlatyAnterior < 150){
					PlatyAtual = game.rnd.integerInRange(150, 270);
				}
				else if (PlatyAnterior < 270 && PlatyAnterior > 150){
					PlatyAtual = game.rnd.integerInRange(270, 470);
				}
				else {
					PlatyAtual = game.rnd.integerInRange(75, 150);
				}
				//PlatxAtual = game.rnd.integerInRange(0, 550);
				
				PlatyAtual = game.rnd.integerInRange(85, 400);
				
				Plataforma.reset(PlatxAtual, PlatyAtual);
				Plataforma.body.immovable = true;
				Plataforma.body.checkCollision.left = false;
				Plataforma.body.checkCollision.right = false;
				Plataforma.body.checkCollision.down = false;
				PlatxAnterior = PlatxAtual;
				PlatyAnterior = PlatyAtual;
				
				//ProximaPlat = agora + IntervaloInicial;
				if(Plataforma.body.__count__ < 14){
					ProximaPlat = agora
				}
			}
		}
		
		Plataformas.forEachExists(moverPlat);
		
	
		if (Boneco.body.onFloor()) {
			cont = cont + 1
		}
		if (cont == 1){
			IntervaloInicial = 2500;
			VelocidadeInicial = 40;
			Placar = 0;
			BonecoCaiu();
		}
	};
	
	function moverPlat(Plataforma) {
		Plataforma.y += game.time.physicsElapsed * VelocidadeInicial;
		if (Plataforma.y >= alturaJogo) {
			Plataforma.kill();
		}

	}
}