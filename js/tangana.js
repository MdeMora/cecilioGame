class Tangana {
    constructor(ctx,w,h,player){
    this.ctx = ctx;
    this.gameWidth = w;
    this.gameHeight = h;

    this.image = new Image();
    this.image.src = "img/tangawin.png";

    this.width = 440;
    this.height = 440;

    this.posX = this.gameWidth *0.65;
    this.posY = this.gameHeight - this.height;

    this.image.frames = 2; //Indicamos el numero de frames que tiene la imagen
    this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

    this.life=800
    this.dmg=2.5

    this.isDead = false
    this.barW = this.life/3

    this.player = player
  }

  attack(){
    return this.dmg
  }

  recieveDamage(dmg){
    this.life <= 0 ? this.isDead = true : this.life -=dmg
  }
  motionDraw(framesCounter) {
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
  animate(framesCounter) {
    if (framesCounter % 30 == 0) {
      this.image.framesIndex++; //Cambiamos el frame de la imagen cada 60 fps.
      if (this.image.framesIndex > 1) {
        this.image.framesIndex = 0;
      }
    }
  }

  staticDraw(){
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  drawLifeBar(){
    this.ctx.fillStyle = 'black'
    this.ctx.strokeRect(this.posX+50, this.posY, this.barW, 30)
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.posX+50, this.posY, this.barW, 30)
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(this.posX+50, this.posY, this.life/3, 30)
  }


  // setListeners() {
  //   document.onkeydown = e => {
      
  //   };
  // }

}