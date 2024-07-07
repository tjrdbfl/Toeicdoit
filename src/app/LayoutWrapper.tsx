'use client';

import React from 'react';

import { AppProvider } from '@/contexts/AppContext';

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import ReduxProvider from '@/redux/redux-provider';
import { useSearchParams } from 'next/navigation';
import ChatContainer from '@/templates/chat/ChatContainer';

interface Props {
    token: RequestCookie | undefined;
    children: React.ReactNode;
}

export default function LayoutWrapper(props: Props) {
    const { token, children } = props;
   
    return (
        <>
        <AppProvider>
                    {children}
                </AppProvider>
            {/* <ReduxProvider>
                
            </ReduxProvider> */}
        </>

    );
}