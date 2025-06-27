import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository, ILike } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { User } from 'src/user/entities/user.entity';
import { AuthorFilterDto, BookFilterDto, QureyDto } from './dto/book.filter.dto';
import { UserService } from 'src/user/user.service';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepo: Repository<Book>,
  ) { }

  async create(dto: CreateBookDto) {
    const book = this.bookRepo.create({
      ...dto,
      authorId: dto.authorId,
    });
    return this.bookRepo.save(book);
  }

  async getAuthorsAllBook(filter: AuthorFilterDto) {
    const { page = 1, limit = 10, search } = filter;
    const skip = (page - 1) * limit;

    const query = this.bookRepo.createQueryBuilder('book').where('book.authorId = :authorId', { authorId: filter.authorId })
      .leftJoinAndSelect('book.author', 'author');

    if (search) {
      query.where('book.title ILIKE :search OR book.description ILIKE :search', {
        search: `%${search}%`,
      });
    }

    const [books, total] = await query
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    return {
      total,
      page,
      limit,
      books
    };
  }



  async getAllBooks(query: QureyDto) {
    const [books, totalCount] = await this.bookRepo.createQueryBuilder('book').where('book.title ILIKE :search OR book.description ILIKE :search', {
      search: `%${query.search || ''}%`,
    })
      .skip((query.page - 1) * query.limit)
      .take(query.limit)
      .leftJoinAndSelect('book.author', 'author')
      .getManyAndCount();
    return { books, totalCount }
  }
  async findById(id: string) {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!book) throw new NotFoundException('Book not found');
    return book
  }

  async update(id: string, updateObject: UpdateBookDto) {
    const book = await this.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    if (updateObject.authorId && updateObject.authorId !== book.authorId) {
      throw new ForbiddenException('You cannot change the author of this book');
    }
    Object.assign(book, updateObject);
    return this.bookRepo.save(book);

  }

  async delete(id: string) {
    const book = await this.findById(id);
    if (!book) throw new NotFoundException('Book not found');
    const deleteBook = await this.bookRepo.remove(book);
    return deleteBook;
  }
}