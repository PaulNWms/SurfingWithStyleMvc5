var XMensMorris;
(function (XMensMorris) {
    var Scores;
    (function (Scores) {
        Scores[Scores["X"] = -1] = "X";
        Scores[Scores["Draw"] = 0] = "Draw";
        Scores[Scores["O"] = 1] = "O";
        Scores[Scores["Unfinished"] = 2] = "Unfinished";
    })(Scores = XMensMorris.Scores || (XMensMorris.Scores = {}));
    ;
    var Players;
    (function (Players) {
        Players[Players["X"] = -1] = "X";
        Players[Players["O"] = 1] = "O";
    })(Players = XMensMorris.Players || (XMensMorris.Players = {}));
    ;
    var Marks;
    (function (Marks) {
        Marks[Marks["X0"] = -1] = "X0";
        Marks[Marks["X1"] = -2] = "X1";
        Marks[Marks["X2"] = -3] = "X2";
        Marks[Marks["Empty"] = 0] = "Empty";
        Marks[Marks["O0"] = 1] = "O0";
        Marks[Marks["O1"] = 2] = "O1";
        Marks[Marks["O2"] = 3] = "O2";
    })(Marks = XMensMorris.Marks || (XMensMorris.Marks = {}));
    ;
})(XMensMorris || (XMensMorris = {}));
//# sourceMappingURL=IState.js.map