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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./schemas/user.schema");
const bcrypt_1 = require("../utils/bcrypt");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async getUserById(userId) {
        return this.userModel.findById(userId);
    }
    async getUserByUsername(username) {
        const user = this.userModel.findOne({ username: username });
        return user;
    }
    async getUsers() {
        return this.userModel.find().select({ username: 1, stats: 1 });
    }
    async createUser(createUserDto) {
        const password = (0, bcrypt_1.encodePassword)(createUserDto.password);
        const newUser = new this.userModel(Object.assign(Object.assign({}, createUserDto), { password, registrationDate: new Date(Date.now()), stats: {
                bullet: {
                    totalGames: 0,
                    won: 0,
                    lost: 0,
                    draw: 0,
                    elo: 600
                },
                blitz: {
                    totalGames: 0,
                    won: 0,
                    lost: 0,
                    draw: 0,
                    elo: 600
                },
                rapid: {
                    totalGames: 0,
                    won: 0,
                    lost: 0,
                    draw: 0,
                    elo: 600
                }
            } }));
        return newUser.save();
    }
    async updateUser(userId, updateUserDto) {
        return this.userModel.findByIdAndUpdate(userId, updateUserDto);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map