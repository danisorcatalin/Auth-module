import React from 'react';
import Button from '@/components/UI/Buttons/Button';
import Link from 'next/link';

export default function Hero() {
    return (
        <section className="hero flex justify-between">
            <div className="py-4 transition-all md:py-12 md:pl-16 xl:pl-0">
                <h1 className="mx-auto max-w-md text-center text-5xl font-bold md:text-start">
                    Everything <br /> is better <br /> with a&nbsp;
                    <span className="text-primary">Auction</span>
                </h1>

                <div className="flex w-full items-center justify-center gap-4">
                    <Link href={'/menu'}>
                        <Button type={'button'} variant={'submit'} className={'!w-fit !px-8'}>
                            Order now
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
