import React, { useCallback, useState } from 'react';
import { redirect } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authUpdateUser } from '@/services/authService';

const NewPass = () => {
	const [newPassword, setNewPassword] = useState<string>("");

	const handleNewPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setNewPassword(value);
	}, []);

	const authUpdateNewPasswordSubmit = useCallback(() => {
		authUpdateUser({ password: newPassword });
		setNewPassword("");
		redirect("/profile");
	}, [authUpdateUser, newPassword]);

	return (
		<div className="flex justify-center">
		<div className="w-96 flex flex-col gap-2">
			<p>新しいパスワード</p>
			<Input type='password' value={newPassword} onChange={handleNewPassword} placeholder='新しいパスワードを入力して下さい' />
			<Button type="button" onClick={authUpdateNewPasswordSubmit}>送信</Button>
		</div>
		</div>
	)
}
export default NewPass;