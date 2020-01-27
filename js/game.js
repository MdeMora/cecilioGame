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

    init(){
        this.canvas=document.getElementById("myCanvas")
        this.ctx= this.canvas.getContext("2d")
        this.width = window.innerWidth
        this.height = window.innerHeight * 0.995
        this.canvas.width = this.width
        this.canvas.height = this.height
        this.start()
    },
    start() {
        this.reset() // Reiniciamos configuración del juego
        this.interval = setInterval(() => {
            this.framesCounter++
            if (this.framesCounter > 1000) this.framesCounter = 0
            this.clear()
            this.drawAll()
            this.moveAll()
            
            if(this.framesCounter % 20 == 0) this.actions()
        }, 1000 / this.fps)
    },

    actions(){
        this.ceci.recieveDamage(this.arrFlacos[this.fkCounter].attack())
        if(this.ceci.isDead){
            this.gameOver()
        }

        if(this.arrFlacos[this.fkCounter].isDead){
            // console.log("Flaquito muerto")
            this.fkCounter++
            // console.log("Añadiendo flaco")
            this.arrFlacos.push(new Flaco(this.ctx,this.canvas.width,this.canvas.height))
            this.arrFlacos[this.fkCounter].life += 20
            this.arrFlacos[this.fkCounter].dmg += 0.5
            console.log(`arrFlacos ${this.arrFlacos}`)
            this.ceci.setCurrentTarget(this.arrFlacos[this.fkCounter])
        }
    },
    
    reset(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.back = new Background(this.ctx,this.canvas.width,this.canvas.height)
        this.ceci = new Ceci(this.ctx,this.canvas.width,this.canvas.height,this.keys)
        this.flaco = new Flaco(this.ctx,this.canvas.width,this.canvas.height)
        this.ceci.setCurrentTarget(this.flaco)
        this.arrFlacos.push(this.flaco)
        

    },
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    drawAll(){
        this.back.draw()
        this.ceci.draw(this.framesCounter)
        this.arrFlacos[this.fkCounter].draw(this.framesCounter)
        
    },
    moveAll(){
        
    },
    gameOver() {
        //Gameover detiene el juego.
        clearInterval(this.interval);
        console.log("HAS PERDIDO PANOLI")
      }
}   