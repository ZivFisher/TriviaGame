import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserModule as BasicUserModule } from '@hilma/auth-nest';

@Module({
  imports: [BasicUserModule],
  controllers: [UserController]
})
export class UserModule { }
