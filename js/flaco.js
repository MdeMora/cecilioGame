class Flaco {
    constructor(ctx,w,h,player){
    this.ctx = ctx;
    this.gameWidth = w;
    this.gameHeight = h;

    this.image = new Image();
    this.image.src = "img/flaco.png";

    this.width = 400;
    this.height = 400;

    this.posX = this.gameWidth *0.65;
    this.posY = this.gameHeight - this.height;

    this.image.frames = 3; //Indicamos el numero de frames que tiene la imagen
    this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

    this.life=100
    this.dmg=2

    this.isDead = false
    this.barW = this.life

    this.player = player
    console.log(this.dmg)
  }

  attack(){
    return this.dmg
  }

  recieveDamage(dmg){
    this.life <= 0 ? this.isDead = true : this.life -= dmg
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    
    this.drawLifeBar()
    // this.animate(framesCounter); //Funcion que anima los frames.
  }
  drawLifeBar(){
    this.ctx.fillStyle = 'black'
    this.ctx.strokeRect(this.posX+50, this.posY-40, this.barW, 30)
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.posX+50, this.posY-40, this.barW, 30)
    this.ctx.fillStyle = 'red'
    this.ctx.fillRect(this.posX+50, this.posY-40, this.life, 30)
  }

  rngItems(){
    let rng = Math.random()*100
    console.log("Rng Items llamado")
    console.log(rng)

    if(this.isDead){
      if(rng <= 20){
        console.log("Beer ++")
        this.player.beer.uses++
      }else if(rng>20&&rng<=50){
        console.log("cigar ++")

        this.player.cigar.uses++
      }else if(rng>50&&rng<=56){
        console.log("razor ++")

        this.player.razor.uses++
      }
    }
  }

  animate(framesCounter) {
    if (framesCounter % 30 == 0) {
      this.image.framesIndex++; //Cambiamos el frame de la imagen cada 60 fps.
      if (this.image.framesIndex > 2) {
        this.image.framesIndex = 0;
      }
    }
  }

  // setListeners() {
  //   document.onkeydown = e => {
      
  //   };
  // }

}