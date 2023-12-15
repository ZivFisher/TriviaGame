import { RequestUser, RequestUserType, UseJwtAuth, UseLocalAuth, User, UserService } from '@hilma/auth-nest';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) { }

    @Post('/register')
    async register(@Body() body: Partial<User>, @Res() res: Response) {
        try {
            const user: Partial<User> = new User({
                username: body.username,
                password: body.password,
            });
            const { id } = await this.userService.createUser<User>({
                ...user,
                roles: [{ id: 2 }]
            });
            return id;
        } catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                return res.status(409).send();
            }
            else {
                return res.status(500).send();
            }
        }
    }


    @UseLocalAuth()
    @Post('/login')
    async login(@RequestUser() userInfo: RequestUserType, @Res() res: Response) {
        const body = this.userService.login(userInfo, res);
        return res.send(body);
    }

    @UseJwtAuth()
    @Get('user')
    getUser(@RequestUser() userInfo: RequestUserType) {
        return userInfo;
    }

}