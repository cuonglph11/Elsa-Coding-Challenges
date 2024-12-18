import { useState } from "react";
import "./App.css";
import socketIO from "socket.io-client";
import { useEffect } from "react";
import useSocket from "./hooks/useSocket";
import { Leaderboard } from "./components/Leaderboard";
// const socket = socketIO.connect("http://localhost:5174");

function App() {
  const [count, setCount] = useState(0);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const { sendMessage, listenToEvent } = useSocket("http://localhost:5174");

  // useEffect(() => {
  //   setCount(count + 1);
  //   //socket.emit('ping', count);
  // }, []);

  // useEffect(() => {
  //   socket.emit("ping", count);
  // }, [count]);

  useEffect(() => {
    // Listen for incoming messages
    listenToEvent("message", (message) => {
      console.log("Received message:", message);
    });

    listenToEvent("leaderboard_update", (leaderBoardData) => {
      console.log(
        "Leaderboard updated - top 1 is",
        leaderBoardData[0],
        "with ",
        leaderBoardData[0].score
      );
      setLeaderboardData(leaderBoardData);
    });
    // Cleanup listener on unmount
    return () => {
      // Optionally, you can remove the listener here if needed
    };
  }, [listenToEvent]);

  function pingCount() {
    setCount(count + 1);
  }

  const handleSendMessage = () => {
    const message = "Hello, Server!";
    sendMessage("message", message);
  };

  return <Leaderboard leaderboardData={leaderboardData} />;
  // return (
  //   <div className="App">
  //     <p>Yup</p>
  //     <button onClick={pingCount}>PING</button>
  //     <button onClick={handleSendMessage}>Send Message</button>
  //   </div>
  // );
}

export default App;
