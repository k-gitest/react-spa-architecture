import { useState, useCallback, useEffect } from 'react';
import { MemoFormData } from '@/types/memo-form-data';
import MemoForm from '@/components/memo-form';
import MemoList from '@/components/memo-list';
import ResponsiveDialog from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useMemos } from '@/hooks/use-memos';
import { deleteMemo, updateMemo } from '@/services/memoService';
import { queryClient } from '@/lib/queryClient';

const MemoManagerTrpc = () => {
	const session = useAuthStore((state) => state.session);
	const [editIndex, setEditIndex] = useState<string | null>(null);
	const [open, setOpen] = useState<boolean>(false);
	const isDesktop = useMediaQuery('(min-width: 768px)');

	const { memos, isMemosLoading, memosError, getMemo, addMemo, updateMemo, deleteMemo } = useMemos();

	const { data: editMemoData } = getMemo(editIndex);

	const handleAddSubmit = useCallback(
		async (data: MemoFormData) => {
			if (session?.user.id) {
				addMemo(data, session.user.id);
			}
		},
		[session?.user.id, addMemo],
	);

	const handleUpdateSubmit = useCallback(
		async (data: MemoFormData, editIndex: string) => {
			updateMemo(editIndex, data);
		},
		[editIndex, updateMemo],
	);


	const handleFormSubmit = useCallback(
		async (data: MemoFormData) => {
			if (!editIndex && session?.user.id) {
				handleAddSubmit(data);
			}
			if (editIndex) {
				handleUpdateSubmit(data, editIndex);
			}
			setOpen(false);
			setEditIndex(null);
		},
		[editIndex, session?.user.id, handleAddSubmit, handleUpdateSubmit],
	);

	const handleEditClick = useCallback(
		(index: string) => {
			setEditIndex(index);
			setOpen(true);
		},
		[setEditIndex],
	);

	const handleDeleteClick = useCallback(
		async (index: string) => {
			deleteMemo(index)
		},
		[deleteMemo],
	);

	useEffect(() => {
		if (!open) setEditIndex(null)
	}, [open])

	if (!session) return <p className='text-center'>メモ機能は会員限定です</p>;

	if (isMemosLoading) return <p className='text-center'>Loading memos...</p>;
	if (memosError) return <p className='text-center'>Error loading memos: {memosError?.message}</p>;

	return (
		<div>
			<ResponsiveDialog
				open={open}
				onOpenChange={setOpen}
				isDesktop={isDesktop}
				buttonTitle="メモ追加"
				dialogTitle="Memo"
				dialogDescription="メモを残そう"
				className="flex justify-center"
				hasOverflow={true}
			>
				<MemoForm onSubmit={handleFormSubmit} initialValues={editMemoData} />
			</ResponsiveDialog>
			{memos && (
				<MemoList memoData={memos} onEdit={handleEditClick} onDelete={handleDeleteClick} />
			)}
		</div>
	);
};

export default MemoManagerTrpc;