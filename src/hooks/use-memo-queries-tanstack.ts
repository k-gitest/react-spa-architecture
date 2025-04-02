import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMemos, addMemo, showMemo, updateMemo, deleteMemo } from '@/services/memoService';
import { Memo, MemoFormData } from '@/types/memo-form-data';
import { toast } from './use-toast';
import { useApiQuery, useApiMutation } from './use-query-custum';

// メモ一覧取得用
export const useGetMemos = () => {
  return useQuery<Memo[]>({
    queryKey: ['memos'],
    queryFn: fetchMemos,
  });
};

export const useGetMemosApi = () => {
  return useApiQuery<Memo[], Error>(['memos'], fetchMemos);
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
    onError: (err) => toast({ title: err.message }),
  });
};

export const useAddMemoApi = () => {
  const queryClient = useQueryClient();

  return useApiMutation<void, Error, MemoFormData & { user_id: string }>((data) => addMemo(data), {
    onSuccess: () => {
      toast({ title: `メモを追加しました` });
      queryClient.invalidateQueries({ queryKey: ['memos'] });
    },
  });
};

// メモ更新用
export const useUpdateMemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: MemoFormData }) => updateMemo(id, updates),
    onSuccess: () => {
      toast({ title: `メモを更新しました` });
      queryClient.invalidateQueries({ queryKey: ['memos'] });
    },
    onError: (err) => toast({ title: err.message }),
  });
};

export const useUpdateMemoApi = () => {
  const queryClient = useQueryClient();

  return useApiMutation<void, Error, { id: string; updates: MemoFormData }>(
    ({ id, updates }) => updateMemo(id, updates),
    {
      onSuccess: () => {
        toast({ title: `メモを更新しました` });
        queryClient.invalidateQueries({ queryKey: ['memos'] });
      },
    },
  );
};

// メモ削除用
export const useDeleteMemo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMemo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['memos'] });
    },
    onError: (err) => toast({ title: err.message }),
  });
};

export const useDeleteMemoApi = () => {
  const queryClient = useQueryClient();

  return useApiMutation<void, Error, string>((id) => deleteMemo(id), {
    onSuccess: () => {
      toast({ title: `メモを削除しました` });
      queryClient.invalidateQueries({ queryKey: ['memos'] });
    },
  });
};
