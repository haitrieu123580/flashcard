"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../entity/User");
const data_source_1 = require("../../data-source");
const typedi_1 = require("typedi");
const HashingPassword_1 = require("@helper/HashingPassword");
let UserRepo = class UserRepo {
    constructor() {
        this.userDataSource = data_source_1.AppDataSource.getRepository(User_1.User);
        this.getUserByUsername = async (username) => {
            const result = await this.userDataSource.findOne({
                where: {
                    username: username
                },
                select: [
                    'id',
                    'username',
                    'email',
                    'password',
                    'role',
                ]
            });
            return result;
        };
        this.isExistedEmail = async (email) => {
            const user = await this.userDataSource.find({
                where: {
                    email: email
                }
            });
            if (user.length) {
                return true;
            }
            return false;
        };
        this.createUser = async (data) => {
            const user = new User_1.User();
            user.email = data.email;
            user.username = data.username;
            const { password } = (0, HashingPassword_1.hasingPassword)(String(data.password));
            user.password = password;
            const created = await this.userDataSource.save(user);
            return created;
        };
        this.me = async (id) => {
            const result = await this.userDataSource.findOne({
                where: {
                    id: id
                },
                // select: [
                //     "id",
                //     "username",
                //     "email",
                //     "avatar",
                //     "created_at",
                //     "created_by",
                //     "updated_at",
                //     "updated_by",
                // ],
            });
            return result;
        };
        this.updateAvatar = async (userId, imagePath) => {
            const user = await this.userDataSource.findOneBy({ id: userId });
            if (user) {
                user.avatar = imagePath;
                await this.userDataSource.save(user);
                return true;
            }
            else {
                return false;
            }
        };
        this.isExistedToken = async (token) => {
            const user = await this.userDataSource.findOneBy({
                token: token
            });
            if (user) {
                return true;
            }
            return false;
        };
        this.storeToken = async (id, token) => {
            const user = await this.userDataSource.findOneBy({
                id: id
            });
            if (user) {
                user.token = token;
                await this.userDataSource.save(user);
                return true;
            }
            return false;
        };
        this.updateUserPassword = async (id, password) => {
            const user = await this.userDataSource.findOneBy({
                id: id
            });
            if (user) {
                user.password = password;
                await this.userDataSource.save(user);
                return true;
            }
            return false;
        };
        this.getUserByEmail = async (email) => {
            const result = await this.userDataSource.findOne({
                where: {
                    email: email
                }
            });
            return result;
        };
    }
};
UserRepo = __decorate([
    (0, typedi_1.Service)()
], UserRepo);
exports.default = UserRepo;
