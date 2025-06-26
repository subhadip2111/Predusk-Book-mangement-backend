import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [

ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 3,
    }]),
    TypeOrmModule.forRoot({
      type: "postgres", 
      host: process.env.DB_HOST,
      url: process.env.DATABASE_URL,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNC === 'true', 
      logging: process.env.DB_LOGGING === 'true', 
      ssl: process.env.DB_SSL === 'true', 
      extra: process.env.DB_SSL === 'true' ? { ssl: { rejectUnauthorized: false } } : undefined, 
    }),
    ReviewModule,
    UserModule,
    AuthModule, BooksModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
