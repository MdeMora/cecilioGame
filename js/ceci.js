class Ceci {
    constructor(ctx,w,h,keyCode,isDialoging){
    this.ctx = ctx
    this.gameWidth = w
    this.gameHeight = h
    
    this.width = 440
    this.height = 440
    
    
    this.posX = this.gameWidth*0.03
    this.posY0 = this.gameHeight - this.height //Guardamos la posicion original para usarla como suelo
    this.posY = this.gameHeight - this.height
    
    this.image = new Image()
    this.image.src = "img/ceciminiTransparent.png"
    this.image.frames = 3 //Indicamos el numero de frames que tiene la imagen
    this.image.framesIndex = 0 //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage
    
    this.bgMusic = new Sound("msc/ceciKush.mp3")
    
    this.attackImg= new Image()
    this.attackImg.src = "img/attack.png"
    this.attackImg.frames = 3
    this.attackImg.framesIndex = 0
    
    this.keys = keyCode
    this.isDialoging = isDialoging

    this.life=250
    this.dmg=4
    this.superDmg=0

    this.beer= new Beer(this.ctx,this.gameWidth,this.gameHeight)
    this.razor= new Razor(this.ctx,this.gameWidth,this.gameHeight)
    this.cigar= new Cigar(this.ctx,this.gameWidth,this.gameHeight)
    

    this.currentTarget = undefined

    this.isSuper = false
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
    this.drawSuperBar()
    this.drawItems()
    this.animate(framesCounter) //Funcion que anima los frames.
    
  }
  deadDraw(framesCounter) {
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

  attackDraw(){
    this.ctx.drawImage(
      this.attackImg,
      this.attackImg.framesIndex * Math.floor(this.attackImg.width / this.attackImg.frames), //Punto x donde empieza a recortar
      0, //Punto y donde empieza a recortar
      Math.floor(this.attackImg.width / this.attackImg.frames), //Punto x donde termina de recortar
      this.attackImg.height, //Punto y donde termina de recortar
      this.currentTarget.posX + (this.currentTarget.width/2)*Math.random(),
      this.currentTarget.posY + (this.currentTarget.height/2)*Math.random(),
      256,
      256,
      )
      
    // this.animateAttack() //Funcion que anima los frames.
  }

  superAttack(){
    return this.superDmg
  }

  loadSuper(framesCounter){
    if(this.superDmg<=100){
      if(framesCounter % 100 == 0){
        this.superDmg+=10
      }
    }else{
      this.isSuper = true
    }
  }


  recieveDamage(dmg){
    if(this.life <= 0){
      this.isDead = true
    }else{
      this.life -= dmg
    }
  }

  drawSuperBar(){
    this.ctx.fillStyle = 'black'
    this.ctx.strokeRect(this.posX, this.posY-40, 100, 30)
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.posX, this.posY-40, 100, 30)
    this.ctx.fillStyle = 'blue'
    this.ctx.fillRect(this.posX, this.posY-40, this.superDmg, 30)
  }
  

  drawLifeBar(){
    this.ctx.fillStyle = 'black'
    this.ctx.strokeRect(this.posX, this.posY, 250, 30)
    this.ctx.fillStyle = 'white'
    this.ctx.fillRect(this.posX, this.posY, 250, 30)
    this.ctx.fillStyle = 'green'
    this.ctx.fillRect(this.posX, this.posY, this.life, 30)
  }

  drawItems(){
    this.beer.draw()
    this.razor.draw()
    this.cigar.draw()
  }

  setListeners() {
    document.onkeypress = e => {
      if(!this.isDialoging){
        switch (e.keyCode) {
        case this.keys.ZETA:
          this.currentTarget.recieveDamage(this.attack())
            this.attackDraw()
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
            this.superDmg += this.cigar.action()
            break
          case this.keys.SPACE:
            console.log("Click space")
            if(this.isSuper){
              this.currentTarget.recieveDamage(this.superAttack())
              this.superDmg=0
            }
            this.bgMusic.play();
            break
          default :
            console.log(e.keyCode)
          break
        }
      }
    }
  }

}