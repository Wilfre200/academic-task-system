import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('tasks')
export class TasksController {

  constructor(
    private tasksService: TasksService,
  ) {}

  @Post()
  create(@Body() body: any) {
    return this.tasksService.create(body);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll(@Req() req: any) {
    return this.tasksService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @Put(':id')
  @UseGuards(JwtGuard)
  update(
    @Param('id') id: string,
    @Body() body: any,
  ) {
    return this.tasksService.update(+id, body);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  delete(@Param('id') id: string) {
    return this.tasksService.delete(+id);
  }

}