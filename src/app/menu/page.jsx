'use client';
import React, { useContext, useState } from 'react';
import { MenuContext } from '@/context/AppContext';
import MenuCard from '@/components/cards/MenuCard';
import CategorySelector from '@/components/UI/Inputs/CategorySelector';

const Page = () => {
    const { menuData } = useContext(MenuContext);

    const [activeFilter, setActiveFilter] = useState('All');
    const customSort = (array) => {
        const sortedArray = array.slice();

        sortedArray.sort(function (a, b) {
            const order = {};

            const orderA = order[a.name] || 9999;
            const orderB = order[b.name] || 9999;

            // Сравниваем порядковые номера
            return orderA - orderB;
        });

        if (activeFilter === 'All') {
            return sortedArray;
        } else {
            return sortedArray.filter((item) => item.name === activeFilter);
        }
    };

    return (
        <section className={'my-8 flex flex-col gap-8'}>
            <CategorySelector
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            {customSort(menuData.categories).map((category) => (
                <div key={category.id} className={'flex flex-col gap-4'}>
                    {activeFilter === 'All' && (
                        <h1 className={'text-center text-4xl text-primary'}>
                            {category.name}
                        </h1>
                    )}

                    {menuData?.menu?.length !== 0 ? (
                        <div
                            className={
                                'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'
                            }
                        >
                            {menuData.menu
                                .filter(
                                    (menuItem) =>
                                        menuItem.category.name === category.name
                                )
                                .map((item) => (
                                    <MenuCard key={item.id} menuItem={item} />
                                ))}
                        </div>
                    ) : (
                        <h1
                            className={
                                'my-4 text-center text-2xl font-bold text-zinc-300'
                            }
                        >
                            Nothing found!
                        </h1>
                    )}
                </div>
            ))}
        </section>
    );
};

export default Page;
