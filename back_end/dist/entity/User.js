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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const BaseEntity_1 = require("./BaseEntity");
const PasswordResetOtps_1 = require("./PasswordResetOtps");
const Sets_1 = require("./Sets");
const Constant_1 = require("../core/Constant");
let User = class User extends BaseEntity_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.Column)({
        name: "email",
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "username",
        unique: true,
        nullable: false,
    }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false, nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true
    }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        default: Constant_1.Constants.USER_ROLE.USER
    }),
    __metadata("design:type", Number)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => PasswordResetOtps_1.PasswordResetOtps, {
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", PasswordResetOtps_1.PasswordResetOtps)
], User.prototype, "passwordResetOtps", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Sets_1.Sets, set => set.user, {
        onDelete: "SET NULL"
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], User.prototype, "sets", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
