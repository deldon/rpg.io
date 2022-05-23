const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const random_hex_color_code = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};
let player = []

const sizeMap = {
  x: 34,
  y: 25
}


io.on('connection', (socket) => {




  // creation du player

  const newPlayer = {
    id: socket.id,
    name: 'player',
    color: random_hex_color_code(),
    direction: 0,
    x: 0,
    y: 0
  }
  player.push(newPlayer);
  console.log('new player: ', player);
  io.emit('chat message', player);





  socket.on('chat message', (msg) => {


    const myPlayerId = (element) => element.id == socket.id;
    const persoId = player.findIndex(myPlayerId)
    const vitesse = 1;

    if (msg == 'right') {
      if (player[persoId].x < sizeMap.x) {
        // console.log((player[persoId].x + vitesse) == objs.x);
        const free = player.some((objs) => {

          if ((player[persoId].x + vitesse) == objs.x && player[persoId].y == objs.y) {
            return true
          }
          return false
        })
        if (!free) {
          player[persoId].x = player[persoId].x + vitesse;
          //player[persoId].direction = 64;
        }
      }
      player[persoId].direction = 64;

    }
    if (msg == 'left') {
      if (player[persoId].x > 0) {


        const free = player.some((objs) => {

          if ((player[persoId].x - vitesse) == objs.x && player[persoId].y == objs.y) {
            return true
          }
          return false
        })
        if (!free) {
          player[persoId].x = player[persoId].x - vitesse;
          
        }
      }
      player[persoId].direction = 32
    }
    if (msg == 'up') {
      if (player[persoId].y > 0) {

        const free = player.some((objs) => {

          if ((player[persoId].y - vitesse) == objs.y && player[persoId].x == objs.x) {
            return true
          }
          return false
        })
        if (!free) {
          player[persoId].y = player[persoId].y - vitesse;
          
        }



      }
      player[persoId].direction = 96;
    }
    if (msg == 'down') {
      if (player[persoId].y < sizeMap.y) {

        const free = player.some((objs) => {

          if ((player[persoId].y + vitesse) == objs.y && player[persoId].x == objs.x) {
            return true
          }
          return false
        })
        if (!free) {
          player[persoId].y = player[persoId].y + vitesse;
          
        }


      }
      player[persoId].direction = 0;
    }

    io.emit('chat message', player);
    // console.log(player);


    // console.log('message: ' + msg);
  });

  socket.on('disconnect', () => {
    const myPlayerId = (element) => element.id == socket.id;
    const persoId = player.findIndex(myPlayerId)

    player.splice(persoId, 1);
    io.emit('chat message', player);

  });
});
app.use(express.static('./public'));
server.listen(3000, () => {
  console.log('listening on *:3000');
});

