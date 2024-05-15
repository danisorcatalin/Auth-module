'use client';
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@/components/UI/Inputs/Input';
import Button from '../../components/UI/Buttons/Button';
import {customAxios} from "@/axios/customAxios";

export default function ValidatePage() {

    const [email, setEmail] = useState("");
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        await customAxios('POST', 'validate', setLoading, {
            data: {email, code},
            actionOnSuccess: () => {
                let router = useRouter();
                router.push('/login');
            },
            loadingString: 'Loading...',
            successString: 'Validation Success!'
        });
    };

    return (
        <section className="mt-8">
            <h1 className="mb-8 text-center text-4xl text-primary">Validate code</h1>
            <form
                className="mx-auto flex max-w-xs flex-col gap-4"
                onSubmit={handleFormSubmit}
            >
                <Input
                    type="email"
                    name="email"
                    autoComplete="off"
                    placeholder="example@mail.com"
                    value={email}
                    required={true}
                    disabled={loading}
                    onChange={(ev) => setEmail(ev.target.value)}
                />
                <Input
                    type="text"
                    name="code"
                    placeholder="Validation code"
                    value={code}
                    required={true}
                    disabled={loading}
                    onChange={(ev) => setCode(ev.target.value)}
                />
                <Button
                    disabled={loading}
                    type="submit"
                    className={'!w-full !rounded-lg'}
                >
                    Validate
                </Button>
            </form>
        </section>
    );
}
