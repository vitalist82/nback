export class GameResult {
    
    public audioMatchPercentage:number;
    public positionMatchPercentage:number;
    public generalMatchPercentage:number;

    public constructor(audioMatchPercentage:number, positionMatchPercentage:number, generalMatchPercentage:number) {
        this.audioMatchPercentage = audioMatchPercentage;
        this.positionMatchPercentage = positionMatchPercentage;
        this.generalMatchPercentage = generalMatchPercentage;
    }
}