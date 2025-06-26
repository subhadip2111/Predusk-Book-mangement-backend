import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { Exclude } from 'class-transformer';
import { Review } from 'src/review/entities/review.entity';

export enum UserRole {
    USER = 'user',
    AUTHOR = 'author',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @OneToMany(() => Review, (review) => review.user)
    reviews: Review[];

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];
}
