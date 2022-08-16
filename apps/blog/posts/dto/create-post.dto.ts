import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  description: string;
}
