class yonkiBeer{
    constructor(ctx,w,h){
        this.ctx = ctx
        this.gameWidth = w
        this.gameHeight = h

        this.image = new Image()
        this.image.src = "img/itemPlaceholder.png"

        this.width = 30
        this.height = 30

        this.posX = this.gameWidth *0.65
        this.posY = this.gameHeight - this.height

    }
        increaseDmg(){
            return 20
        }
    }