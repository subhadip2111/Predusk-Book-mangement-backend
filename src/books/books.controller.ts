import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, NotFoundException } from '@nestjs/common';
import { BookService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/user/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { ApiSuccessResponse } from 'src/utils/ApiSuccess';
import { AuthorFilterDto, QureyDto } from './dto/book.filter.dto';
import { BookDto, BooksListOutputDto } from './dto/response.dto';

@ApiTags('Books')
@ApiBearerAuth('accessToken')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BookService) { }

  @ApiOperation({ summary: 'Create a new book' })
  @ApiBody({ type: CreateBookDto, description: 'Provide book details', required: true })
  @ApiResponse({ status: 201, description: 'Book created successfully' , type: BookDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.AUTHOR)
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Req() req: any) {
    createBookDto.authorId = req.user.userId;
    const newBook = await this.booksService.create(createBookDto);
    return new ApiSuccessResponse(201, true, 'Book created successfully', newBook);
  }

  @ApiOperation({ summary: "Get an author's all books" })
  @ApiQuery({ name: 'query', type: AuthorFilterDto, required: false, description: 'Filter books by, search term, page and limit' })
  @ApiResponse({ status: 200, description: 'Books fetched successfully', type: BooksListOutputDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.AUTHOR)
  @ApiParam({ name: 'authorId', type: String, description: 'ID of the author whose books are to be fetched' })
  @Get('authors/:authorId/all-books')
  async getAuthorsAllBooks(@Query() query: AuthorFilterDto, @Req() req: any, @Param('authorId') authorId: string) {
    query.authorId = authorId
    const { total, page, limit, books } = await this.booksService.getAuthorsAllBook(query);
    return new ApiSuccessResponse(200, true, 'Books fetched successfully', {
      totalCount: total, page, limit, books
    });
  }

  @ApiOperation({ summary: 'Get all books' })
  @ApiQuery({ name: 'query', type: QureyDto, required: false, description: 'Filter books by, search term, page and limit' })
  @ApiResponse({ status: 200, description: 'Books fetched successfully', type: BooksListOutputDto })
  @UseGuards(JwtAuthGuard)
  @Get('all-books')
  async findAll(@Query() query: QureyDto) {
    const { books, totalCount } = await this.booksService.getAllBooks(query);
    return new ApiSuccessResponse(200, true, 'Books fetched successfully', {
      totalCount: totalCount,
      page: query.page || 1,
      limit: query.limit || 10,
      books
    });
  }

  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the book to fetch' })
  @ApiResponse({ status: 200, description: 'Book details fetched successfully', type: BookDto })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const bookDetails = await this.booksService.findById(id);
    if (!bookDetails) {
      return new NotFoundException(`Book with ID ${id} not found`);
    }
    return new ApiSuccessResponse(200, true, 'Book details fetched successfully', bookDetails)
  }

  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the book to update' })
  @ApiBody({ type: UpdateBookDto, description: 'Provide updated book details', required: true })
  @ApiResponse({ status: 200, description: 'Book updated successfully', type: BookDto })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.AUTHOR)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const updatedBook = await this.booksService.update(id, updateBookDto);
    if (!updatedBook) {
      return new NotFoundException(`Book with ID ${id} not found`);
    }
    return new ApiSuccessResponse(200, true, 'Book updated successfully', updatedBook);
  }

  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the book to delete' })
  @ApiResponse({ status: 200, description: 'Book deleted successfully' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.AUTHOR)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleteBook = await this.booksService.delete(id);
    if (!deleteBook) {
      return new NotFoundException(`Book with ID ${id} not found`);
    }
    return new ApiSuccessResponse(200, true, 'Book deleted successfully', deleteBook);
  }
}