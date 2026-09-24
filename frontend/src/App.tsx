import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateRoomPage from "./pages/CreateRoomPage";
import HomePage from "./pages/HomePage";
import JoinRoomPage from "./pages/JoinRoomPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/create-room" element={<CreateRoomPage />}></Route>
          <Route path="/join-room" element={<JoinRoomPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
