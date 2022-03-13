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
exports.GameGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const games_service_1 = require("../games/games.service");
const users_service_1 = require("../users/users.service");
let GameGateway = class GameGateway {
    constructor(usersService, gamesService) {
        this.usersService = usersService;
        this.gamesService = gamesService;
        this.games = new Map();
    }
    async handleOfferDraw(message) {
        this.server.in(message.id).emit('offerDraw');
    }
    async handleMadeMove(message) {
        if (this.games.get(message.id).isWhiteTurn)
            this.games.get(message.id).whiteTime = this.games.get(message.id).whiteTime + this.games.get(message.id).increment;
        else
            this.games.get(message.id).blackTime = this.games.get(message.id).blackTime + this.games.get(message.id).increment;
        this.games.get(message.id).isWhiteTurn = !this.games.get(message.id).isWhiteTurn;
        this.games.get(message.id).moves++;
        this.games.get(message.id).board = message.board;
        this.games.get(message.id).whiteCastling = message.whiteCastling;
        this.games.get(message.id).blackCastling = message.blackCastling;
        this.games.get(message.id).enPassant = message.enPassant;
        this.games.get(message.id).isCheck = message.isCheck;
        this.server.in(message.id).emit('madeMove', {
            board: message.board,
            isWhiteTurn: this.games.get(message.id).isWhiteTurn,
            moves: this.games.get(message.id).moves,
            whiteCastling: this.games.get(message.id).whiteCastling,
            blackCastling: this.games.get(message.id).blackCastling,
            enPassant: this.games.get(message.id).enPassant,
            isCheck: this.games.get(message.id).isCheck
        });
    }
    async handleGetData(message, client) {
        client.emit('sendData', {
            board: this.games.get(message.id).board,
            isWhiteTurn: this.games.get(message.id).isWhiteTurn,
            moves: this.games.get(message.id).moves,
            whiteCastling: this.games.get(message.id).whiteCastling,
            blackCastling: this.games.get(message.id).blackCastling,
            enPassant: this.games.get(message.id).enPassant,
            isCheck: this.games.get(message.id).isCheck
        });
    }
    async handleStartTimer(message) {
        if (this.games.has(message.id))
            return;
        let whiteTime = message.time;
        let blackTime = message.time;
        let interval = setInterval(() => {
            whiteTime = this.games.get(message.id).whiteTime;
            blackTime = this.games.get(message.id).blackTime;
            if (this.games.get(message.id).isWhiteTurn)
                whiteTime--;
            else
                blackTime--;
            this.games.get(message.id).whiteTime = whiteTime;
            this.games.get(message.id).blackTime = blackTime;
            this.server.in(message.id).emit('sendTime', { whiteTime, blackTime });
            if (whiteTime === 0 || blackTime === 0)
                this.handleEndGame({
                    id: message.id,
                    mode: message.mode,
                    white: {
                        username: message.whiteName,
                        score: whiteTime === 0 ? 0 : 1,
                        oldElo: message.whiteElo
                    },
                    black: {
                        username: message.blackName,
                        score: whiteTime === 0 ? 1 : 0,
                        oldElo: message.blackElo
                    },
                    moves: this.games.get(message.id).moves
                });
        }, 1000);
        this.games.set(message.id, {
            whiteTime,
            blackTime,
            increment: message.increment,
            interval,
            isWhiteTurn: true,
            moves: 0,
            board: message.board,
            whiteCastling: { WKSC: true, WQSC: true },
            blackCastling: { BKSC: true, BQSC: true },
            enPassant: { isAvailable: false, passingPawn: [], captureSquare: [] },
            isCheck: false
        });
        this.server.in(message.id).emit('sendTime', { whiteTime: message.time, blackTime: message.time });
    }
    async handleEndGame(message) {
        if (this.games.has(message.id)) {
            clearInterval(this.games.get(message.id).interval);
            this.games.delete(message.id);
        }
        this.gamesService.updateGame(message.id, {
            isFinished: true,
            chat: [],
            moves: message.moves,
            white: {
                username: message.white.username,
                eloAtTheTime: message.white.oldElo,
                score: message.white.score
            },
            black: {
                username: message.black.username,
                eloAtTheTime: message.black.oldElo,
                score: message.black.score
            },
        });
        let expectedWhiteScore = 1 / (1 + Math.pow(10, (message.black.oldElo - message.white.oldElo) / 400));
        let newWhiteElo = Math.round(message.white.oldElo + 40 * ((message.white.score === message.black.score ? 0.5 : message.white.score) - expectedWhiteScore));
        let expectedBlackScore = 1 - expectedWhiteScore;
        let newBlackElo = Math.round(message.black.oldElo + 40 * ((message.white.score === message.black.score ? 0.5 : message.black.score) - expectedBlackScore));
        this.server.in(message.id).emit('endGame', { white: { score: message.white.score, newElo: newWhiteElo }, black: { score: message.black.score, newElo: newBlackElo } });
        const white = await this.usersService.getUserByUsername(message.white.username);
        let whiteStats = white.stats;
        whiteStats[message.mode].totalGames++;
        whiteStats[message.mode].elo = newWhiteElo;
        const black = await this.usersService.getUserByUsername(message.black.username);
        let blackStats = black.stats;
        blackStats[message.mode].totalGames++;
        blackStats[message.mode].elo = newBlackElo;
        if (message.white.score === message.black.score) {
            whiteStats[message.mode].draw++;
            blackStats[message.mode].draw++;
        }
        else if (message.white.score === 1) {
            whiteStats[message.mode].won++;
            blackStats[message.mode].lost++;
        }
        else if (message.black.score === 1) {
            whiteStats[message.mode].lost++;
            blackStats[message.mode].won++;
        }
        await this.usersService.updateUser(white._id, { stats: whiteStats });
        await this.usersService.updateUser(black._id, { stats: blackStats });
        this.server.socketsLeave(message.id);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], GameGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('offerDraw'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleOfferDraw", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('madeMove'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleMadeMove", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('getGameData'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleGetData", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('startTimer'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleStartTimer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('endGame'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GameGateway.prototype, "handleEndGame", null);
GameGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [users_service_1.UsersService, games_service_1.GamesService])
], GameGateway);
exports.GameGateway = GameGateway;
//# sourceMappingURL=game.gateway.js.map