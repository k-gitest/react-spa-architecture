import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchMemos,
  addMemo,
  showMemo,
  updateMemo,
  deleteMemo,
} from '@/services/memoService';
import { Memo, MemoFormData } from '@/types/memo-form-data';

// メモ一覧取得用
export const useGetMemos = () => {
  return useQuery<Memo[]>({
    queryKey: ['memos'],
    queryFn: fetchMemos,
  });
};

// 個別メモ取得用
export const useGetMemo = (id: string | null) => {
  return useQuery<Memo | undefined>({
    queryKey: ['memo', id],
    queryFn: () => (id ? showMemo(id) : undefined),
    enabled: !!id,
  });
};

// メモ追加用
export const useAddMemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: MemoFormData & { user_id: string }) => addMemo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos'] });
    },
  });
};

// メモ更新用
export const useUpdateMemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: MemoFormData }) =>
      updateMemo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos'] });
    },
  });
};

// メモ削除用
export const useDeleteMemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMemo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos'] });
    },
  });
};