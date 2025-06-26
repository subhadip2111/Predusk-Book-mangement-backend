import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository, ILike } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { User } from 'src/user/entities/user.entity';
import { BookFilterDto } from './dto/book.filter.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) {}

  async create(dto: CreateBookDto ) {
    const book = this.bookRepo.create({
      ...dto,
      authorId: dto.authorId , // Assuming authorId is provided in the DTO
    });
    return this.bookRepo.save(book);
  }

  async findAll(filter: BookFilterDto) {
    const { page = 1, limit = 10, search } = filter;
    const skip = (page - 1) * limit;

    const query = this.bookRepo.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author');

    if (search) {
      query.where('book.title ILIKE :search OR book.description ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const [items, total] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      total,
      page,
      limit,
      data: items.map(book => ({
        id: book.id,
        title: book.title,
        description: book.description,
        authorId: book.author.id,
        authorName: book.author.name,
      })),
    };
  }

  async findById(id: string) {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ['author'],
    });

    if (!book) throw new NotFoundException('Book not found');

    return {
      id: book.id,
      title: book.title,
      description: book.description,
      authorId: book.author.id,
      authorName: book.author.name,
    };
  }

  // async delete(id: string, user: User) {
  //   const book = await this.bookRepo.findOne({
  //     where: { id },
  //     relations: ['author'],
  //   });

  //   if (!book) throw new NotFoundException('Book not found');

  //   if (book.author.id !== user.userId) {
  //     throw new ForbiddenException('You can only delete your own books');
  //   }

  //   await this.bookRepo.remove(book);
  //   return { message: 'Book deleted successfully' };
  // }
}
