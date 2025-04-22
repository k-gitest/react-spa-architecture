import { prisma } from '@/lib/prisma';
import { MemoFormData } from '@/features/memo/types/memo-form-data';

export const fetchmemos = async () => {
  try {
    const memos = await prisma.memo.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });
    return memos;
  } catch (error) {
    console.error('Error fetching memos:', error);
    throw error;
  }
};

export const addTodo = async (data: MemoFormData & { user_id: string }) => {
  try {
    const memo = await prisma.memo.create({
      data: data,
    });
    return memo;
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
};

export const updateTodo = async (id: string, updates: MemoFormData) => {
  try {
    await prisma.memo.update({
      where: { id: id },
      data: updates,
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await prisma.memo.delete({
      where: { id: id },
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};
