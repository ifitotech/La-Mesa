import { GameEngine } from "./GameEngine";

export class TriviaEngine implements GameEngine {
  players: unknown[] = [];

  currentQuestion = 0;

  scores: Record<string, number> = {};

  answers: Record<string, unknown> = {};

  timer = 15;

  nextQuestion() {
    this.currentQuestion++;
    this.answers = {};
    this.timer = 15;
  }

  submit(
    uid: string,
    points: number
  ) {
    this.scores[uid] ??= 0;
    this.scores[uid] += points;
  }

  getGame() {
    return {
      players: this.players,
      currentQuestion: this.currentQuestion,
      scores: this.scores,
      answers: this.answers,
      timer: this.timer,
    };
  }
}