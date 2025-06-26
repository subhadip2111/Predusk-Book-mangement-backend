import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/user/entities/user.entity';

export class RegisterDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()

    @MinLength(6)
    password: string;

    @ApiProperty({ enum: UserRole })
    @IsNotEmpty()

    @IsEnum(UserRole)
    role: UserRole;
}


export class UserDetailsDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: string;
}

export class RegisterOutputDataDto {
  @ApiProperty({ description: 'JWT Access Token after successful registration' })
  accessToken: string;

  @ApiProperty({ type: UserDetailsDto, description: 'User details after successful registration' })
  userDetails: UserDetailsDto;
}

export class RegisterOutputDto {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'User registered successfully' })
  message: string;

  @ApiProperty({example:'User deatails' })
  data: UserDetailsDto;
}