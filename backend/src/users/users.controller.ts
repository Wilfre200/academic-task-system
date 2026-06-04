import { Controller, Get, Post, Body, Put, Delete, Param, } from '@nestjs/common';
import { UsersService } from './users.service';


import * as bcrypt from 'bcrypt';

@Controller('users')
export class UsersController {

  constructor(private usersService: UsersService) {}

  @Post()
  async create(@Body() body: any) {

    const hashedPassword = await bcrypt.hash(body.password, 10);

    return this.usersService.create({
      ...body,
      password: hashedPassword,
    });
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
findOne(@Param('id') id: string) {
  return this.usersService.findOne(+id);
}

@Put(':id')
update(
  @Param('id') id: string,
  @Body() body: any,
) {
  return this.usersService.update(+id, body);
}

@Delete(':id')
delete(@Param('id') id: string) {
  return this.usersService.delete(+id);
}

}