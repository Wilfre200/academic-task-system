import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';

import { CommentsService } from './comments.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Put, Delete } from '@nestjs/common';

@Controller('comments')
export class CommentsController {

  constructor(
    private commentsService: CommentsService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() body: any,
    @Req() req: any,
  ) {

    return this.commentsService.create({
      content: body.content,
      taskId: body.taskId,
      userId: req.user.sub,
    });

  }

  @Get('task/:taskId')
  findByTask(
    @Param('taskId') taskId: string,
  ) {
    return this.commentsService.findByTask(
      +taskId,
    );
  }

  @UseGuards(JwtGuard)
@Put(':id')
update(
  @Param('id') id: string,
  @Body() body: any,
) {

  return this.commentsService.update(
    +id,
    body.content,
  );

}

@UseGuards(JwtGuard)
@Delete(':id')
delete(
  @Param('id') id: string,
) {

  return this.commentsService.delete(
    +id,
  );

}

}