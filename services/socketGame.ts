import { socket } from "./socket";

export function sendAnswer(
  roomId: string,
  uid: string,
  answer: number
) {
  socket.emit("answer", {
    roomId,
    uid,
    answer,
  });
}

export function startGame(
  roomId: string
) {
  socket.emit("start-game", {
    roomId,
  });
}

export function nextQuestion(
  roomId: string
) {
  socket.emit("next-question", {
    roomId,
  });
}