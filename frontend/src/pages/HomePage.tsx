import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { socket } from "../context/socket";

const HomePage = () => {
  useEffect(() => {
    socket.on("connect", () => {});
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/create-room")}>create room</button>
      <button onClick={() => navigate("/join-room")}>join room</button>
    </>
  );
};

export default HomePage;
