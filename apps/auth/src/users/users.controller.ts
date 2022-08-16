import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Session,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { UserPayload } from '@app/common/middlewares/current-user.middleware';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  hello() {
    return 'Hello World!';
  }

  @Get('current-user')
  currentUser(@Req() req: Request): UserPayload {
    return req.currentUser;
  }

  @Post('signin')
  signin(
    @Body() signupUserDTO: SignupUserDTO,
    @Session() session: Record<string, string>,
  ) {
    return this.usersService.signin(signupUserDTO);
  }

  @Post('signup')
  signup(
    @Body() signupUserDTO: SignupUserDTO,
    @Session() session: Record<string, string>,
  ) {
    return this.usersService.signup(signupUserDTO, session);
  }

  @Post('signout')
  signout(@Session() session: Record<string, string>) {
    session = null;
    return {};
  }
}
