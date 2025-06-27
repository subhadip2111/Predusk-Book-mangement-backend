import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiSuccessResponse } from 'src/utils/ApiSuccess';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Review } from './entities/review.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Review')
@ApiBearerAuth('accessToken')

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) { }

  @ApiOperation({ summary: 'Create a new review' })
  @ApiBody({ type: CreateReviewDto, description: 'Provide review details', required: true })
  @ApiParam({ name: 'userId', type: String, description: 'ID of the user creating the review' })
  @ApiParam({ name: 'bookId', type: String, description: 'ID of the book being reviewed' })
  @ApiResponse({ status: 201, description: 'Review created successfully', type: Review })
  @UseGuards(JwtAuthGuard)

  @Post('/add/user/:userId/book/:bookId')
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Param('userId') userId: string,
    @Param('bookId') bookId: string
  ) {
    const rating = await this.reviewService.create({ ...createReviewDto, userId, bookId });
    return new ApiSuccessResponse(201, true, 'Review created successfully', rating);
  }
  @ApiOperation({ summary: 'Get all reviews for a book' })
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'bookId', type: String, description: 'ID of the book' })
  @ApiResponse({ status: 200, description: 'Reviews fetched successfully', type: [Review] })
  @Get(':bookId')
  async findAll(@Param('bookId') bookId: string) {
    const rating = await this.reviewService.findAll(bookId);
    return new ApiSuccessResponse(200, true, 'Reviews fetched successfully', rating);
  }

  @ApiOperation({ summary: 'Get a review by ID' })
  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: String, description: 'ID of the review' })
  @ApiResponse({ status: 200, description: 'Review fetched successfully', type: Review })
  @Get('single/:id')
  async findOne(@Param('id') id: string) {
    const ratingDetails = await this.reviewService.findOne(id);
    return new ApiSuccessResponse(200, true, 'Review fetched successfully', ratingDetails);
  }
}