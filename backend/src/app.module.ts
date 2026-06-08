import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';

@Module({
 imports: [
  PrismaModule,
  UsersModule,
  TasksModule,
  AuthModule,
  CommentsModule,
],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}