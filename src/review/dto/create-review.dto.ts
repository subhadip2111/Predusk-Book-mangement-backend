import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {
    @ApiProperty({ description: 'add rating ' })
    @IsNumber()
    rating: number;

    @ApiProperty({ description: 'add comment ' })
    @IsString()
    comment?: string;


    @IsString()
    @IsOptional()
    userId: string;

    @IsOptional()
    @IsString()
    bookId: string;
}
