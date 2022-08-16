import jwt from 'jsonwebtoken';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Res,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SigninUserDTO, SignupUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Response } from 'express';
import { Password } from '../services/password';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async signin(
    { email, password }: SigninUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.userModel.findOne({ email });
    if (!user) throw new NotFoundException();

    const match = await Password.compare(password, user.password);

    if (!match) throw new BadRequestException('Invalid Credentials');

    response.cookie('current-user', JSON.stringify(user)).send(user);
    return user;
  }

  async signup(
    { email, password }: SignupUserDTO,
    @Res({ passthrough: true }) response: Response,
  ) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new BadRequestException('Email already exists');
    const user = await this.userModel.create({ email, password });

    // const userJWT = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //   },
    //   process.env.JWT_KEY!,
    // );

    // session.jwt = userJWT;
    response.cookie('current-user', JSON.stringify(user)).send(user);

    return user;
  }

  async signout(signinUserDTO: SigninUserDTO) {
    return 'This action adds a new user';
  }
}
