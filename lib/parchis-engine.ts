export const PARCHIS_TRACK_SIZE = 68;
export const PARCHIS_GOAL = 75;
export const PARCHIS_SAFE_CELLS = new Set([0, 8, 17, 25, 34, 42, 51, 59]);

export type ParchisPiece = {
  id: string;
  steps: number;
};

export type ParchisPlayer = {
  id: string;
  name: string;
  start: number;
  pieces: ParchisPiece[];
};

export type ParchisState = {
  players: ParchisPlayer[];
  turn: number;
  winner?: string;
};

export function createParchisGame(names: string[]): ParchisState {
  const playerNames = names.slice(0, 4);
  return {
    players: playerNames.map((name, playerIndex) => ({
      id: `player-${playerIndex}`,
      name,
      start: Math.floor((PARCHIS_TRACK_SIZE / 4) * playerIndex),
      pieces: Array.from({ length: 4 }, (_, pieceIndex) => ({
        id: `player-${playerIndex}-piece-${pieceIndex}`,
        steps: -1,
      })),
    })),
    turn: 0,
  };
}

export function boardCell(player: ParchisPlayer, piece: ParchisPiece) {
  if (piece.steps < 0 || piece.steps >= PARCHIS_TRACK_SIZE) return null;
  return (player.start + piece.steps) % PARCHIS_TRACK_SIZE;
}

export function legalParchisMoves(state: ParchisState, roll: number) {
  const player = state.players[state.turn];
  if (!player || state.winner) return [];
  return player.pieces.flatMap((piece, index) => {
    if (piece.steps === PARCHIS_GOAL) return [];
    if (piece.steps === -1) return roll === 5 ? [index] : [];
    return piece.steps + roll <= PARCHIS_GOAL ? [index] : [];
  });
}

export type ParchisMove = {
  captured: string[];
  reachedGoal: boolean;
  won: boolean;
  extraTurn: boolean;
};

export function moveParchisPiece(
  state: ParchisState,
  pieceIndex: number,
  roll: number,
): ParchisMove | null {
  if (!legalParchisMoves(state, roll).includes(pieceIndex)) return null;
  const player = state.players[state.turn];
  const piece = player.pieces[pieceIndex];
  piece.steps = piece.steps === -1 ? 0 : piece.steps + roll;

  const captured: string[] = [];
  const cell = boardCell(player, piece);
  if (cell !== null && !PARCHIS_SAFE_CELLS.has(cell)) {
    for (const opponent of state.players) {
      if (opponent.id === player.id) continue;
      for (const opponentPiece of opponent.pieces) {
        if (boardCell(opponent, opponentPiece) === cell) {
          opponentPiece.steps = -1;
          captured.push(opponentPiece.id);
        }
      }
    }
  }

  const reachedGoal = piece.steps === PARCHIS_GOAL;
  const won = player.pieces.every((candidate) => candidate.steps === PARCHIS_GOAL);
  if (won) state.winner = player.id;
  const extraTurn = !won && (roll === 6 || captured.length > 0 || reachedGoal);
  if (!extraTurn && !won) state.turn = (state.turn + 1) % state.players.length;
  return { captured, reachedGoal, won, extraTurn };
}

export function passParchisTurn(state: ParchisState) {
  if (!state.winner) state.turn = (state.turn + 1) % state.players.length;
}
