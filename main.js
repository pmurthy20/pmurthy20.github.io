

var c = document.getElementById("canvas");
ctx = c.getContext("2d");
var move = 5;
var x = 400;
var y = 400;
var timer = 0;
framerate = 5;
enabled = true;
grow = false;
var segments = [];
var xlist = [];
var ylist = [];
var length = 1;
xlist[0] = 400;
ylist[0] = 400;
ctx.fillRect(xlist[0], ylist[0], 20, 20);

window.requestAnimationFrame(gameLoop);
function gameLoop() {
    if (timer <= framerate) {
        timer++;
    } else {
        moveHandler();
        timer = 0;
    }
    window.requestAnimationFrame(gameLoop);
}


function updateDir() {
    if (length > 1) {
        for (let z = 0; z < length; z++) {
            segments[z+1] = segments[z];
        }
        segments[0] = move;
    } 
    segments[0] = move;
}

function draw() {
    for (let z = 0; z < length; z++) {
        var segmove = segments[z];
        switch (segmove) {
            case 0:
                // console.log(segments);
                ctx.clearRect(xlist[z], ylist[z], 20, 20);
                xlist[z] -= 20;
                ctx.fillRect(xlist[z], ylist[z], 20, 20);
                break;
            case 1:
                ctx.clearRect(xlist[z], ylist[z], 20, 20);
                ylist[z] -= 20;
                ctx.fillRect(xlist[z], ylist[z], 20, 20);
                break;
            case 2:
                ctx.clearRect(xlist[z], ylist[z], 20, 20);
                xlist[z] += 20;
                ctx.fillRect(xlist[z], ylist[z], 20, 20);
                break;
            case 3:
                ctx.clearRect(xlist[z], ylist[z], 20, 20);
                ylist[z] += 20;
                ctx.fillRect(xlist[z], ylist[z], 20, 20);
                break;
        }
    }
}

function updatePos() {

}

function moveHandler() {
   updateDir();
   console.log(segments);
   updatePos();
   draw();
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 39) {
        move = 2;
        // length += 1;
        // console.log(length);
    }
    else if(event.keyCode == 37) {
        move = 0;
    }
    else if(event.key == "ArrowUp") {
        move = 1;
    }
    else if(event.key == "ArrowDown") {
        move = 3;
    }
    else if (event.keyCode == 32) {
        length += 1;
        console.log(length);
    }
});


