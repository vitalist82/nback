import { GameHistory } from "./gameHistory";
import { BoardState } from "./boardState";
import { PlayerChoice } from "./playerChoice";
import { UserInput } from "./userInput";

export class Game {

    private readonly START_DELAY:number = 1000;
    private readonly letters:string = "abcdefghijklmnopqrstuvwxyz";

    private n:number;
    private gameHistory:GameHistory;
    private gameLength:number;
    private intervalLength:number;
    private audioChoice:boolean = false;
    private locationChoice:boolean = false;
    private _currentState:BoardState;
    private onStateChanged:(BoardState) => void;

    get currentState() {
        return this._currentState;
    }

    set currentState(newState:BoardState) {
        this._currentState = newState;
        this.onStateChanged(newState);
        this.gameHistory.addState(newState);
    }

    public constructor(n:number,
            gameLength:number,
            intervalLength:number,
            onStateChanged:(BoardState) => void,
            onPlayerChoiceValidated:(PlayerChoice) => void)
    {
        this.n = n;
        this.gameHistory = new GameHistory();
        this.gameLength = gameLength;
        this.intervalLength = intervalLength;
        this.onStateChanged = onStateChanged;
    }

    public start() {
        this.reset();
        setTimeout(() => {
            this.currentState = this.generateState();
        }, 1000);

        let count = 1;
        let timer = setInterval(() => {
            if (count++ < this.gameLength) {
                this.processChoice();
                this.currentState = this.generateState();
            }
            else {
                clearInterval(timer);
                console.log(this.gameHistory.boardStates);
                console.log(this.gameHistory.playerChoices);
            }
        }, this.intervalLength);
    }

    public addUserInput(input:UserInput) {
        console.log("addUserInput: ", input);
        if (this.gameHistory.boardStates.length < 1 || this.gameHistory.boardStates.length >= this.gameLength)
            return;

        if (input == UserInput.Audio)
            this.audioChoice = true;
        if (input == UserInput.Location)
            this.locationChoice = true;
    }

    private processChoice() {
        console.log("processChoice: ", this.locationChoice, this.audioChoice);
        this.gameHistory.addChoice(new PlayerChoice(this.locationChoice, this.audioChoice));
        this.resetChoice();
    }

    private resetChoice() {
        console.log("resetChoice");
        this.audioChoice = false;
        this.locationChoice = false;
    }

    private reset() {
        this.resetChoice();
        this.gameHistory.reset();
    }

    private generateState():BoardState {
        return new BoardState(this.getRandomPosition(), this.getRandomSymbol());
    }

    private getRandomPosition():number {
        return (Math.floor(Math.random() * 9));
    }

    private getRandomSymbol():string {
        return this.letters.charAt(Math.floor(Math.random() * this.letters.length));
    }
}