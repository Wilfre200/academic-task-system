import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';

import * as bcrypt from 'bcrypt';

import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {

  constructor(
    private usersService: UsersService,
  ) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  async create(@Body() body: any) {

    const hashedPassword =
      await bcrypt.hash(
        body.password,
        10,
      );

    return this.usersService.create({
      ...body,
      password: hashedPassword,
    });
  }

  @Get()
  @Roles('ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  findOne(
    @Param('id') id: string,
  ) {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @Roles('ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.usersService.update(
      +id,
      body,
    );
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(JwtGuard, RolesGuard)
  delete(
    @Param('id') id: string,
  ) {
    return this.usersService.delete(+id);
  }

}