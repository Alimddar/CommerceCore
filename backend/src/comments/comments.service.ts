import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const user = await this.usersRepository.findOneBy({
      id: createCommentDto.user_id,
    });
    const product = await this.productsRepository.findOneBy({
      id: createCommentDto.product_id,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createCommentDto.user_id} does not exist.`,
      );
    }
    if (!product) {
      throw new NotFoundException(
        `Product with ID ${createCommentDto.product_id} does not exist.`,
      );
    }
    const newComment = this.commentsRepository.create(createCommentDto);
    return this.commentsRepository.save(newComment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentsRepository.find();
  }

  async findOne(id: number): Promise<Comment> {
    return this.commentsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.commentsRepository.findOneBy({ id });
    const updatedComment = Object.assign(comment, updateCommentDto);
    return this.commentsRepository.save(updatedComment);
  }

  async remove(id: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOneBy({ id });
    return this.commentsRepository.remove(comment);
  }
}
