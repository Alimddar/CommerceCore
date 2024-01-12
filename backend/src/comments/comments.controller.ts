import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('CreateComment')
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto);
  }

  @Get('FindAll')
  async findAll() {
    return this.commentsService.findAll();
  }

  @Get('FindOne/:id')
  async findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Patch('Update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(id, updateCommentDto);
  }

  @Delete('Remove/:id')
  async remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
