'use client';

import React from 'react';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import ReduxProvider from '@/redux/redux-provider';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';
import LoadingPage from './loading';

interface Props {
    token: RequestCookie | undefined;
    children: React.ReactNode;
}

export default function LayoutWrapper(props: Props) {
    const { token, children } = props;

    return (
        <>
            <QueryClientProvider client={new QueryClient()}>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
            </QueryClientProvider>
        </>

    );
}