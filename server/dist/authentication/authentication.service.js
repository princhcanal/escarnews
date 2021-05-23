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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const postgresErrorCodes_enum_1 = require("../database/postgresErrorCodes.enum");
const user_entity_1 = require("../users/user.entity");
let AuthenticationService = class AuthenticationService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async register(registrationData, res) {
        const { email, password } = registrationData;
        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            const createdUser = await this.usersService.create({
                ...registrationData,
                password: hashedPassword,
            });
            await this.login({ email, password }, res);
            createdUser.password = undefined;
            return createdUser;
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === postgresErrorCodes_enum_1.PostgresErrorCode.UniqueViolation) {
                throw new common_1.HttpException('User with that username or email already exists', common_1.HttpStatus.BAD_REQUEST);
            }
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async login(loginData, res) {
        const user = await this.getAuthenticatedUser(loginData.email, loginData.password);
        const cookie = this.getCookieWithJwtToken(user);
        res.setHeader('Set-Cookie', cookie);
        user.password = undefined;
        return res.send(user);
    }
    logout(res) {
        res.setHeader('Set-Cookie', this.getCookieForLogOut());
        const message = 'Logged out successfully';
        return res.send({ message });
    }
    async getAuthenticatedUser(email, plainTextPassword) {
        try {
            const user = await this.usersService.getByEmail(email);
            await this.verifyPassword(plainTextPassword, user.password);
            return user;
        }
        catch (error) {
            throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getCookieWithJwtToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            username: user.username,
        };
        const token = this.jwtService.sign(payload);
        return `Authorization=${token}; Path=/; Max-Age=${this.configService.get('JWT_EXPIRATION_TIME')}`;
    }
    getCookieForLogOut() {
        return `Authorization=; Path=/; Max-Age=0`;
    }
    async verifyPassword(plainTextPassword, hashedPassword) {
        const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
        if (!isPasswordMatching) {
            throw new common_1.HttpException('Wrong credentials provided', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
AuthenticationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map