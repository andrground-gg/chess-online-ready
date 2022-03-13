import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    getUserById(userId: string): Promise<User>;
    getUserByUsername(username: string): Promise<User>;
    getUsers(): Promise<User[]>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    updateUser(userId: string, updateUserDto: UpdateUserDto): Promise<User>;
}
