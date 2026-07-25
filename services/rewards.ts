import {
  arrayUnion,
  doc,
  increment,
  runTransaction,
  updateDoc,
} from "firebase/firestore";

import { db } from "@/firebase/config";
import { getLevelForXP } from "@/services/level";

export async function rewardPlayer(
  uid: string,
  position: number,
  score: number
) {
  let xp = 0;
  let coins = 0;
  let gems = 0;

  switch (position) {
    case 1:
      xp = 100;
      coins = 50;
      gems = 5;
      break;

    case 2:
      xp = 70;
      coins = 30;
      gems = 2;
      break;

    case 3:
      xp = 50;
      coins = 20;
      break;

    default:
      xp = 25;
      coins = 10;
  }

  if (score === 0) {
    xp = 10;
    coins = 5;
  }

  await updateDoc(doc(db, "users", uid), {
    xp: increment(xp),
    coins: increment(coins),
    gems: increment(gems),
    gamesPlayed: increment(1),
  });
}

export type MatchReward = {
  xp: number;
  coins: number;
  gems: number;
};

function getMatchReward(position: number, score: number): MatchReward {
  if (score === 0) return { xp: 10, coins: 5, gems: 0 };
  if (position === 1) return { xp: 100, coins: 50, gems: 5 };
  if (position === 2) return { xp: 70, coins: 30, gems: 2 };
  if (position === 3) return { xp: 50, coins: 20, gems: 0 };
  return { xp: 25, coins: 10, gems: 0 };
}

export async function claimMatchReward(
  roomId: string,
  uid: string,
  position: number,
  score: number
): Promise<MatchReward | null> {
  const userRef = doc(db, "users", uid);
  const reward = getMatchReward(position, score);

  return runTransaction(db, async (transaction) => {
    const user = await transaction.get(userRef);
    if (!user.exists()) return null;

    const claimedRooms = (user.data()?.claimedRooms ?? []) as string[];

    if (claimedRooms.includes(roomId)) return null;
    const nextXP = Number(user.data().xp ?? 0) + reward.xp;

    transaction.update(userRef, {
      xp: increment(reward.xp),
      coins: increment(reward.coins),
      gems: increment(reward.gems),
      gamesPlayed: increment(1),
      ...(position === 1
        ? { wins: increment(1), trophies: increment(1) }
        : { losses: increment(1) }),
      level: getLevelForXP(nextXP),
      claimedRooms: arrayUnion(roomId),
    });

    return reward;
  });
}

export async function claimTournamentReward(
  tournamentId: string,
  uid: string,
  won: boolean
): Promise<MatchReward | null> {
  const userRef = doc(db, "users", uid);
  const reward = won ? { xp: 80, coins: 60, gems: 0 } : { xp: 20, coins: 10, gems: 0 };

  return runTransaction(db, async (transaction) => {
    const user = await transaction.get(userRef);
    if (!user.exists()) return null;
    const claimed = (user.data().claimedTournaments ?? []) as string[];
    if (claimed.includes(tournamentId)) return null;
    const nextXP = Number(user.data().xp ?? 0) + reward.xp;

    transaction.update(userRef, {
      xp: increment(reward.xp),
      coins: increment(reward.coins),
      gamesPlayed: increment(1),
      ...(won ? { wins: increment(1) } : { losses: increment(1) }),
      level: getLevelForXP(nextXP),
      claimedTournaments: arrayUnion(tournamentId),
    });
    return reward;
  });
}
