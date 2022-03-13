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
exports.GamesController = void 0;
const common_1 = require("@nestjs/common");
const create_game_dto_1 = require("./dto/create-game.dto");
const games_service_1 = require("./games.service");
const update_game_dto_1 = require("./dto/update-game.dto");
let GamesController = class GamesController {
    constructor(gamesService) {
        this.gamesService = gamesService;
    }
    async createGame(createGameDto) {
        return this.gamesService.createGame(createGameDto);
    }
    async getGames(username) {
        let games = await this.gamesService.getGames();
        if (username) {
            games = games.filter(g => g.white.username === username || g.black.username === username);
        }
        return games;
    }
    async getGameById(id) {
        return this.gamesService.getGameById(id);
    }
    async updateGame(gameId, updateGameDto) {
        return this.gamesService.updateGame(gameId, updateGameDto);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_game_dto_1.CreateGameDto]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "createGame", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getGames", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "getGameById", null);
__decorate([
    (0, common_1.Patch)(':gameId'),
    __param(0, (0, common_1.Param)('gameId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_game_dto_1.UpdateGameDto]),
    __metadata("design:returntype", Promise)
], GamesController.prototype, "updateGame", null);
GamesController = __decorate([
    (0, common_1.Controller)('games'),
    __metadata("design:paramtypes", [games_service_1.GamesService])
], GamesController);
exports.GamesController = GamesController;
//# sourceMappingURL=games.controller.js.map