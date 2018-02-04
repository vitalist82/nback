export class PlayerChoice {
    public positionMatch: boolean;
    public soundMatch: boolean;

    public constructor(positionMatch:boolean, soundMatch:boolean) {
        this.positionMatch = positionMatch;
        this.soundMatch = soundMatch;
    }
}