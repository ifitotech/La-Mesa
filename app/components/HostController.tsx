"use client";

import { useEffect } from "react";

import { nextRound } from "@/services/gameHost";

type Props = {
  roomId: string;
  isHost: boolean;
  answers: Record<string, number>;
  players: string[];
};

export default function HostController({
  roomId,
  isHost,
  answers,
  players,
}: Props) {

  useEffect(() => {
    if (!isHost) return;

    if (
      Object.keys(answers).length === players.length
    ) {
      const id = setTimeout(() => {
        nextRound(roomId);
      }, 2500);

      return () => clearTimeout(id);
    }
  }, [answers, isHost, players.length, roomId]);

  return null;
}
