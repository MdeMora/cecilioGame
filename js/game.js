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
    arrFlacos:[], // ARREGLAR ESTO CON PUSH Y POP Y ESO
    fkCounter:0,
    fklife:100,
    fkDmg:1,
    fkLife:100,
    stage:1,
    isDialoging:false,

    //------FUNCIONES BASICAS DEL JUEGO------
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
//switch
            if(this.stage===1){
                this.ceci.framesCounter=this.framesCounter
                this.clear()
                this.flacoDrawAll()
                this.ceci.loadSuper()
                if(this.framesCounter % 25 == 0) this.flacoActions()

            }else if(this.stage===2){
                this.ceci.framesCounter=this.framesCounter
                
                if(!this.isDialoging){
                    this.bossDrawAll()
                    this.ceci.loadSuper()
                    if(this.framesCounter % 15 == 0) this.bossActions()
                }

            }else if(this.stage===3){
                this.ceci.framesCounter=this.framesCounter

                this.clear
                this.endDrawAll()
            }else if(this.stage===4){
                this.ceci.framesCounter=this.framesCounter

                this.clear
                this.winDrawAll()
            }

        }, 1000 / this.fps)
    },//INTERVALO
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    //------ STAGE 1 - FLACO ----------
    flacoActions(){
        this.ceci.recieveDamage(this.arrFlacos[this.fkCounter].attack())
        if(this.ceci.isDead){
            this.gameOver()
        }

        if(this.arrFlacos[this.fkCounter].isDead){
            // console.log("Flaquito muerto")
            this.arrFlacos[this.fkCounter].rngItems()
            this.ceci.life+=10
            this.fkDmg+=0.3
            this.fkCounter++
            if(this.fkLife<200)this.fkLife+=10
            // console.log("Añadiendo flaco")
            //en lugar de isdead, eliminar enemigo del array y que ceci ataque siempre a enemigos[0]
            // o sustituyendo una propiedad
            this.arrFlacos.push(new Flaco(this.ctx,this.canvas.width,this.canvas.height,this.ceci))
            this.arrFlacos[this.fkCounter].life = this.fkLife
            this.arrFlacos[this.fkCounter].barW = this.fkLife
            console.log(this.arrFlacos[this.fkCounter].life)
            this.arrFlacos[this.fkCounter].dmg = this.fkDmg
            console.log(this.arrFlacos[this.fkCounter].dmg)

            this.ceci.setCurrentTarget(this.arrFlacos[this.fkCounter])
        }

        if(this.fkCounter===10){
            this.setBossFight()
        }
    },
    
    flacoDrawAll(){
        this.back.draw()
        this.arrFlacos[this.fkCounter].draw(this.framesCounter)
        this.ceci.draw()
        this.ceci.drawAnimations()
    }, 

    //------ STAGE 2- DIALOG--------
    dialogueDraw(){
        this.clear()
        this.back.draw()
        this.tangana.staticDraw()
        this.ceci.dialogueDraw()
    },

    //------ STAGE 2 - BOSSFIGHT ----------
    setBossFight(){
        this.back.image.src="img/bg4.jpg"
        this.ceci.setCurrentTarget(this.tangana)
        this.ceci.life=250
        this.stage=2
        this.isDialoging=true
        this.ceci.isDialoging=true
        
        setTimeout(() => {
            this.dialogueDraw(this.framesCounter)
            setTimeout(() => {
                alert("han pasado 10 segundo")
                this.isDialoging=false
                this.ceci.isDialoging=false
                this.tangana.image.src="img/ctSprite.png"
            }, 2000);
        },100);
    },
    bossDrawAll(){
        this.back.draw()
        this.ceci.draw()
        this.tangana.motionDraw(this.framesCounter)
    },
    bossActions(){
        console.log("he sido llamado")
        this.ceci.recieveDamage(this.tangana.attack())
        if(this.ceci.isDead){
            this.tangana.image.src="img/tangawin.png"
            this.gameOver()
        }
        if(this.tangana.isDead){
            this.gameWin()
        }
    },

    //------ STAGE 4 - WIN ----------
    winDrawAll(){
        this.back.image.src="img/bg2.png"
        this.tangana.image.src="img/deadTangana.png"
        this.back.draw()
        this.ceci.winDraw()
        this.tangana.staticDraw()
    },
    gameWin(){
        this.stage=4
        console.log("HAS GANADO PERO SIGUES SIENDO UN PANOLI")
    },

    //-------STAGE 3 - PANOLI- -------
    endDrawAll(){
        
        this.back.image.src="img/endBG.png"
        this.ceci.image.src="img/deadCeciSprite.png"
        this.ceci.image.frames=2
        this.ceci.posX=0

        this.back.draw()
        this.ceci.deadDraw()
        this.tangana.staticDraw()
        
    },
    gameOver() {
        //Gameover detiene el juego.
        this.stage=3
        console.log("HAS PERDIDO PANOLI")
      }
}   