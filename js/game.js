const game = {
    author: "Miguel de Mora García",
    description: "Un juego de er ceci",
    version: "1.0",
    art : "Marina Merino Redondo",
    license : "undefined",
    canvas: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    fps: 60,
    framesCounter: 0,
    keys:{
        SPACE: 32,
        ZETA: 122,
        X:120,
        Q:113,
        W:119,
        E:101
    },
    arrFlacos:[],
    fkCounter:0,
    fklife:100,
    fkDmg:1,
    fkLife:100,
    stage:1,
    isDialoging:false,

    init(){
        this.canvas=document.getElementById("myCanvas")
        this.ctx= this.canvas.getContext("2d")
        this.width = window.innerWidth
        this.height = window.innerHeight * 0.995
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.start()
    },
    reset(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.back = new Background(this.ctx,this.canvas.width,this.canvas.height)
        this.ceci = new Ceci(this.ctx,this.canvas.width,this.canvas.height,this.keys,this.isDialoging)
        this.flaco = new Flaco(this.ctx,this.canvas.width,this.canvas.height,this.ceci)
        this.tangana = new Tangana(this.ctx,this.canvas.width,this.canvas.height,this.ceci)
        this.ceci.setCurrentTarget(this.flaco)
        this.arrFlacos.push(this.flaco)
    },
    start() {
        this.reset() // Reiniciamos configuración del juego
        this.interval = setInterval(() => {
            this.framesCounter++
            if (this.framesCounter > 1000) this.framesCounter = 0

            if(this.stage===1){
                this.clear()
                this.flacoDrawAll()
                this.ceci.loadSuper(this.framesCounter)
                if(this.framesCounter % 20 == 0) this.flacoActions()

            }else if(this.stage===2){

                this.clear()
                this.bossDrawAll()
                if(!this.isDialoging){
                    this.ceci.loadSuper(this.framesCounter)
                    if(this.framesCounter % 15 == 0) this.bossActions()
                }

            }else if(this.stage===3){

                this.clear
                this.endDrawAll()
            }else if(this.stage===4){
                this.clear
                this.endDrawAll()
                console.log("cambiame")
            }

        }, 1000 / this.fps)
    },

    flacoActions(){
        this.ceci.recieveDamage(this.arrFlacos[this.fkCounter].attack())
        if(this.ceci.isDead){
            this.gameOver()
        }

        if(this.arrFlacos[this.fkCounter].isDead){
            // console.log("Flaquito muerto")
            this.arrFlacos[this.fkCounter].rngItems()
            this.ceci.life+=5
            this.fkDmg+=0.5
            this.fkCounter++
            if(this.fkLife<200)this.fkLife+=10
            // console.log("Añadiendo flaco")
            this.arrFlacos.push(new Flaco(this.ctx,this.canvas.width,this.canvas.height,this.ceci))
            this.arrFlacos[this.fkCounter].life = this.fkLife
            this.arrFlacos[this.fkCounter].barW = this.fkLife
            console.log(this.arrFlacos[this.fkCounter].life)
            this.arrFlacos[this.fkCounter].dmg = this.fkDmg
            console.log(this.arrFlacos[this.fkCounter].dmg)

            this.ceci.setCurrentTarget(this.arrFlacos[this.fkCounter])
        }

        if(this.fkCounter===2){
            this.setBossFight()
        }
    },
    
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    flacoDrawAll(){
        this.back.draw()
        this.ceci.draw(this.framesCounter)
        this.arrFlacos[this.fkCounter].draw(this.framesCounter)
    }, 

    setBossFight(){
        this.back.image.src="img/bg4.jpg"
        this.ceci.setCurrentTarget(this.tangana)
        this.ceci.life=200
        this.stage=2    
        setTimeout(() => {
            alert("hola")
            this.isDialoging=true
            this.ceci.isDialoging=true
            setTimeout(() => {
                alert("han pasado 10 segundo")
                this.isDialoging=false
                this.ceci.isDialoging=false
            }, 10000);
        },100);
    },
    bossDrawAll(){
        this.back.draw()
        this.ceci.draw(this.framesCounter)
        this.tangana.draw(this.framesCounter)
    },

    bossActions(){
        console.log("he sido llamado")
        this.ceci.recieveDamage(this.tangana.attack())
        if(this.ceci.isDead){
            this.gameOver()
        }
        if(this.tangana.isDead){
            this.gameWin()
        }
    },
    gameWin(){
        this.back.image.src="img/endBG.png"
        this.ceci.image.src="img/razor.png"
        this.ceci.image.frames=2
        this.ceci.posX=this.width/2-this.ceci.width
        this.ceci.posY=this.width/2-this.ceci.height
        
        this.stage=4
        console.log("HAS GANADO PERO SIGUES SIENDO UN PANOLI")
    },
    endDrawAll(){
        this.back.draw()
        this.ceci.deadDraw(this.framesCounter)
    },
    gameOver() {
        //Gameover detiene el juego.
        
        this.back.image.src="img/endBG.png"
        this.ceci.image.src="img/razor.png"
        this.ceci.image.frames=2
        this.ceci.posX=this.width/2-this.ceci.width
        this.ceci.posY=this.width/2-this.ceci.height
        
        this.stage=3
        
        console.log("HAS PERDIDO PANOLI")
      }
}   