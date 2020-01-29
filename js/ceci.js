class Ceci {
    constructor(ctx,w,h,keyCode,isDialoging,framesCounter){
    this.ctx = ctx
    this.gameWidth = w
    this.gameHeight = h
    this.framesCounter=framesCounter

    
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
    
    this.attackAImg= new Image()
    this.attackAImg.src = "img/attack1.png"
    this.attackAImg.frames = 7
    this.attackAImg.framesIndex = 0

    this.attackBImg= new Image()
    this.attackBImg.src = "img/attack2.png"
    this.attackBImg.frames = 7
    this.attackBImg.framesIndex = 0

    this.healEffect = new Image()
    this.healEffect.src = "img/heal.png"
    this.healEffect.frames = 4
    this.healEffect.framesIndex = 0

    this.razorEffect = new Image()
    this.razorEffect.frames = 3
    this.razorEffect.src = "img/razor.png"
    this.razorEffect.framesIndex = 0


    
    this.keys = keyCode
    this.isDialoging = isDialoging

    this.life=250
    this.dmg=2
    this.superDmg=0

    this.beer= new Beer(this.ctx,this.gameWidth,this.gameHeight)
    this.razor= new Razor(this.ctx,this.gameWidth,this.gameHeight)
    this.cigar= new Cigar(this.ctx,this.gameWidth,this.gameHeight)
    

    this.currentTarget = undefined

    this.isSuper = false
    this.isDead = false
    this.wantAttackAMotion=false
    this.wantAttackBMotion=false
    this.wantHealMotion=false
    this.wantRazorMotion=false

    this.setListeners() //Llamamos al listener para que desde el primer momento el jugador responda.
  }

  draw() {
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
    this.animate() //Funcion que anima los frames.
    
    
  }
  drawAnimations(){
    this.attackADraw()
    this.attackBDraw()
  }

  dialogueDraw(){
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

      this.animate() //Funcion que anima los frames.

  }
  winDraw() {
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
      
    this.animate() //Funcion que anima los frames.
    
  }
  deadDraw() {
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
      
    this.deadAnimate() //Funcion que anima los frames.
    
  }

  setCurrentTarget(obj){
    this.currentTarget=obj
  }

  animate() {
    if (this.framesCounter % 20 == 0) {
      this.image.framesIndex++ //Cambiamos el frame de la imagen cada 5 fps.
      if (this.image.framesIndex > 2) {
        this.image.framesIndex = 0
      }
    }
  }

  deadAnimate() {
    if (this.framesCounter % 20 == 0) {
      this.image.framesIndex++ //Cambiamos el frame de la imagen cada 5 fps.
      if (this.image.framesIndex > 1) {
        this.image.framesIndex = 0
      }
    }
  }

  attack(){
    return this.dmg
  }
  
  //se podrian reducir a una funcion utilizando un parametro para añadir/reducir daño
  superAttack(){
    return this.superDmg
  }

  attackADraw(){
    this.randomNumber ? null : this.randomNumber = Math.random()
    if(this.wantAttackAMotion){
      this.ctx.drawImage(
        this.attackAImg,
        0, //Punto x donde empieza a recortar
        this.attackAImg.framesIndex * Math.floor(this.attackAImg.height / this.attackAImg.frames), //Punto y donde empieza a recortar
        this.attackAImg.width, //Punto x donde termina de recortar
        Math.floor(this.attackAImg.height / this.attackAImg.frames), //Punto y donde termina de recortar
        this.currentTarget.posX + (this.currentTarget.width/2)*this.randomNumber,
        this.currentTarget.posY + (this.currentTarget.height/2)*this.randomNumber,
        256,
        64
        )
        this.animateAttackA()
    }   
    // this.animateAttack() //Funcion que anima los frames.
  }

  attackBDraw(){
    this.randomNumber ? null : this.randomNumber = Math.random()
    if(this.wantAttackBMotion){
      this.ctx.drawImage(
        this.attackBImg,
        0, //Punto x donde empieza a recortar
        this.attackBImg.framesIndex * Math.floor(this.attackBImg.height / this.attackBImg.frames), //Punto y donde empieza a recortar
        this.attackBImg.width, //Punto x donde termina de recortar
        Math.floor(this.attackBImg.height / this.attackBImg.frames), //Punto y donde termina de recortar
        this.currentTarget.posX + (this.currentTarget.width/2)*this.randomNumber,
        this.currentTarget.posY + (this.currentTarget.height/2)*this.randomNumber,
        256,
        256
        )
        this.animateAttackB()
    }
  // this.animateAttack() //Funcion que anima los frames.
}
  //animateattack dice activar la animacion
  //cuando llega el ultimo sprite dice desactivar animacion
  animateAttackA(){ 
    if (this.framesCounter % 2 === 0) {
      this.attackAImg.framesIndex++ //Cambiamos el frame de la imagen cada 5 fps.
      if (this.attackAImg.framesIndex > this.attackAImg.frames ) {
        this.attackAImg.framesIndex = 0
        this.wantAttackAMotion=false
        this.randomNumber = undefined
      }
    }
  }

  animateAttackB(){ 
    if (this.framesCounter % 2 == 0) {
      this.attackBImg.framesIndex++ //Cambiamos el frame de la imagen cada 5 fps.
      if (this.attackBImg.framesIndex > this.attackBImg.frames ) {
        this.attackBImg.framesIndex = 0
        this.wantAttackBMotion=false
        this.randomNumber = undefined
      }
    }
  }

  loadSuper(){
    if(this.superDmg<=100){
      if(this.framesCounter % 100 == 0){
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
          this.wantAttackAMotion=true
          this.currentTarget.recieveDamage(this.attack())
            break
        case this.keys.X:
          this.wantAttackBMotion=true
          this.currentTarget.recieveDamage(this.attack())
            break
        case this.keys.Q:
          this.wantHealMotion=true
          this.life += this.beer.action()
            break
        case this.keys.W:
          this.wantMotion=true
          this.dmg += this.razor.action()
            break
        case this.keys.E:
          this.superDmg += this.cigar.action()
            break
        case this.keys.SPACE:
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