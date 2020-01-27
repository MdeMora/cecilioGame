class Ceci {
    constructor(ctx,w,h,keyCode){
    this.ctx = ctx
    this.gameWidth = w
    this.gameHeight = h

    this.image = new Image()
    this.image.src = "img/cecimini.png"
    this.bgMusic = new Sound("ceciKush.mp3")

    this.width = 440
    this.height = 440

    this.posX = this.gameWidth*0.03
    this.posY0 = this.gameHeight - this.height //Guardamos la posicion original para usarla como suelo
    this.posY = this.gameHeight - this.height

    this.image.frames = 3 //Indicamos el numero de frames que tiene la imagen
    this.image.framesIndex = 0 //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

    this.keys = keyCode

    this.life=100
    this.dmg=5

    this.beer= new Beer(this.ctx,this.gameWidth,this.gameHeight)
    this.razor= new Razor(this.ctx,this.gameWidth,this.gameHeight)
    this.cigar= new Cigar(this.ctx,this.gameWidth,this.gameHeight)
    

    this.currentTarget = undefined

    this.isDead = false

    this.setListeners() //Llamamos al listener para que desde el primer momento el jugador responda.
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
      this.height,
      )
      
    this.drawLifeBar()
    this.drawItems()
    this.animate(framesCounter) //Funcion que anima los frames.
  }

  setCurrentTarget(obj){
    this.currentTarget=obj
  }

  animate(framesCounter) {
    if (framesCounter % 20 == 0) {
      this.image.framesIndex++ //Cambiamos el frame de la imagen cada 5 fps.
      if (this.image.framesIndex > 2) {
        this.image.framesIndex = 0
      }
    }
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

  drawLifeBar(){
    this.ctx.fillStyle = 'black'
    this.ctx.strokeRect(this.posX, this.posY-50, 200, 30)
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.posX, this.posY-50, 200, 30)
    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(this.posX, this.posY-50, this.life*2, 30)
  }

  drawItems(){
    this.beer.draw()
    this.razor.draw()
    this.cigar.draw()
  }

  setListeners() {
    document.onkeypress = e => {
      switch (e.keyCode) {
        case this.keys.ZETA:
          this.currentTarget.recieveDamage(this.attack())
          break
        case this.keys.X:
          this.currentTarget.recieveDamage(this.attack())
          break
        case this.keys.Q:
          this.life += this.beer.action()
          break
        case this.keys.W:
          this.dmg += this.razor.action()
          break
        case this.keys.E:
          console.log("No estoy implementado")
          break
        case this.keys.SPACE:
          console.log("Click space")
          this.bgMusic.play();
          break
        default :
          console.log(e.keyCode)
        break
      }
    }
  }

}