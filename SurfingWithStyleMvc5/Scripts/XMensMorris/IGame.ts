module XMensMorris {
    export interface IGame {
        Player(state: IState);
        Actions(state: IState);
        Result(state: IState, action: number);
        TerminalTest(state: IState);
        Utility(state: IState, player: Players);
    }
} 