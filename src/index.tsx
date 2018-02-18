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
    private readonly defaultN = 2;
    private readonly initialTrialsCount = 24;

    private game:Game;
    private speech:Speech;

    constructor(props: any) {
        super(props);
        this.state = { isGameInProgress: false,
            highlightedSquareIndex: -1,
            audioButtonState: ButtonState.None,
            positionButtonState: ButtonState.None,
            currentN: this.defaultN,
            trialsCount: this.initialTrialsCount,
            gameResult: null };
        
        this.speech = new Speech(this.letters);
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
            <div className={`root ${this.state.isGameInProgress ? 'game-in-progress' : ''}`}>
                {this.renderHeader()}
                {this.renderSettings()}
                {this.renderBoard()}
                {this.renderButtons()}
                {this.renderResultPanel()}
            </div>
        );
    }

    private renderHeader():JSX.Element {
        if (this.state.isGameInProgress)
            return null;

        return (
            <Header title={'Dual n-back'} />
        );
    }

    private renderSettings():JSX.Element {
        if (this.state.isGameInProgress)
            return null;

        return (
            <div className={'settings'}>
                <NumberSelector
                    label='n: '
                    min={1}
                    max={15}
                    defaultValue={this.state.currentN}
                    onSelectedNumberChange={this.onCurrentNChange}
                    isDisabled={this.state.isGameInProgress} />
                <NumberSelector
                    label='trials: '
                    min={20}
                    max={1000}
                    defaultValue={this.state.trialsCount}
                    onSelectedNumberChange={this.onTrialsCountChange}
                    isDisabled={this.state.isGameInProgress} />
            </div>
        );
    }

    private renderBoard():JSX.Element {
        return (
            <Board highlightedSquareIndex={this.state.highlightedSquareIndex} onClicked={this.startGame}></Board>
        );
    }

    private renderButtons():JSX.Element {
        return (
            <div className={'result-buttons'}>
                <ResultButton className={'position'} buttonState={this.state.positionButtonState} label='A: Position match' onClicked={this.onLocationClicked}/>
                <ResultButton className={'audio'} buttonState={this.state.audioButtonState} label='L: Audio match' onClicked={this.onAudioClicked}/>
            </div>
        );
    }

    private renderResultPanel():JSX.Element {
        if (this.state.isGameInProgress || this.state.gameResult == null)
            return null;

        return (
            <ResultPanel result={this.state.gameResult} />
        );
    }

    private startGame = () => {
        if (this.state.isGameInProgress)
            return;

        this.game = new Game(this.state.currentN,
            this.state.trialsCount,
            3000,
            this.letters,
            this.onBoardStateChange,
            this.onPlayerChoiceValidated,
            this.onGameEnded);
            
        this.game.start();
        this.setState({ isGameInProgress: true });
    }

    private setAudioButtonState(buttonState:ButtonState) {
        this.setState({ audioButtonState: buttonState });
    }

    private setPositionButtonState(buttonState:ButtonState) {
        this.setState({ positionButtonState: buttonState });
    }

    private selectAudio() {
        if (!this.state.isGameInProgress)
            return;
        this.game.addChoice(UserInput.Audio);
        this.setAudioButtonState(ButtonState.Pressed);
    }

    private selectLocation() {
        if (!this.state.isGameInProgress)
            return;
        this.game.addChoice(UserInput.Position);
        this.setPositionButtonState(ButtonState.Pressed);
    }

    onCurrentNChange = (currentN:number) => {
        this.setState({ currentN: currentN });
    }

    onTrialsCountChange = (trialsCount:number) => {
        this.setState({ trialsCount: trialsCount });
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

    onAudioClicked = () => {
        this.selectAudio();
    }

    onLocationClicked = () => {
        this.selectLocation();
    }

    onKeyDown = (e:KeyboardEvent) => {
        if (e.key == 'l')
            this.selectAudio();
        else if (e.key == 'a')
            this.selectLocation();
        else if (e.key == ' ' || e.key == 'Spacebar') {
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
    trialsCount:number;
    gameResult:GameResult;
}