import * as React from "react";
import * as ReactDOM from "react-dom";

import  "./index.scss";

import { Board } from "./components/Board";
import { Game } from "./game/game";
import { BoardState } from "./game/valueObjects/boardState";
import { Match } from "./game/match";
import { UserInput } from "./game/enums/userInput";

export class Root extends React.Component<any, IRootState> {

    private game:Game;

    constructor(props: any) {
        super(props);
        this.state = { highlightedSquareIndex: -1, highlightResult: false, isAudioMatch: false, isLocationMatch: false };
        document.addEventListener("keydown", this.onKeyDown);
        this.game = new Game(2, 20, 3000, this.onStateChange, this.onPlayerChoiceValidated);
    }

    public static init() {
        ReactDOM.render(
            <Root />,
            document.getElementById("app")
        );        
    }

    // make ResultLabel component
    render() {
        return (
            <div className={'root'}>
                <Board highlightedSquareIndex={ this.state.highlightedSquareIndex }></Board>
                <div className={`result ${this.state.highlightResult ? 'highlighted' : ''}`}>
                    <div className={`label-match ${this.state.isAudioMatch ? 'highlight-success' : 'highlight-error'}`}>A - Audio match</div>
                    <div className={`label-match ${this.state.isLocationMatch ? 'highlight-success' : 'highlight-error'}`}>L - Location match</div>
                </div>
            </div>
        );
    }

    onStateChange = (boardState:BoardState) => {
        console.log(boardState);
        this.setState({ highlightedSquareIndex: boardState.squareIndex });
        setTimeout(() => this.setState({ highlightedSquareIndex: -1 }), 1000);
    }

    onPlayerChoiceValidated = (match:Match) => {
            this.setState({ highlightResult: true, isLocationMatch: match.positionMatch, isAudioMatch: match.soundMatch });
            setTimeout(() => this.setState({ highlightResult: false, isLocationMatch: false, isAudioMatch: false }), 1000);
    }

    onKeyDown = (e:KeyboardEvent) => {
        switch (e.key) {
            case ' ':
                this.game.start();
                break;
            case 'a':
                this.game.addChoice(UserInput.Audio);
                break;
            case 'l':
                this.game.addChoice(UserInput.Location);
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
    highlightResult:boolean;
    isAudioMatch:boolean;
    isLocationMatch:boolean;
}