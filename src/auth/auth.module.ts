import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]), UserModule,JwtModule.register({
    secret: process.env.JWT_SECRET ,
          signOptions: { expiresIn: '30d  ' },

  })],
  controllers: [AuthController],
  providers: [AuthService,JwtService,JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
