import { Review } from 'src/review/entities/review.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

    @Column({ nullable: true })
    authorId: string;
  @ManyToOne(() => User, (user) => user.books)
  author: User;


  @OneToMany(() => Review, (review) => review.book)
  reviews: Review[];
}
