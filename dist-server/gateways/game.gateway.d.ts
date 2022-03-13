/// <reference types="node" />
import { Socket } from 'socket.io';
import { GamesService } from 'src/games/games.service';
import { UsersService } from 'src/users/users.service';
export declare class GameGateway {
    private readonly usersService;
    private readonly gamesService;
    constructor(usersService: UsersService, gamesService: GamesService);
    server: any;
    games: Map<string, {
        whiteTime: number;
        blackTime: number;
        increment: number;
        interval: NodeJS.Timer;
        isWhiteTurn: boolean;
        moves: number;
        board: string[][];
        whiteCastling: {
            WKSC: boolean;
            WQSC: boolean;
        };
        blackCastling: {
            BKSC: boolean;
            BQSC: boolean;
        };
        enPassant: {
            isAvailable: boolean;
            passingPawn: number[];
            captureSquare: number[];
        };
        isCheck: boolean;
    }>;
    handleOfferDraw(message: {
        id: string;
    }): Promise<void>;
    handleMadeMove(message: {
        id: string;
        board: string[][];
        whiteCastling: {
            WKSC: boolean;
            WQSC: boolean;
        };
        blackCastling: {
            BKSC: boolean;
            BQSC: boolean;
        };
        enPassant: {
            isAvailable: boolean;
            passingPawn: number[];
            captureSquare: number[];
        };
        isCheck: boolean;
    }): Promise<void>;
    handleGetData(message: {
        id: string;
    }, client: Socket): Promise<void>;
    handleStartTimer(message: {
        id: string;
        time: number;
        increment: number;
        board: string[][];
        mode: string;
        whiteName: string;
        blackName: string;
        whiteElo: number;
        blackElo: number;
    }): Promise<void>;
    handleEndGame(message: {
        id: string;
        mode: string;
        white: {
            username: string;
            score: number;
            oldElo: number;
        };
        black: {
            username: string;
            score: number;
            oldElo: number;
        };
        moves: number;
    }): Promise<void>;
}
