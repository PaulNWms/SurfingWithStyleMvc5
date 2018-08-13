module XMensMorris {
    export enum Scores { X = -1, Draw = 0, O = 1, Unfinished = 2 };
    export enum Players { X = -1, O = 1 };
    export enum Marks { X0 = -1, X1 = -2, X2 = -3, Empty = 0, O0 = 1, O1 = 2, O2 = 3 };

    export interface IState {
        Board: Marks[];
        Player: Players;
        Score: Scores;
        Selected: number;
        Turn: number;
    }
}