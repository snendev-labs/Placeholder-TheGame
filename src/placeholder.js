// macros like this are fine
// window size macros
const WINDOW_HEIGHT=50;
const WINDOW_WIDTH=100;
// direction macros
const UP=1;
const RIGHT=2;
const DOWN=3;
const LEFT=4;
// tile land type macros
const BORINGLAND=0;
const FARMLAND=1;
const SAND=2;
const WATER=3;
const ROCK=4;
// tile structure type
const NOSTRUCT=0;
const FARM=1;
const MINE=2;
const BASE=3
const BANK=4;
// the gamestate
var gameMap=[]; // 100x100 grid for now, should not use global vars,
    // but we can fix later
var playerX=0; //
var playerY=0;
// some object prototypes
var blankTile={
    owner:0, // 0 is not owned, 1 is player owned, 2+ are AI
    farmBuf:0, // bufs should be double from 0 to 1
    mineBuf:0,
    bankBuf:0,
    baseBuf:0,
    labBuf:0,
    courtBuf:0,
    templeBuf:0,
    landType:0, // see macros above
    structType:0 // see macros above
};
// basic functions
function randomTile() {
    var tile=blankTile;
    tile.owner=Math.floor(Math.random()*3); // 0 is not owned, 1 is player owned, 2+ are AI
    tile.farmBuf=Math.random();//(tileCount%5)/5.0; // bufs should be double from 0 to 1
    tile.mineBuf=Math.random();
    tile.bankBuf=Math.random();
    tile.baseBuf=Math.random();
    tile.landType=Math.floor(Math.random()*5); // see macros above
    tile.structType=Math.floor(Math.random()*5); // see macros above
    return tile;
}
function populateGameState() {
    gameMap=[];
    playerY=25;
    playerX=50;
    var tempRow=[];
    var tempStr="";
    for(var k=0;k<WINDOW_HEIGHT;k++) {
        tempRow=[]
        for(var k1=0;k1<WINDOW_WIDTH;k1++) {
            var tile=randomTile();
            tempRow.push(tile);
        }
        gameMap.push(tempRow);
    }
}
function tileToHtml(tile,x,y) {
    var ret="";
    var background="background-color:rgb(";
    var tileChar="";
    var r=0;
    var g=0;
    var b=0;
    if(tile.landType==FARMLAND) {
        if(tile.farmBuf>0.5) {
            g=256;
        }
        else {
            g=128;
        }
    }
    else if(tile.landType==SAND) {
        if(tile.bankBuf>0.5) {
            g=256;
            b=256;
        }
        else {
            g=128;
            b=128;
        }
    }
    else if(tile.landType==WATER) {
        b=256;
    }
    else if(tile.landType==ROCK) {
        if(tile.mineBuf>0.5) {
            ; // do nothing
        }
        else {
            r=128;
            g=128;
            b=128;
        }
    }
    else { // if(tile.landType==BORINGLAND)
        r=256;
        b=256;
        g=256;
    }
    background=background+r+","+g+","+b+");"
    if(tile.structType==FARM) {
        tileChar="Ψ";
    }
    else if(tile.structType==MINE) {
        tileChar="R";
    }
    else if(tile.structType==BASE) {
        tileChar="垒";
    }
    else if(tile.structType==BANK) {
        tileChar="$";
    }
    else if(tile.structType==NOSTRUCT) {
        tileChar="/";
    }
    else {
        tileChar="\\";
    }
    ret="<span id=\"x"+x+"y"+y+"\" style=\""+background+" line-height:0px;\">"+tileChar+"</span>";
    return ret;
}
function gameMapToHtml() {
    var ret="";
    for(var k=0;k<gameMap.length;k++) {
        ret=ret+"<p>";
        for(var k1=0;k1<gameMap[k].length;k1++) {
            ret=ret+tileToHtml(gameMap[k][k1],k1,k);
        }
        ret=ret+"</p>";
    }
    return ret;
}
function updateWindow() {
    (document.getElementById("game-window")).innerHTML=gameMapToHtml();
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
// jQuery functions
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
