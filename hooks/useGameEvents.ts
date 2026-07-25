"use client";

import { useEffect } from "react";

import { socket } from "@/services/socket";

type GameEventHandlers = {
  roomUpdate?(room: unknown): void;
  nextQuestion?(room: unknown): void;
  answers?(answers: unknown): void;
};

export function useGameEvents(
  handlers: GameEventHandlers
) {
  useEffect(() => {

    socket.on(
      "room-update",
      handlers.roomUpdate ?? (() => {})
    );

    socket.on(
      "next-question",
      handlers.nextQuestion ?? (() => {})
    );

    socket.on(
      "answers",
      handlers.answers ?? (() => {})
    );

    return () => {

      socket.off("room-update");

      socket.off("next-question");

      socket.off("answers");

    };

  }, [handlers]);
}
