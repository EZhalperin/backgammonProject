import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <>
      <button onClick={() => navigate("/create-room")}>create room</button>
      <button onClick={() => navigate("/join-room")}>join room</button>
    </>
  );
};

export default HomePage;
