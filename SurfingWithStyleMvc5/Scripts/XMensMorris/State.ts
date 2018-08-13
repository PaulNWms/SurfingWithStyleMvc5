/// <reference path="istate.ts" />

module XMensMorris {
    export class State implements IState {
        public Board: Marks[];
        public Player: Players;
        public Score: Scores;
        public Selected: number;
        public Turn: number;

        constructor() {
            this.Board = [
                Marks.Empty, Marks.Empty, Marks.Empty,
                Marks.Empty, Marks.Empty, Marks.Empty,
                Marks.Empty, Marks.Empty, Marks.Empty
            ];
            this.Player = Players.X;
            this.Score = Scores.Unfinished;
            this.Selected = -1;
            this.Turn = 0;
        }
    }
}