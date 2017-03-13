const UP=1; // macros like this are fine
const RIGHT=2;
const DOWN=3;
const LEFT=4;
const WINDOW_HEIGHT=50;
const WINDOW_WIDTH=100;
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
    playerY=25;
    playerX=50;
    var charCount=0;
    var r=3;
    var g=5;
    var b=7;
    var chars="qwerty";
    var tempRow=[];
    var tempStr="";
    for(var k=0;k<WINDOW_HEIGHT;k++) {
        tempRow=[]
        tempStr=""
        for(var k1=0;k1<WINDOW_WIDTH;k1++) {
            charCount++;
            r=(r*r)%265;
            g=(g*g*g)%256;
            b=(b*b*b*b)%256; // shitty rng
            tempStr="<div "
                +"id=\"x"+k1+"y"+k+"\" "
                +"style=\"color:rgb("+
                +r+","
                +g+","
                +b
                +"); display:inline-block;\"><span style=\"background-color:#000010; line-height:0%;\">"
                +chars.charAt(charCount%chars.length)
                +"</span></div>";
            tempRow.push(tempStr);
        }
        gameMap.push(tempRow);
    }
}
function gameStateToHtml() {
    var ret="";
    for(var k=0;k<gameMap.length;k++) {
        ret=ret+"<p>";
        for(var k1=0;k1<gameMap[k].length;k1++) {
            ret=ret+gameMap[k][k1];
        }
        ret=ret+"</p>";
    }
    return ret;
}
function updateWindow() {
    (document.getElementById("game-window")).innerHTML=gameStateToHtml();
    var oldHtml=document.getElementById("x"+playerX+"y"+playerY).innerHTML;
    document.getElementById("x"+playerX+"y"+playerY).innerHTML="<b>"+oldHtml+"</b>";
}
function movePlayer(direction) {
    var oldHtml=document.getElementById("x"+playerX+"y"+playerY).innerHTML;
    document.getElementById("x"+playerX+"y"+playerY).innerHTML=oldHtml.slice(3,-4);
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
    playerY=playerY%WINDOW_HEIGHT;
    playerX=playerX%WINDOW_WIDTH;
    oldHtml=document.getElementById("x"+playerX+"y"+playerY).innerHTML;
    document.getElementById("x"+playerX+"y"+playerY).innerHTML="<b>"+oldHtml+"</b>";
    updateWindow();
}
$(document).keypress(function(event) {
    var moveChar="x";
    var dir=-1;
    if(String.fromCharCode(event.which)=="w") {
        console.log("up");
        dir=UP;
    }
    if(String.fromCharCode(event.which)=="d") {
        console.log("right");
        dir=RIGHT;
    }
    if(String.fromCharCode(event.which)=="s") {
        console.log("down");
        dir=DOWN;
    }
    if(String.fromCharCode(event.which)=="a") {
        console.log("left");
        dir=LEFT;
    }
    movePlayer(dir);
});

$(document).ready(function() {
    populateGameState();
    updateWindow();
});
