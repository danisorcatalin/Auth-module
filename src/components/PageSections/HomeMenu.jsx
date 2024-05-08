'use client';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import SectionHeader from '../UI/SectionHeader';
import { MenuContext } from '@/context/AppContext';
import MenuCard from '@/components/cards/MenuCard';

export default function HomeMenu() {
    // const { menuData } = useContext(MenuContext);
    //
    // const [pizzas, setPizzas] = useState([]);
    //
    // useEffect(() => {
    //     setPizzas(
    //         menuData.menu
    //             ? menuData.menu
    //                   .filter((pizza) => pizza.category.name === 'Pizza')
    //                   .slice(-3)
    //             : []
    //     );
    // }, [menuData.menu]);

    return (
        <section className={'h-fit w-full'}>
            Hello Home Menu
        </section>
    );
}
