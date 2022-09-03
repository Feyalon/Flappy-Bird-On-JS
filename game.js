var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";
var gap = 90;

var xpos = 10;
var ypos = 150;
var grav = 1;
var score = 0;


var pipe = [];
pipe[0] = {
    x : cvs.width,
    y : 0
}

document.addEventListener("keydown", moveup);
function moveup(){
    ypos -= 25; 
}



function draw(){
    ctx.drawImage(bg, 0, 0);

     
    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
        pipe[i].x--;
        if(pipe[i].x == 50) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }
        if(xpos + bird.width >= pipe[i].x
            && xpos <= pipe[i].x + pipeUp.width
            && (ypos <= pipe[i].y + pipeUp.height
            || ypos + bird.height >= pipe[i].y + pipeUp.height + gap) || ypos + bird.height >= cvs.height - fg.height) {
            location.reload(); 

            }
            if (pipe[i].x == 5){
                score++;
            }
        ctx.drawImage(fg, 0, 400)
        ctx.fillStyle = "#000"
        ctx.font = "24px Verdana"
        ctx.fillText("Счет " + score, 10, cvs.height - 20)
    }
    ctx.drawImage(bird, xpos, ypos)
    ypos += grav
    requestAnimationFrame(draw)
    
}
pipeBottom.onload = draw;