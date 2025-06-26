import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
}


export class LoginUserDetailsDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;
}

export class LoginOutputDataDto {
  @ApiProperty({ description: 'JWT Access Token after successful login' })
  accessToken: string;

  @ApiProperty({ type: LoginUserDetailsDto, description: 'User details after successful login' })
  user: LoginUserDetailsDto;
}

export class LoginOutputDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'User logged in successfully' })
  message: string;

  @ApiProperty({ type: LoginOutputDataDto })
  data: LoginOutputDataDto;
}