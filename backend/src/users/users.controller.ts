import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('CreateUser')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('FindAll')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('FindOne/:id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('Update/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: CreateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('Remove/:id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
