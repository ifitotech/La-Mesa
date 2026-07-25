export type Player = {
  uid: string;

  displayName: string;

  photoURL?: string;

  country: string;

  level: number;

  xp: number;

  coins: number;

  gems: number;

  triviaRating: number;

  dominoRating: number;

  gamesPlayed: number;

  wins: number;

  losses: number;

  streak: number;

  createdAt: number;
};