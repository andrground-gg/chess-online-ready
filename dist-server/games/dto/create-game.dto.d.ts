export declare class CreateGameDto {
    readonly date: Date;
    readonly mode: string;
    readonly timeMode: string;
    readonly white: {
        username: string;
        eloAtTheTime: number;
    };
    readonly black: {
        username: string;
        eloAtTheTime: number;
    };
}
