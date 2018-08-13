/// <reference path="istate.ts" />
var TicTacToe;
(function (TicTacToe) {
    var State = /** @class */ (function () {
        function State() {
            this.Board = [
                TicTacToe.Marks.Empty, TicTacToe.Marks.Empty, TicTacToe.Marks.Empty,
                TicTacToe.Marks.Empty, TicTacToe.Marks.Empty, TicTacToe.Marks.Empty,
                TicTacToe.Marks.Empty, TicTacToe.Marks.Empty, TicTacToe.Marks.Empty
            ];
            this.Player = TicTacToe.Players.X;
            this.Score = TicTacToe.Scores.Unfinished;
        }
        return State;
    }());
    TicTacToe.State = State;
})(TicTacToe || (TicTacToe = {}));
//# sourceMappingURL=State.js.map