import { Socket } from 'socket.io';
import { GamesService } from '../games/games.service';
export declare class SearchGateway {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    server: any;
    socketsUsers: Map<string, {
        username: string;
        elo: number;
    }>;
    handleStartSearch(message: {
        mode: string;
        timeMode: string;
        username: string;
        elo: number;
    }, client: Socket): Promise<void>;
    handleCancelSearch(message: {
        mode: string;
        timeMode: string;
        username: string;
    }, client: Socket): Promise<void>;
}
