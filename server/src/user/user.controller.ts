import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserService, UseLocalAuth, RequestUser, User } from '@hilma/auth-nest';

@Controller('/api/user')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @UseLocalAuth()
    @Post('/login')
    login(@RequestUser() userInfo, @Res() res) {
        let body = this.userService.login(userInfo, res);
        res.send(body);
    }

    @Post('/register')
    register(@Body() body: Partial<User>) {
        let user: Partial<User> = new User({
            username: body.username,
            password: body.password,
        });
        this.userService.createUser<User>(user);
    }
} 
