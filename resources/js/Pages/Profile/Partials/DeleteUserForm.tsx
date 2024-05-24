import { useRef, useState, FormEventHandler } from 'react';
import DangerButton from '@/Components/other/DangerButton';
import InputError from '@/Components/other/InputError';
import InputLabel from '@/Components/other/InputLabel';
import Modal from '@/Components/other/Modal';
import SecondaryButton from '@/Components/other/SecondaryButton';
import TextInput from '@/Components/other/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }: { className?: string }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">アカウントの削除</h2>

                <p className="mt-1 text-sm text-gray-600">
                    アカウントを削除すると全ての情報が削除されます。
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>削除する</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        本当に削除しますか？
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        アカウントを削除すると全ての情報が削除されます。よろしければパスワードを入力してください。
                    </p>
                    <p className="mt-1 text-sm text-gray-600">
                        よろしければパスワードを入力してください。
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Password" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Password"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>戻る</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            アカウント削除
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
