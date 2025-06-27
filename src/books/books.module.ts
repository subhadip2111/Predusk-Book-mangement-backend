import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book])], 
  controllers: [BooksController],
  providers: [BookService],
})
export class BooksModule {}
