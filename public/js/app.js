
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

var socket = io();
const recSize = 28;

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var canvas2 = document.getElementById("myCanvas2");
var ctx2 = canvas2.getContext("2d");

//ctx2.clearRect(0, 0, canvas.width, canvas.height);
for (let i = 0; i < 50; i++) {

    let img = new Image();
    img.onload = function () {
        console.log();
        ctx2.drawImage(img, 70 * getRandomInt(14), 70 * getRandomInt(10));
    };
    if (getRandomInt(2) == 0) {
        img.src = '/img/green.jpeg';
    }else{
        img.src = '/img/fleur2.png';
    }
   

}

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {

        socket.emit('chat message', 'right');
    }
    if (e.key == "Left" || e.key == "ArrowLeft") {

        socket.emit('chat message', 'left');
    }
    if (e.key == "Up" || e.key == "ArrowUp") {

        socket.emit('chat message', 'up');
    }
    if (e.key == "Down" || e.key == "ArrowDown") {

        socket.emit('chat message', 'down');
    }
}

let img2 = new Image();

socket.on('chat message', function (msg) {

    img2.onload = function () {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const i of msg) {

            ctx.drawImage(img2, 0, i.direction, 28, 32, (i.x * recSize), (i.y * recSize), 28, 32);
        }
    };

    img2.src = '/img/sprite.png';

});