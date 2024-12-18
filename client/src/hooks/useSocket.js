// Implement a custom React hook (useSocket.js) to connect to the Socket.IO server and listen for events.
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const useSocket = (url) => {
    const socketRef = useRef();

    useEffect(() => {
        // Initialize socket connection
        socketRef.current = io(url);

        // Cleanup on unmount
        return () => {
            socketRef.current.disconnect();
        };
    }, [url]);

    const sendMessage = (event, message) => {
        socketRef.current.emit(event, message);
    };

    const listenToEvent = (event, callback) => {
        socketRef.current.on(event, callback);
    };

    return { sendMessage, listenToEvent };
};

export default useSocket;
