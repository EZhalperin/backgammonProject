import React, { useState } from "react";
import { socket } from "../context/socket.tsx";

const JoinRoomPage = () => {
  const [errorMsg, setError] = useState("");
  const joinPlayer = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const name = fromData.get("name");
    const roomCode = fromData.get("roomCode");
    socket.emit(
      "room:join",
      name,
      roomCode,
      (response: { success: string; error?: string }) => {
        console.log(response.success);
        console.log(response.error);
        if (response.error) setError(response.error);
      },
    );
  };
  return (
    <>
      <form onSubmit={joinPlayer}>
        <input name="name" placeholder="enter name:"></input>
        <input name="roomCode" placeholder="enter room code:"></input>
        <button type="submit"></button>
      </form>
      {errorMsg}
    </>
  );
};

export default JoinRoomPage;
