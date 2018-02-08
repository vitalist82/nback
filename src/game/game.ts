import { GameHistory } from "./gameHistory";
import { BoardState } from "../valueObjects/boardState";
import { Match } from "./match";
import { UserInput } from "../enums/userInput";
import { Board } from "../components/Board";

export class Game {

    private readonly displayResultDelay:number = 500;
    private readonly letters:string = "abcdefghijklmnopqrstuvwxyz";

    private n:number;
    private gameHistory:GameHistory;
    private gameLength:number;
    private intervalLength:number;

    private isGameInProgress:boolean = false;
    private playerChoice:Match;
    private _currentState:BoardState;
    private _currentMatch:Match;

    private onStateChanged:(BoardState) => void;
    private onPlayerChoiceValidated:(Match) => void;

    get currentState() {
        return this._currentState;
    }

    set currentState(newState:BoardState) {
        this._currentState = newState;
        this.onStateChanged(newState);
        this.gameHistory.addState(newState);
    }

    get currentMatch() {
        return this._currentMatch;
    }

    set currentMatch(match:Match) {
        this._currentMatch = match;
        this.onPlayerChoiceValidated(match);
        this.gameHistory.addMatch(match);
    }

    public constructor(n:number,
            gameLength:number,
            intervalLength:number,
            onStateChanged:(BoardState) => void,
            onPlayerChoiceValidated:(Match) => void)
    {
        this.n = n;
        this.gameHistory = new GameHistory();
        this.gameLength = gameLength;
        this.intervalLength = intervalLength;
        this.onStateChanged = onStateChanged;
        this.onPlayerChoiceValidated = onPlayerChoiceValidated;
    }

    public async start() {
        if (this.isGameInProgress)
            return;

        this.isGameInProgress = true;
        this.resetChoice();
        this.gameHistory.reset();

        await this.delay(this.intervalLength).then(() => { this.currentState = this.generateState(); });

        let count = 1;
        while (count++ < this.gameLength) {
            await this.delay(this.intervalLength).then(() => { this.processChoice(); });
            await this.delay(this.displayResultDelay).then(() => { this.currentState = this.generateState(); });
        }
        this.processChoice();
        this.isGameInProgress = false;
    }

    public addChoice(input:UserInput) {
        if (this.gameHistory.boardStates.length < 1 || this.gameHistory.boardStates.length >= this.gameLength)
            return;

        if (this.playerChoice == null)
            this.playerChoice = new Match(false, false);

        if (input == UserInput.Audio && !this.playerChoice.soundMatch)
            this.playerChoice.soundMatch = true;
        if (input == UserInput.Location && !this.playerChoice.positionMatch)
            this.playerChoice.positionMatch = true;
    }

    private delay<T>(millis: number): Promise<T> {
        return new Promise((resolve) => setTimeout(() => { resolve(); }, millis));
    }

    private processChoice() {
        
        if (this.playerChoice == null)
            this.playerChoice = new Match(false, false);
        this.gameHistory.addChoice(this.playerChoice);
        this.validateChoice();
        this.resetChoice();
    }

    private validateChoice():any {
        let audioMatch = false, positionMatch = false;
        if (this.gameHistory.boardStates.length <= this.n) {
            positionMatch = !this.playerChoice.positionMatch;
            audioMatch = !this.playerChoice.soundMatch;
            this.currentMatch = new Match(positionMatch, audioMatch);
        } else {
            let currentIndex = this.gameHistory.boardStates.length - 1;
            positionMatch = this.playerChoice.positionMatch === 
                (this.gameHistory.boardStates[currentIndex].squareIndex === this.gameHistory.boardStates[currentIndex - this.n].squareIndex);
            audioMatch = this.playerChoice.soundMatch ===
                (this.gameHistory.boardStates[currentIndex].symbol === this.gameHistory.boardStates[currentIndex - this.n].symbol);
            this.currentMatch = new Match(positionMatch, audioMatch);
        }
    }

    private resetChoice() {
        this.playerChoice = null;
    }

    private generateState = () => {
        return new BoardState(this.getRandomPosition(), this.getRandomSymbol());
    }

    private getRandomPosition():number {
        return (Math.floor(Math.random() * 9));
    }

    private getRandomSymbol():string {
        return this.letters.charAt(Math.floor(Math.random() * this.letters.length));
    }
}