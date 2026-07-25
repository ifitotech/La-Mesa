import { Player } from "@/types/player";

export const defaultPlayer = (
  uid: string,
  displayName: string
): Player => ({
  uid,

  displayName,

  photoURL: "",

  country: "CU",

  level: 1,

  xp: 0,

  coins: 1000,

  gems: 50,

  triviaRating: 1000,

  dominoRating: 1000,

  gamesPlayed: 0,

  wins: 0,

  losses: 0,

  streak: 0,

  createdAt: Date.now(),
});