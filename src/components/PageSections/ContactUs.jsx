import React from 'react';
import SectionHeader from '../UI/SectionHeader';

export default function ContactUs() {
    return (
        <section className="my-8 text-center">
            <SectionHeader
                subHeader={"Don't hesitate"}
                mainHeader={'Contact us'}
            />
            <div className="mt-8">
                <a
                    className="text-4xl text-gray-500 underline"
                    href="tel:+4407748364788"
                >
                    +44 07 748 364 788
                </a>
            </div>
        </section>
    );
}
