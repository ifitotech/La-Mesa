import { Server } from "socket.io";
import { DominoEngine } from "./domino/DominoEngine";

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

type DominoRoom = {
  players: string[];
  engine?: DominoEngine;
};

const rooms = new Map<string, DominoRoom>();

io.on("connection", (socket) => {
  socket.on(
    "join-room",
    ({ roomId, playerId }) => {
      socket.join(roomId);

      if (!rooms.has(roomId)) {
        rooms.set(roomId, {
          players: [],
        });
      }

      const room = rooms.get(roomId)!;

      if (!room.players.includes(playerId)) {
        room.players.push(playerId);
      }

      io.to(roomId).emit(
        "players-update",
        room.players
      );

      // Iniciar automáticamente cuando haya 2 jugadores
      if (
        room.players.length === 2 &&
        !room.engine
      ) {
        room.engine = new DominoEngine(
          roomId,
          room.players
        );

        io.to(roomId).emit(
          "game-start",
          room.engine.getGame()
        );
      }
    }
  );

  socket.on(
    "play-tile",
    ({
      roomId,
      playerId,
      tileId,
    }) => {
      const room = rooms.get(roomId);

      if (!room?.engine) {
        return;
      }

      const ok = room.engine.play(
        playerId,
        tileId
      );

      if (!ok) {
        socket.emit(
          "invalid-move"
        );
        return;
      }

      io.to(roomId).emit(
        "game-state",
        room.engine.getGame()
      );
    }
  );

  socket.on(
    "draw-tile",
    ({
      roomId,
      playerId,
    }) => {
      const room = rooms.get(roomId);

      if (!room?.engine) {
        return;
      }

      room.engine.draw(playerId);

      io.to(roomId).emit(
        "game-state",
        room.engine.getGame()
      );
    }
  );

  socket.on(
    "pass-turn",
    ({ roomId }) => {
      const room = rooms.get(roomId);

      if (!room?.engine) {
        return;
      }

      room.engine.pass();

      io.to(roomId).emit(
        "game-state",
        room.engine.getGame()
      );
    }
  );

  socket.on("disconnect", () => {
    // Lo implementaremos después.
  });
});