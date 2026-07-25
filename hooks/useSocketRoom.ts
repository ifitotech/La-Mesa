"use client";

import { useEffect } from "react";

import { socket } from "@/services/socket";

export function useSocketRoom(
  roomId: string,
  player: unknown
) {
  useEffect(() => {

    socket.emit("join-room", {
      roomId,
      player,
    });

    return () => {
      socket.emit("leave-room", { roomId });
    };

  }, [player, roomId]);
}
