'use client';
import React, { useState } from 'react';
import Button from '../../components/UI/Buttons/Button';
import Input from '../../components/UI/Inputs/Input';
import { customAxios } from '@/axios/customAxios';
import { useRouter } from 'next/navigation';

export default function LostPassPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        await customAxios('POST', 'lost-pass', setLoading, {
            data: { email},
            actionOnSuccess: () => {
                router.push('/lost-pass');
            },
            loadingString: 'Loading...',
            successString: 'Email with verification code was successfully sent!'
        });
    };

    return (
        <section className="mt-8">
            <h1 className="mb-8 text-center text-4xl text-primary">Recover password</h1>
            <form
                className="mx-auto flex max-w-xs flex-col gap-4"
                onSubmit={handleFormSubmit}
            >
                <Input
                    disabled={loading}
                    type="email"
                    placeholder="example@mail.com"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                    disabled={loading}
                    type="submit"
                    className="!w-full !rounded-lg"
                >
                    Recover password
                </Button>
            </form>
        </section>
    );
}
