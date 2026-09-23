import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const CreateRoomPage = () => {
  const [errorMsg, setError] = useState("");
  const socket = io("http://localhost:3000");
  useEffect(() => {
    socket.on("connect", () => {});
  }, []);
  const createPlayer = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const name = fromData.get("name");
    socket.emit(
      "room:create",
      name,
      (response: { success: string; error?: string }) => {
        console.log(response.success);
        console.log(response.error);

        if (response.error) setError(response.error);
      },
    );
  };
  return (
    <>
      <form onSubmit={createPlayer}>
        <input name="name" placeholder="enter name:"></input>
        <button type="submit"></button>
      </form>
      {errorMsg}
    </>
  );
};

export default CreateRoomPage;
