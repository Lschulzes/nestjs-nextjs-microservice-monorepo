import { CurrentUser } from '@app/common/decorators/current-user.decorator';
import { Auth } from '@app/common/guards/auth.guard';
import { UserPayload } from '@app/common/middlewares/current-user.middleware';
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { getCurrentDate } from 'libs/date-utils/src';
import { SignupUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  hello() {
    const today = getCurrentDate();
    return today.toISOString();
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
