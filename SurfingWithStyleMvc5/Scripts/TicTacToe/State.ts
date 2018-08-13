/// <reference path="istate.ts" />

module TicTacToe {
    export class State implements IState {
        public Board: Marks[];
        public Player: Players;
        public Score: Scores;

        constructor() {
            this.Board = [
                Marks.Empty, Marks.Empty, Marks.Empty,
                Marks.Empty, Marks.Empty, Marks.Empty,
                Marks.Empty, Marks.Empty, Marks.Empty
            ];
            this.Player = Players.X;
            this.Score = Scores.Unfinished;
        }
    }
}