const express = require('express');
const subdomain = require('express-subdomain')
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const fs = require('fs');

app.use(subdomain('teleaffect_experiment',express.static('public')));
console.log("running v0.2")
function saveData(data, filename) {
    let dataString = JSON.stringify(data);
    fs.writeFileSync("data/" + filename, dataString);
}

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('new-datum', (datum, filename) => {
        console.log(`Saving ${filename}...`);
        console.log(datum);
        saveData(datum, filename);
    })
})

server.listen(3000, () => {
    console.log('listening on *:3000');
});
