import * as WebSocket from 'ws';
export default class Master {
    constructor(options) {
        this.port = options.port || 9000;
        this.tasks = options.tasks || [];
        this.wss = null;
    }
    start() {
        this.startServer();
    }
    stop() {
        this.stopServer();
    }
    startServer() {
        if (this.wss) {
            return;
        }
        this.wss = new WebSocket.Server({
            port: this.port
        });
        this.wss.on('connection', this.onWorkerConnected.bind(this));
        this.wss.on('message', this.onMessageReceived.bind(this));
    }
    stopServer() {
        if (this.wss) {
            this.wss.close();
            this.wss = null;
        }
    }
    onWorkerConnected(ws) {
        console.log('Worker connected');
        ws.on('message', (data) => {
            this.onMessageReceived(ws, data);
        });
    }
    onMessageReceived(ws, data) {
        console.log('Message received from worker', ws, data);
    }
}
