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
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDTO } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { UserPayload } from '@app/common/middlewares/current-user.middleware';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  hello() {
    return 'Hello World!';
  }

  @Get('current-user')
  currentUser(@Req() req: Request): { currentUser: UserPayload } {
    return { currentUser: req.currentUser };
  }

  @Post('signin')
  signin(@Body() signupUserDTO: SignupUserDTO, @Res() res: Response) {
    return this.usersService.signin(signupUserDTO, res);
  }

  @Post('signup')
  signup(@Body() signupUserDTO: SignupUserDTO, @Res() res: Response) {
    return this.usersService.signup(signupUserDTO, res);
  }

  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('current-user');
    return {};
  }
}
