import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewService {

  constructor(@InjectRepository(Review)
  private reviewRepo: Repository<Review>,) { }


  async create(createReviewDto: CreateReviewDto) {
const review = this.reviewRepo.create(createReviewDto);
    return this.reviewRepo.save(review);


  }

  async findAll(bookId: string) {
    const reviews = await this.reviewRepo.find({
      where: { book: { id: bookId } },
      relations: ['user', 'book'],
    });
    if (reviews.length === 0) {
      throw new NotFoundException(`No reviews found for book with ID ${bookId}`);
    }
    return reviews;
  }

  async findOne(id: string) {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ['user', 'book'],
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
    return review;
  }




}
