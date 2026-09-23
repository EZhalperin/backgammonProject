import { io } from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:3000");
  socket.on("connect", () => {});

  return <div>App</div>;
};

export default App;
