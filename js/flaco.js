class Flaco {
    constructor(ctx,w,h){
    this.ctx = ctx;
    this.gameWidth = w;
    this.gameHeight = h;

    this.image = new Image();
    this.image.src = "img/cecimini.png";

    this.width = 440;
    this.height = 440;

    this.posX = this.gameWidth *0.65;
    this.posY = this.gameHeight - this.height;

    this.image.frames = 3; //Indicamos el numero de frames que tiene la imagen
    this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

    this.setListeners(); //Llamamos al listener para que desde el primer momento el jugador responda.

    this.life=100
    this.dmg=2

    this.isDead = false
    this.barW = this.life*2

  }

  attack(){
    return this.dmg
  }

  recieveDamage(dmg){
    if(this.life <= 0){
        this.isDead = true
    }else{
        this.life -= dmg
    }
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
      0, //Punto y donde empieza a recortar
      Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
      this.image.height, //Punto y donde termina de recortar
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    
    this.drawLifeBar()
    this.animate(framesCounter); //Funcion que anima los frames.
  }
  drawLifeBar(){
    this.ctx.fillStyle = 'black'
    this.ctx.strokeRect(this.posX, this.posY-50, this.barW, 30)
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.posX, this.posY-50, this.barW, 30)
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(this.posX, this.posY-50, this.life*2, 30)
  }


  animate(framesCounter) {
    if (framesCounter % 30 == 0) {
      this.image.framesIndex++; //Cambiamos el frame de la imagen cada 60 fps.
      if (this.image.framesIndex > 2) {
        this.image.framesIndex = 0;
      }
    }
  }

  setListeners() {
    document.onkeydown = e => {
      
    };
  }

}