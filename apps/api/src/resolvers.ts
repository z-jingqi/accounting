import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    transactions: async () => {
      return prisma.transaction.findMany({
        include: {
          tags: true,
        },
      });
    },
    transaction: async (_: any, { id }: { id: string }) => {
      return prisma.transaction.findUnique({
        where: { id: parseInt(id) },
        include: {
          tags: true,
        },
      });
    },
    tags: async () => {
      return prisma.tag.findMany({
        include: {
          transactions: true,
        },
      });
    },
    tag: async (_: any, { id }: { id: string }) => {
      return prisma.tag.findUnique({
        where: { id: parseInt(id) },
        include: {
          transactions: true,
        },
      });
    },
  },
  Mutation: {
    createTransaction: async (_: any, { input }: any) => {
      const { tagIds, ...transactionData } = input;
      return prisma.transaction.create({
        data: {
          ...transactionData,
          tags: {
            connect: tagIds.map((id: string) => ({ id: parseInt(id) })),
          },
        },
        include: {
          tags: true,
        },
      });
    },
    updateTransaction: async (_: any, { input }: any) => {
      const { id, tagIds, ...updateData } = input;
      return prisma.transaction.update({
        where: { id: parseInt(id) },
        data: {
          ...updateData,
          tags: {
            set: tagIds.map((id: string) => ({ id: parseInt(id) })),
          },
        },
        include: {
          tags: true,
        },
      });
    },
    deleteTransaction: async (_: any, { id }: { id: string }) => {
      await prisma.transaction.delete({
        where: { id: parseInt(id) },
      });
      return true;
    },
    createTag: async (_: any, { input }: any) => {
      return prisma.tag.create({
        data: input,
      });
    },
    deleteTag: async (_: any, { id }: { id: string }) => {
      await prisma.tag.delete({
        where: { id: parseInt(id) },
      });
      return true;
    },
  },
}; 
