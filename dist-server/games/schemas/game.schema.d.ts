import { Document } from 'mongoose';
export declare type GameDocument = Game & Document;
export declare class Game {
    [x: string]: any;
    date: Date;
    moves: number;
    mode: string;
    timeMode: string;
    white: {
        username: string;
        eloAtTheTime: number;
        score: number;
    };
    black: {
        username: string;
        eloAtTheTime: number;
        score: number;
    };
    isFinished: boolean;
    chat: Object[];
}
export declare const GameSchema: import("mongoose").Schema<Document<Game, any, any>, import("mongoose").Model<Document<Game, any, any>, any, any, any>, any, any>;
