import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {

  constructor(
    private prisma: PrismaService,
  ) {}

  create(data: any) {
    return this.prisma.comment.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  findByTask(taskId: number) {
    return this.prisma.comment.findMany({
      where: {
        taskId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  update(id: number, content: string) {

  return this.prisma.comment.update({

    where: {
      id,
    },

    data: {
      content,
    },

  });

}

delete(id: number) {

  return this.prisma.comment.delete({

    where: {
      id,
    },

  });

}

}