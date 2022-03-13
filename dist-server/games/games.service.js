"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const game_schema_1 = require("./schemas/game.schema");
const users_service_1 = require("../users/users.service");
let GamesService = class GamesService {
    constructor(gameModel, usersService) {
        this.gameModel = gameModel;
        this.usersService = usersService;
    }
    async createGame(createGameDto) {
        const newGame = new this.gameModel(Object.assign(Object.assign({}, createGameDto), { isFinished: false, moves: 0 }));
        return newGame.save();
    }
    async getGames() {
        return this.gameModel.find();
    }
    async getGameById(id) {
        return this.gameModel.findById(id);
    }
    async updateGame(gameId, updateGameDto) {
        return this.gameModel.findByIdAndUpdate(gameId, updateGameDto);
    }
};
GamesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(game_schema_1.Game.name)),
    __metadata("design:paramtypes", [mongoose_2.Model, users_service_1.UsersService])
], GamesService);
exports.GamesService = GamesService;
//# sourceMappingURL=games.service.js.map