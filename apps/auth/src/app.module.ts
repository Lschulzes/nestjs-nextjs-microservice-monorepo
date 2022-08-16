import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Password } from './services/password';
import { User, UserSchema } from './users/schemas/user.schema';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', async function (next) {
            if (this.isModified('password')) {
              const hashedPassword = await Password.toHash(this.password);
              this.set('password', hashedPassword);
            }
            next();
          });
          return schema;
        },
      },
    ]),
    MongooseModule.forRoot('mongodb://auth-mongo-monorepo-srv:27017/auth'),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({ whitelist: true }),
    },
  ],
})
export class AppModule {}
