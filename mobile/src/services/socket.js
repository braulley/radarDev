import socketio from 'socket.io-client'

const socket = socketio('http://10.10.10.90:3000', {
    autoConnect: false,
})

function subscribeToNewDevs(subscribeFunction) {
    socket.io('new-dev', subscribeFunction)
}


function connect(latitude, longitude, tech) {
    socket.io.opts.query = {
        latitude,
        longitude,
        tech
    }
    
    
    socket.connect()
}

function disconnect() {
    if(socket.disconnect) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}