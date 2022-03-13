import { CreateGameDto } from "./dto/create-game.dto";
import { Game } from "./schemas/game.schema";
import { GamesService } from "./games.service";
import { UpdateGameDto } from "./dto/update-game.dto";
export declare class GamesController {
    private readonly gamesService;
    constructor(gamesService: GamesService);
    createGame(createGameDto: CreateGameDto): Promise<Game>;
    getGames(username: string): Promise<Game[]>;
    getGameById(id: string): Promise<Game>;
    updateGame(gameId: string, updateGameDto: UpdateGameDto): Promise<Game>;
}
