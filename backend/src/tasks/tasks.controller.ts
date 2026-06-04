import { Controller, Get, Post, Body, Put, Delete, Param, UseGuards, } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

@Controller('tasks')
export class TasksController {

  constructor(private tasksService: TasksService) {}

  @Post()
  create(@Body() body: any) {
    return this.tasksService.create(body);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @UseGuards(JwtGuard)
@Get(':id')
findOne(@Param('id') id: string) {
  return this.tasksService.findOne(+id);
}

@UseGuards(JwtGuard)
@Put(':id')
update(
  @Param('id') id: string,
  @Body() body: any,
) {
  return this.tasksService.update(+id, body);
}

@UseGuards(JwtGuard)
@Delete(':id')
delete(@Param('id') id: string) {
  return this.tasksService.delete(+id);
}

}