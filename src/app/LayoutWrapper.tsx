'use client';

import React from 'react';

import { AppProvider } from '@/contexts/AppContext';

import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import ReduxProvider from '@/redux/redux-provider';
import { useSearchParams } from 'next/navigation';
import ChatContainer from '@/templates/chat/ChatContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
    token: RequestCookie | undefined;
    children: React.ReactNode;
}

export default function LayoutWrapper(props: Props) {
    const { token, children } = props;

    return (
        <>
            <QueryClientProvider client={new QueryClient()}>
                <AppProvider>
                    {children}
                </AppProvider>
            </QueryClientProvider>
            {/* <ReduxProvider>
                
            </ReduxProvider> */}
        </>

    );
}