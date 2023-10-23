import useWebSocket from 'react-use-websocket';

const WS_URL = 'ws://127.0.0.1:8001/ws/notification/';

function WebSocket() {
    useWebSocket(WS_URL, {
        onOpen: () => {
            // console.log('WebSocket connection established.');
        },
        onMessage: (event) => {
            // Handle the received message here
            console.log('Received message:', event.data);
            // You can update your component's state or take any other actions with the message
        },
    });

    return (
        <div>Hello WebSockets!</div>
    );
}

export default WebSocket;