import { BoardState } from "./boardState";
import { PlayerChoice } from "./playerChoice";

export class GameHistory {

    public boardStates:Array<BoardState>;
    public playerChoices:Array<PlayerChoice>;

    public constructor() {
        this.boardStates = [];
        this.playerChoices = [];
    }

    public addState(boardState:BoardState) {
        this.boardStates.push(boardState);
    }

    public addChoice(playerChoice:PlayerChoice) {
        this.playerChoices.push(playerChoice);
    }

    public reset() {
        this.boardStates = [];
        this.playerChoices = [];
    }
}
