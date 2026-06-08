import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.task.create({ data });
  }

 findAll(user: any) {

  if (user.role === 'ADMIN') {

    return this.prisma.task.findMany({

      include: {

        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },

        comments: {

          include: {

            user: {
              select: {
                id: true,
                name: true,
              },
            },

          },

          orderBy: {
            createdAt: 'desc',
          },

        },

      },

    });

  }

  return this.prisma.task.findMany({

    where: {
      userId: user.sub,
    },

    include: {

      user: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },

      comments: {

        include: {

          user: {
            select: {
              id: true,
              name: true,
            },
          },

        },

        orderBy: {
          createdAt: 'desc',
        },

      },

    },

  });

}

findOne(id: number) {
  return this.prisma.task.findUnique({
    where: { id },
  });
}

update(id: number, data: any) {
  return this.prisma.task.update({
    where: { id },
    data,
  });
}

delete(id: number) {
  return this.prisma.task.delete({
    where: { id },
  });
}

}