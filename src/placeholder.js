const UP=1; // macros like this are fine
const RIGHT=2;
const DOWN=3;
const LEFT=4;
var gameMap=[]; // 100x100 grid for now, should not use global vars,
    // but we can fix later
var playerX=0;
var playerY=0;
/*
class Tile {
    constructor() {
        this.owner=0; // 0 is not owned, 1 is player owned, 2+ are AI
        this.farmBuf=0;
        this.mineBuf=0;
        this.bankBuf=0;
        this.baseBuf=0;
        this.labBuf=0;
        this.courtBuf=0;
        this.templeBuf=0;
    }
    // interface for setting tile info
    setOwner: function(x) {
        this.owner=x;
    }
    setFarmBuf: function(x) {
        this.farmBuf=x;
    }
    setMineBuf: function(x) {
        this.mineBuf=x;
    }
    setBankBuf: function(x) {
        this.bankBuf=x;
    }
    setBaseBuf: function(x) {
        this.baseBuf=x;
    }
    setLabBuf: function(x) {
        this.labBuf=x;
    }
    setCourtBuf: function(x) {
        this.courtBuf=x;
    }
    setTempleBuf: function(x) {
        this.templeBuf=x;
    }
    // interface for getting tile info
    getOwner: function() {
        return this.owner;
    }
    getFarmBuf: function(x) {
        return this.farmBuf;
    }
    getMineBuf: function(x) {
        return this.mineBuf;
    }
    getBankBuf: function(x) {
        return this.bankBuf;
    }
    getBaseBuf: function(x) {
        return this.baseBuf;
    }
    getLabBuf: function(x) {
        return this.labBuf;
    }
    getCourtBuf: function(x) {
        return this.courtBuf;
    }
    getTempleBuf: function(x) {
        return this.templeBuf;
    }
}
*/
function populateGameState() {
    gameMap=[];
    playerY=50;
    playerX=50;
    var charCount=0;
    var r=2;
    var g=2;
    var b=2;
    var chars="qwerty";
    var tempRow=[];
    var tempStr="";
    for(var k=0;k<10;k++) {
        tempRow=[]
        tempStr=""
        for(var k1=0;k1<100;k1++) {
            charCount++;
            r=(r*r)%265;
            g=(g*g*g)%256;
            b=(b*b*b*b)%256; // shitty rng
            tempStr=tempStr+"<div style=\"color:rgb("+
                +r+","
                +g+","
                +b
                +"); display:inline-block;\">"
                +chars.charAt(charCount%chars.length);
                +"</div>";
            tempRow.push(tempStr);
        }
        gameMap.push([tempStr]);
        console.log("Row "+k);
    }
}
function gameStateToHtml() {
    var ret="";
    for(var k=0;k<gameMap.length;k++) {
        ret=ret+"<p>"
        for(var k1=0;k1<gameMap[k].length;k1++) {
            if(playerY==k && playerX==k1) {
                ret=ret+"<b>"+gameMap[k][k1]+"</b>"
            }
            else {
                ret=ret+gameMap[k][k1];
            }
        }
        ret=ret+"</p>";
    }
    return ret;
}
function movePlayer(direction) {
    if(direction==UP) {
        playerY--;
    }
    if(direction==DOWN) {
        playerY++;
    }
    if(direction==LEFT) {
        playerX--;
    }
    if(direction==RIGHT) {
        playerX++;
    }
}
function updateWindow() {
    (document.getElementById("game-window")).innerHTML=gameStateToHtml();
    console.log("Hello, World!");
}
/*
document.onkeypress(function(e) {
    var dir=-1;
    if(e.keyCode=38) {
        dir=UP;
    }
    if(e.keyCode==39) {
        dir=RIGHT;
    }
    if(e.keyCode==40) {
        dir=DOWN;
    }
    if(e.keyCode==37) {
        dir=LEFT;
    }
    movePlayer(dir);
});
*/
$(document).ready(function() {
    populateGameState();
    //gameMap=["buttwhole"];
    updateWindow();
    //$("div").fadeOut(1000);
});
