var TicTacToe;
(function (TicTacToe) {
    var Scores;
    (function (Scores) {
        Scores[Scores["X"] = -1] = "X";
        Scores[Scores["Draw"] = 0] = "Draw";
        Scores[Scores["O"] = 1] = "O";
        Scores[Scores["Unfinished"] = 2] = "Unfinished";
    })(Scores = TicTacToe.Scores || (TicTacToe.Scores = {}));
    ;
    var Players;
    (function (Players) {
        Players[Players["X"] = -1] = "X";
        Players[Players["O"] = 1] = "O";
    })(Players = TicTacToe.Players || (TicTacToe.Players = {}));
    ;
    var Marks;
    (function (Marks) {
        Marks[Marks["X"] = -1] = "X";
        Marks[Marks["Empty"] = 0] = "Empty";
        Marks[Marks["O"] = 1] = "O";
    })(Marks = TicTacToe.Marks || (TicTacToe.Marks = {}));
    ;
})(TicTacToe || (TicTacToe = {}));
//# sourceMappingURL=IState.js.map