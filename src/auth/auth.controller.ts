import { Controller, Post, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, RegisterOutputDto } from './dto/register.dto';
import { LoginDto, LoginOutputDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiSuccessResponse } from 'src/utils/ApiSuccess';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: 'Register a user ' })
  @ApiBody({ type: RegisterDto, description: 'Give the RegisterDto deatails ', required: true })
    @ApiResponse({ status: 201, type: RegisterOutputDto })
  @Post('register')
  async register(@Body() dto: RegisterDto ) {
    const registerDetails=await  this.authService.register(dto);
    return new ApiSuccessResponse(HttpStatus.CREATED,true, 'User registered successfully', registerDetails);
  }

   @ApiOperation({ summary: 'Login ' })
  @ApiBody({ type: LoginDto, description: 'Give the login credentials ', required: true })
    @ApiResponse({ status: 200, type: LoginOutputDto })
  @Post('login')
  async login(@Body() dto: LoginDto) {
   console.log('dto', dto);
    const loginUser= await this.authService.login(dto.email, dto.password);
    return new ApiSuccessResponse(HttpStatus.OK, true, 'User logged in successfully', loginUser);
  }
}
