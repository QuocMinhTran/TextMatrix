var streams = [];
var symbolSize = 30;
function setup() {
    createCanvas(
        window.innerWidth,
        window.innerHeight
    );
    var x = 0;

    for(var i =0;i<=width/symbolSize;i++){
        var stream = new Stream();
        stream.generateSymbols(x,random(-200,0));
        streams.push(stream);
        x+=symbolSize;
    } 
    textSize(symbolSize);
}

function draw() {
    background(0,150);
    streams.forEach(function(stream){
        stream.render();
    })
}

function Symbol(x,y,speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.value;
    this.switchInterval = round(random(2,20));

    this.setToRandomSymbol = function(){
        if(frameCount % this.switchInterval == 0){
            this.value = String.fromCharCode(
                0x30A0 + round(random(0,96))
            );
        }
    }    
    this.rain = function(){        
        this.y = (this.y >= height) ? 0:this.y +=this.speed;
    }
}
function Stream(){
    this.symbols = [];
    this.totalSymbols = round(random(5,20));
    this.speed = random(5,10);

    this.generateSymbols = function(x,y){ 
        for(var i=0;i<=this.totalSymbols;i++){
            symbol = new Symbol(x,y,this.speed);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y-=symbolSize;
        }
    }
    
    this.render = function(){
        this.symbols.forEach(function(symbol){
            fill(25,255,70);
            text(symbol.value,symbol.x,symbol.y);    
            symbol.rain();
            symbol.setToRandomSymbol();
        });
    }
}