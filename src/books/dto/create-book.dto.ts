import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
    @ApiProperty({ description: 'Title of the book' })
    @IsString()
    title: string;

    @ApiProperty({ required: false })
    @IsString()
    description?: string;
    @IsString()
    @IsOptional()
    authorId: string;
}



export class BookResponseDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    authorId: number;

    @ApiProperty()
    authorName: string;
}
