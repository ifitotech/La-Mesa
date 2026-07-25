"use client";

import { use } from "react";

import AppLayout from "@/app/components/AppLayout";
import Lobby from "@/app/components/Lobby";

type Props = {
  params: Promise<{
    roomId: string;
  }>;
};

export default function LobbyRoomPage({
  params,
}: Props) {
  const { roomId } = use(params);

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl">
        <Lobby roomId={roomId} />
      </div>
    </AppLayout>
  );
}