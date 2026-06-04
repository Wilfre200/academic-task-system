import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TasksService {

  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.task.create({ data });
  }

  findAll() {

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