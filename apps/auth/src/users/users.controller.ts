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
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupUserDTO } from './dto/create-user.dto';
import { Request, Response } from 'express';
import { UserPayload } from '@app/common/middlewares/current-user.middleware';
import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { Auth } from '@app/common/guards/auth.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  hello() {
    return 'Hello World!';
  }

  @Get('current-user')
  currentUser(@CurrentUser() user: UserPayload): { currentUser: UserPayload } {
    return { currentUser: user };
  }

  @Post('signin')
  signin(@Body() signupUserDTO: SignupUserDTO, @Res() res: Response) {
    return this.usersService.signin(signupUserDTO, res);
  }

  @Post('signup')
  signup(@Body() signupUserDTO: SignupUserDTO, @Res() res: Response) {
    return this.usersService.signup(signupUserDTO, res);
  }

  @Post('make-me-admin')
  @UseGuards(Auth)
  makeMeAdmin(@CurrentUser() user: UserPayload, @Res() res: Response) {
    return this.usersService.makeMeAdmin(user, res);
  }

  @Post('signout')
  signout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('current-user');
    return {};
  }
}
