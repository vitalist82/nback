import {Howl, Howler} from 'howler';

export class Speech {

    private readonly pathToLetterSounds = './media/sounds/letters/';
    private sounds:Map<string, Howl>;

    public constructor(letters:Array<string>) {
        this.initializeSounds(letters);
    }

    public play(letter:string) {
        this.sounds.get(letter).play();
    }

    private initializeSounds(letters:Array<string>) {
        this.sounds = new Map<string, Howl>();
        for (const letter of letters) {
            this.sounds.set(letter, new Howl({
                src: this.pathToLetterSounds + letter + '.mp3'
            }));
        }
    }
}