/// <reference path="istate.ts" />
var XMensMorris;
(function (XMensMorris) {
    var State = /** @class */ (function () {
        function State() {
            this.Board = [
                XMensMorris.Marks.Empty, XMensMorris.Marks.Empty, XMensMorris.Marks.Empty,
                XMensMorris.Marks.Empty, XMensMorris.Marks.Empty, XMensMorris.Marks.Empty,
                XMensMorris.Marks.Empty, XMensMorris.Marks.Empty, XMensMorris.Marks.Empty
            ];
            this.Player = XMensMorris.Players.X;
            this.Score = XMensMorris.Scores.Unfinished;
            this.Selected = -1;
            this.Turn = 0;
        }
        return State;
    }());
    XMensMorris.State = State;
})(XMensMorris || (XMensMorris = {}));
//# sourceMappingURL=State.js.map