const UP=1; // macros like this are fine
const RIGHT=2;
const DOWN=3;
const LEFT=4;
var gameMap=[]; // 100x100 grid for now, should not use global vars,
    // but we can fix later
var playerX=0;
var playerY=0;

function populateGameState() {
    gameMap=[];
    playerY=50;
    playerX=50;
    var charCount=0;
    var r=2;
    var g=2;
    var b=2;
    for(var k=0;k<100;k++) {
        var tempRow=[];
        var chars="qwerty";
        for(var k1=0;k1<100;k1++) {
            charCount++;
            r=(r*r)%265;
            g=(g*g*g)%256;
            b=(b*b*b*b)%256; // shitty rng
            tempStr="<div style=\"color:rgb("+
                +r+","
                +g+","
                +b
                +")\">"
                +chars.charAt(charCount%chars.length);
                +"</div>";
            tempRow.push(tempStr);
        }
        gameMap.push(tempRow);
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
    (document.getElementById("game-window")).innerHTML(gameStateToHtml());
}
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
document.ready(function() {
    populateGameState();
    updateWindow();
});
