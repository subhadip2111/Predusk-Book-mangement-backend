import { ApiProperty } from '@nestjs/swagger';

export class AuthorDto {
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

export class BookDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  authorId: string;

  @ApiProperty({ type: AuthorDto })
  author: AuthorDto;
}

export class BooksListDataDto {
  @ApiProperty()
  totalCount: number;

  @ApiProperty()
  page: string;

  @ApiProperty()
  limit: string;

  @ApiProperty({ type: [BookDto] })
  books: BookDto[];
}

export class BooksListOutputDto {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Books fetched successfully' })
  message: string;

  @ApiProperty({ type: BooksListDataDto })
  data: BooksListDataDto;
}