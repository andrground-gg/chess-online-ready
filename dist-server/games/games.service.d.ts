import { Model } from "mongoose";
import { Game, GameDocument } from "./schemas/game.schema";
import { CreateGameDto } from "./dto/create-game.dto";
import { UsersService } from "src/users/users.service";
import { UpdateGameDto } from "./dto/update-game.dto";
export declare class GamesService {
    private gameModel;
    private readonly usersService;
    constructor(gameModel: Model<GameDocument>, usersService: UsersService);
    createGame(createGameDto: CreateGameDto): Promise<Game>;
    getGames(): Promise<Game[]>;
    getGameById(id: string): Promise<Game>;
    updateGame(gameId: string, updateGameDto: UpdateGameDto): Promise<Game>;
}
