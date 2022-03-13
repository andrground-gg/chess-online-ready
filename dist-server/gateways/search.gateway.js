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
exports.SearchGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const games_service_1 = require("../games/games.service");
let SearchGateway = class SearchGateway {
    constructor(gamesService) {
        this.gamesService = gamesService;
        this.socketsUsers = new Map();
    }
    async handleStartSearch(message, client) {
        const roomName = `${message.mode}:${message.timeMode}`;
        for (var room of client.rooms)
            client.leave(room);
        client.join(roomName);
        this.socketsUsers.forEach((val, key) => {
            if (val.username === message.username) {
                this.socketsUsers.delete(key);
                return;
            }
        });
        this.socketsUsers.set(client.id, { username: message.username, elo: message.elo });
        let roomSet = this.server.sockets.adapter.rooms.get(roomName);
        if (this.server.sockets.adapter.rooms.get(roomName).size === 2) {
            const game = await this.gamesService.createGame({
                date: new Date(Date.now()),
                mode: message.mode,
                timeMode: message.timeMode,
                white: {
                    username: this.socketsUsers.get(Array.from(roomSet)[0]).username,
                    eloAtTheTime: this.socketsUsers.get(Array.from(roomSet)[0]).elo
                },
                black: {
                    username: this.socketsUsers.get(Array.from(roomSet)[1]).username,
                    eloAtTheTime: this.socketsUsers.get(Array.from(roomSet)[1]).elo
                }
            });
            this.server.in(roomName).emit('startGame', game._id);
            this.server.socketsLeave(roomName);
        }
    }
    async handleCancelSearch(message, client) {
        const roomName = `${message.mode}:${message.timeMode}`;
        client.leave(roomName);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", Object)
], SearchGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('startSearch'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SearchGateway.prototype, "handleStartSearch", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('cancelSearch'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], SearchGateway.prototype, "handleCancelSearch", null);
SearchGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [games_service_1.GamesService])
], SearchGateway);
exports.SearchGateway = SearchGateway;
//# sourceMappingURL=search.gateway.js.map