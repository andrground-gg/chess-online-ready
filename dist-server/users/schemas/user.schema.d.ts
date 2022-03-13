import { Document } from 'mongoose';
export declare type UserDocument = User & Document;
export declare class User {
    [x: string]: any;
    email: string;
    username: string;
    password: string;
    stats: {
        bullet: {
            totalGames: number;
            won: number;
            draw: number;
            lost: number;
        };
        blitz: {
            totalGames: number;
            won: number;
            draw: number;
            lost: number;
        };
        rapid: {
            totalGames: number;
            won: number;
            draw: number;
            lost: number;
        };
    };
    games: object;
    registrationDate: Date;
}
export declare const UserSchema: import("mongoose").Schema<Document<User, any, any>, import("mongoose").Model<Document<User, any, any>, any, any, any>, any, any>;
