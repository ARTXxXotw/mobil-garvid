import { io } from "socket.io-client";

const SOCKET_URL = 'https://markazback2.onrender.com'

class WSServise {
    initializeSocket = async() => {
        try {
            this.socket = io(SOCKET_URL, {
                transports: ['websocket']
            })
            console.log("initializing socket ", this.socket)
            
            this.socket.on('connect', (data) => {
                console.log("=== socket connected ===");
            })
            this.socket.on('disconnect', (data) => {
                console.log("=== socket disconnected ===");
            })
            this.socket.on('error', (data) => {
                console.log("socket error ", data);
            })
        } catch (error) {
            console.log("error Socket ",error);
        }
    }

    emit(event, data = {}){
        this.socket.emit(event, data)
    }
    
    on(event, cb){
        this.socket.on(event, cb)
    }
    
    removeListener(listenerName){
        this.socket.removeListener(listenerName)
    }
}


const socketServices = new WSServise() 
export default socketServices