class Item {
    contructor(ctx,w,h){
    }
    getUses(){
        return this.uses
    }

    setUses(num){
        this.uses = num
    }
}

class Beer{
    constructor(ctx,w,h){
        this.ctx=ctx
        this.gameWidth = w
        this.gameHeight = h
        this.width = 30
        this.height = 30
        this.image = new Image()
        this.image.src = "img/itemPlaceholder.png"
        this.posX = this.gameWidth *0.03
        this.posY = this.gameHeight - this.height
        this.uses = 3;
    }

    getUses(){
        return this.uses
    }

    setUses(num){
        this.uses = num
    }
    
    function(){
        this.uses--
        return 40
    }
        
    draw(){
        this.ctx.drawImage(this.image,this.posX,this.posY,this.width,this.height)
        this.ctx.font = '10px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`${this.uses}`, this.posX, this.posY-this.height-5);
    }
}

class Cigar extends Item{
    constructor(ctx,w,h){
        super(ctx,w,h)
        this.ctx=ctx
        this.image = new Image()
        this.image.src = "img/itemPlaceholder.png"
        this.posX = this.gameWidth *0.03+30
        this.posY = this.gameHeight - this.height
        this.uses=1
    }
    function(){
        this.uses--
        return 100
    }
    draw(){
        this.ctx.drawImage(this.image,this.posX,this.posY,this.width,this.height)
        this.ctx.font = '10px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`${this.uses}`, this.posX, this.posY-this.height-5);
    }
}

class Razor extends Item{
    constructor(ctx,w,h){
        super(ctx,w,h)
        this.ctx=ctx
        this.image = new Image()
        this.image.src = "img/itemPlaceholder.png"
        this.posX = this.gameWidth *0.03+60
        this.posY = this.gameHeight - this.height
        this.uses=1
    }
    function(){
        this.uses--
        return 20
    }
    draw(){
        this.ctx.drawImage(this.image,this.posX,this.posY,this.width,this.height)
        this.ctx.font = '10px Arial';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`${this.uses}`, this.posX, this.posY-this.height-5);
    }
}
