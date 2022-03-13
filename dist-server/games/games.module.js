"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GamesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const game_schema_1 = require("./schemas/game.schema");
const games_controller_1 = require("./games.controller");
const games_service_1 = require("./games.service");
const users_module_1 = require("../users/users.module");
let GamesModule = class GamesModule {
};
GamesModule = __decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UsersModule, mongoose_1.MongooseModule.forFeature([{ name: game_schema_1.Game.name, schema: game_schema_1.GameSchema }])],
        controllers: [games_controller_1.GamesController],
        providers: [games_service_1.GamesService],
        exports: [games_service_1.GamesService]
    })
], GamesModule);
exports.GamesModule = GamesModule;
//# sourceMappingURL=games.module.js.map