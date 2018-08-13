module TicTacToe {
    export enum Scores { X = -1, Draw = 0, O = 1, Unfinished = 2 };
    export enum Players { X = -1, O = 1 };
    export enum Marks { X = -1, Empty = 0, O = 1 };

    export interface IState {
        Board: Marks[];
        Player: Players;
        Score: Scores;
    }
}