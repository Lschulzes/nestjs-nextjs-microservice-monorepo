import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './users/schemas/user.schema';
import { Password } from './services/password';

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
    MongooseModule.forRoot('mongodb://auth-mongo-srv:27017/auth'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
