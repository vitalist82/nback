import * as React from "react";
import * as ReactDOM from "react-dom";

import  "./index.scss";

import { Board } from "./components/Board";
import { Game } from "./game/game";
import { BoardState } from "./valueObjects/boardState";
import { Match } from "./game/match";
import { UserInput } from "./enums/userInput";
import { Speech } from "./speech/speech";
import { ResultButton } from "./components/ResultButton";
import { ButtonState } from "./enums/buttonState";
import { NumberSelector } from "./components/NumberSelector";
import { Header } from "./components/Header";
import { ResultPanel } from "./components/ResultPanel";
import { GameResult } from "./valueObjects/gameResult";

export class Root extends React.Component<any, IRootState> {

    private readonly letters:Array<string> = ['c', 'h', 'k', 'l', 'q', 'r', 's', 't'];
    private readonly displayTileDelayMs = 1000;
    private readonly highlightResultMs = 500;

    private game:Game;
    private speech:Speech;

    constructor(props: any) {
        super(props);
        this.state = { isGameInProgress: false,
            highlightedSquareIndex: -1,
            audioButtonState: ButtonState.None,
            positionButtonState: ButtonState.None,
            currentN: 2,
            gameResult: null };
        document.addEventListener("keydown", this.onKeyDown);
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
                <Header title={'Dual N-back'} />
                <NumberSelector selectedNumber={this.state.currentN} onSelectedNumberChange={this.onCurrentNChange} isDisabled={this.state.isGameInProgress} />
                <Board highlightedSquareIndex={this.state.highlightedSquareIndex}></Board>
                <div className={'result-buttons'}>
                    <ResultButton buttonState={this.state.positionButtonState} label='A: Position match' />
                    <ResultButton buttonState={this.state.audioButtonState} label='L: Audio match' />
                </div>
                {!this.state.isGameInProgress && this.state.gameResult != null &&
                    <ResultPanel result={this.state.gameResult} />
                }
                <div className={`overlay ${this.state.isGameInProgress ? 'hidden' : 'visible'}`}>Press space to start new game</div>
            </div>
        );
    }

    private startGame() {
        this.speech = new Speech(this.letters);
        this.game = new Game(this.state.currentN, 24, 3000, this.letters, this.onBoardStateChange, this.onPlayerChoiceValidated, this.onGameEnded);
        this.game.start();
        this.setState({ isGameInProgress: true });
    }

    private setAudioButtonState(buttonState:ButtonState) {
        this.setState({ audioButtonState: buttonState });
    }

    private setPositionButtonState(buttonState:ButtonState) {
        this.setState({ positionButtonState: buttonState });
    }

    onCurrentNChange = (currentN:number) => {
        this.setState({ currentN: currentN });
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

    onGameEnded = (gameResult:GameResult) => {
        this.setState({ isGameInProgress: false, gameResult: gameResult });
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
            this.startGame();
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
    currentN:number;
    gameResult:GameResult;
}