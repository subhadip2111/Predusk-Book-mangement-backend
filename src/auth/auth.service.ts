import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private jwtService: JwtService,
  ) { }

  async register(dto: RegisterDto) {
    const userExists = await this.userRepo.findOne({ where: { email: dto.email } });
    if (userExists) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({ ...dto, password: hashedPassword });
   return await this.userRepo.save(user);
  }

  async login(email: string, password: string) {  
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }
    const user = await this.userRepo.findOne({ where: { email:email} });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    },{
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXP
    });

    return { accessToken: token, user };
  }
}
