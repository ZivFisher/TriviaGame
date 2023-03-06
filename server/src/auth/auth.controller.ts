import { RequestUser, RequestUserType, UseLocalAuth, User, UserService } from '@hilma/auth-nest';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) { }

    @UseLocalAuth()
    @Post('/login')
    async login(@RequestUser() userInfo: RequestUserType, @Res() res: Response) {
        let body = this.userService.login(userInfo, res);
        res.send(body);
    }

    @Post('/register')
    async register(@Body() body: Partial<User>) {
        let user: Partial<User> = new User({
            username: body.username,
            password: body.password,
        });
        const { id } = await this.userService.createUser<User>({ ...user, roles: [{ id: 1 }] });
        return id;
    }
}
