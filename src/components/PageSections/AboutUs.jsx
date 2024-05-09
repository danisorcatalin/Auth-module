import React from 'react';
import SectionHeader from '../UI/SectionHeader';

export default function AboutUs() {
    return (
        <section className="my-16 text-center">
            <SectionHeader subHeader={'Our story'} mainHeader={'About us'} />
            <div className="mx-auto mt-4 flex max-w-2xl flex-col gap-4 text-gray-500">
                <p>
                   Started as a Authorization module that I want to reuse when a new project starts.
                </p>
            </div>
        </section>
    );
}
