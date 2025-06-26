import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BookService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/user/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';
import { ApiSuccessResponse } from 'src/utils/ApiSuccess';
@ApiTags('Books')

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BookService) { }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.AUTHOR)

  @ApiOperation({ summary: 'Create a new book' })
  @ApiBearerAuth('accessToken')
  @ApiBody({ type: CreateBookDto, description: 'Provide book details', required: true })
  @UseGuards(JwtAuthGuard)

  @ApiResponse({ status: 201, description: 'Book created successfully', })
  @Post()
  async create(@Body() createBookDto: CreateBookDto, @Req() req: any) {
    console.log(req.user);
    createBookDto.authorId = req.user.userId; // Set the authorId from the authenticated user
    const newBook = await this.booksService.create(createBookDto);
    console.log('newBook', newBook);
    return new ApiSuccessResponse(201, true, 'Book created successfully', newBook);

  }

  // @Get()
  // findAll() {
  //   return this.booksService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.booksService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
  //   return this.booksService.update(+id, updateBookDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.booksService.remove(+id);
  // }
}
