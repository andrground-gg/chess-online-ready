"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const games_module_1 = require("./games/games.module");
const chat_gateway_1 = require("./gateways/chat.gateway");
const game_gateway_1 = require("./gateways/game.gateway");
const search_gateway_1 = require("./gateways/search.gateway");
const users_module_1 = require("./users/users.module");
require('dotenv').config();
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot(`${process.env.MONGODB_URI}`),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            games_module_1.GamesModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'chess-site-frontend/dist')
            })
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, search_gateway_1.SearchGateway, chat_gateway_1.ChatGateway, game_gateway_1.GameGateway],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map