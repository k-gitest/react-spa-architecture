import { useMutation } from '@tanstack/react-query';
import { authSignInWithPassword, authSignUp, authSignInWithOAuth, authSignOut, authUpdateUser, authResetPasswordForEmail, deleteUserAccount } from '@/services/authService';
import { Account } from '@/types/account-types';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

// サインアップ用
export const useSignUp = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: (data: Account) => authSignUp(data),
		onSuccess: () => navigate("/"),
		onError: (err) => toast({ title: err.message }),
	});
};

// サインイン用
export const useSignIn = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: (data: Account) => authSignInWithPassword(data),
		onSuccess: () => navigate("/"),
		onError: (err) => toast({ title: err.message }),
	});
};

// OAuth用
export const useSignInWithOAuth = () => {
	return useMutation({
		mutationFn: authSignInWithOAuth,
		onError: (err) => toast({ title: err.message }),
	});
};

// サインアウト用
export const useSignOut = () => {
	const navigate = useNavigate();
	return useMutation({
		mutationFn: authSignOut,
		onSuccess: () => navigate("/auth/login"),
		onError: (err) => toast({ title: err.message }),
	});
};

// ユーザー情報アップデート用
export const useUpdateUser = () => {
	return useMutation({
		mutationFn: authUpdateUser,
		onSuccess: () => toast({ title: "変更確認メールを送信しました" }),
		onError: (err) => toast({ title: err.message })
	});
};

// パスワードリセット用
export const useResetPasswordForEmail = () => {
	return useMutation({
		mutationFn: authResetPasswordForEmail,
		onSuccess: () => toast({ title: "パスワードリセットの確認メールを送信しました" }),
		onError: (err) => toast({ title: err.message })
	});
};

// アカウント削除用
export const useDeleteUserAccount = () => {
	return useMutation({
		mutationFn: deleteUserAccount,
		onSuccess: () => toast({ title: "アカウントを削除しました" }),
		onError: (err) => toast({ title: err.message })
	});
};