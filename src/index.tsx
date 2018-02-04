import * as React from "react";
import * as ReactDOM from "react-dom";

import { Board } from "./components/Board";
import { Game } from "./game/game";
import { BoardState } from "./game/boardState";
import { PlayerChoice } from "./game/playerChoice";
import { UserInput } from "./game/userInput";

export class Root extends React.Component<any, IRootState> {

    private game:Game;

    constructor(props: any) {
        super(props);
        this.state = { highlightedSquareIndex: -1 };
        document.addEventListener("keydown", this.onKeyDown);
        this.game = new Game(2, 20, 3000, this.onStateChange, this.onPlayerChoiceValidated);
    }

    public static init() {
        ReactDOM.render(
            <Root />,
            document.getElementById("app")
        );        
    }

    render() {
        return (
            <div className={'root'}>
                <Board highlightedSquareIndex={ this.state.highlightedSquareIndex }></Board>
            </div>
        );
    }

    startGame = () => {
        this.game.start();
    }

    onStateChange = (boardState:BoardState) => {
        console.log(boardState);
        this.setState({ highlightedSquareIndex: boardState.squareIndex });
        setTimeout(() => this.setState({ highlightedSquareIndex: -1 }), 1000);
    }

    onPlayerChoiceValidated = (playerChoice:PlayerChoice) => {
    }

    onKeyDown = (e:KeyboardEvent) => {
        switch (e.key) {
            case ' ':
                this.startGame();
                break;
            case 'a':
                this.game.addUserInput(UserInput.Audio);
                break;
            case 'l':
                this.game.addUserInput(UserInput.Location);
                break;
            default:
                break;
        }
    }
}

Root.init();

export interface IRootState {
    // -1 means no square is highlighted
    highlightedSquareIndex:number;
}