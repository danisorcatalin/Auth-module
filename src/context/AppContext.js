'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import { Toaster } from 'react-hot-toast';
import { useMenu } from '@/hooks/useMenu';
import { useProfile } from '@/hooks/useProfile';

export const UserDataContext = React.createContext(null);
export const MenuContext = React.createContext(null);
export const ModalContext = React.createContext(null);

export function AppProvider({ children }) {
    return (
        <SessionProvider>
            <DBDataProvider>
                <ModalProvider>
                        <Toaster />
                        {children}
                </ModalProvider>
            </DBDataProvider>
        </SessionProvider>
    );
}

function DBDataProvider({ children }) {
    const session = useSession();

    const {
        menuData,
        menuActions,
        categoriesActions,
        fetching,
        loadingModal,
        setLoadingModal
    } = useMenu();
    const {
        userData,
        fetchingUser,
        fetchingUpdate,
        setFetchingUpdate,
        handleProfileUpdate
    } = useProfile(session);

    return (
        <MenuContext.Provider
            value={{
                menuData,
                menuActions,
                categoriesActions,
                fetching,
                loadingModal,
                setLoadingModal
            }}
        >
            <UserDataContext.Provider
                value={{
                    session,
                    userData,
                    fetchingUser,
                    fetchingUpdate,
                    setFetchingUpdate,
                    handleProfileUpdate
                }}
            >
                {(session.status === 'authenticated' && !userData) ||
                session.status === 'loading' ||
                fetching ||
                fetchingUser ? (
                    <div
                        className={
                            'bg-reed-500 absolute left-0 top-0 flex h-screen w-full items-center justify-center'
                        }
                    >
                        <InfinitySpin color={'var(--main)'} />
                    </div>
                ) : (
                    children
                )}
            </UserDataContext.Provider>
        </MenuContext.Provider>
    );
}

function ModalProvider({ children }) {
    const [menuItemModal, setMenuItemModal] = useState(false);
    const openMenuItemModal = (menuItem) => {
        setMenuItemModal(menuItem);
    };
    const closeMenuItemModal = () => {
        setMenuItemModal(false);
    };


    return (
        <ModalContext.Provider
            value={{
                openMenuItemModal,
                closeMenuItemModal,
                menuItemModal,
            }}
        >
            {children}
        </ModalContext.Provider>
    );
}
