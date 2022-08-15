import jwt from 'jsonwebtoken';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SigninUserDTO, SignupUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async signin(signinUserDTO: SigninUserDTO) {
    return 'This action adds a new user';
  }

  async signup(
    { email, password }: SignupUserDTO,
    session: Record<string, string>,
  ) {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) throw new BadRequestException('Email already exists');
    const user = await this.userModel.create({ email, password });

    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    session.jwt = userJWT;
    return user;
  }

  async signout(signinUserDTO: SigninUserDTO) {
    return 'This action adds a new user';
  }
}
