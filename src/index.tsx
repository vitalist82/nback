import * as React from "react";
import * as ReactDOM from "react-dom";

import  "./index.scss";

import { Board } from "./components/Board";
import { Game } from "./game/game";
import { BoardState } from "./valueObjects/boardState";
import { Match } from "./game/match";
import { UserInput } from "./enums/userInput";
import { Speech } from "./speech/speech";
import { Button } from "./components/Button";
import { ButtonState } from "./enums/buttonState";

export class Root extends React.Component<any, IRootState> {

    private readonly letters:Array<string> = ['c', 'h', 'k', 'l', 'q', 'r', 's', 't'];
    private readonly displayTileDelayMs = 1000;
    private readonly highlightResultMs = 500;

    private game:Game;
    private speech:Speech;

    constructor(props: any) {
        super(props);
        this.state = { isGameInProgress: false, highlightedSquareIndex: -1, audioButtonState: ButtonState.None, positionButtonState: ButtonState.None };
        document.addEventListener("keydown", this.onKeyDown);
        this.speech = new Speech(this.letters);
        this.game = new Game(2, 20, 3000, this.letters, this.onBoardStateChange, this.onPlayerChoiceValidated, this.onGameEnded);
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
                <div className={'result'}>
                    <Button buttonState={this.state.positionButtonState} label='A: Position match' />
                    <Button buttonState={this.state.audioButtonState} label='L: Audio match' />
                </div>
            </div>
        );
    }

    private setAudioButtonState(buttonState:ButtonState) {
        this.setState({ audioButtonState: buttonState });
    }

    private setPositionButtonState(buttonState:ButtonState) {
        this.setState({ positionButtonState: buttonState });
    }

    onBoardStateChange = (boardState:BoardState) => {
        this.setState({ highlightedSquareIndex: boardState.squareIndex });
        this.speech.play(boardState.symbol);
        setTimeout(() => this.setState({ highlightedSquareIndex: -1 }), this.displayTileDelayMs);
    }

    onPlayerChoiceValidated = (match:Match) => {
            this.setAudioButtonState(match.soundMatch ? ButtonState.Success : ButtonState.Error);
            this.setPositionButtonState(match.positionMatch ? ButtonState.Success : ButtonState.Error);
            setTimeout(() => { this.setAudioButtonState(ButtonState.None); this.setPositionButtonState(ButtonState.None) }, this.highlightResultMs);
    }

    onGameEnded = () => {
        this.setState({ isGameInProgress: false });
    }

    onKeyDown = (e:KeyboardEvent) => {
        if (this.state.isGameInProgress && e.key == 'l') {
            this.game.addChoice(UserInput.Audio);
            this.setAudioButtonState(ButtonState.Pressed);
        }
        else if (this.state.isGameInProgress && e.key == 'a') {
            this.game.addChoice(UserInput.Position);
            this.setPositionButtonState(ButtonState.Pressed);
        }
        else if (!this.state.isGameInProgress && (e.key == ' ' || e.key == 'Spacebar')) {
            this.game.start();
            this.setState({ isGameInProgress: true });
        }
    }
}

// Entry point
Root.init();

export interface IRootState {
    isGameInProgress:boolean;
    // -1 means no square is highlighted
    highlightedSquareIndex:number;
    audioButtonState:ButtonState;
    positionButtonState:ButtonState;
}