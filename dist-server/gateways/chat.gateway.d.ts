import { Socket } from 'socket.io';
import { GamesService } from '../games/games.service';
export declare class ChatGateway {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    server: any;
    handleJoinChat(message: {
        id: string;
    }, client: Socket): Promise<void>;
    handleLeaveChat(message: {
        id: string;
    }, client: Socket): Promise<void>;
    handleSendMessage(message: {
        id: string;
        username: string;
        content: string;
    }): Promise<void>;
}
