'use client'

import { AppStore, makeStore } from '@/lib/store/store';
import React, { ReactNode, useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { setupListeners } from "@reduxjs/toolkit/query";

type StoreProviderPorps = {
} & React.PropsWithChildren

export default function StoreProvider({ children }: StoreProviderPorps) {
	const storeRef = useRef<AppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = makeStore();
	}
	useEffect(() => {
		if (storeRef.current != null) {
			const unsubscribe = setupListeners(storeRef.current.dispatch);
			return unsubscribe;
		}
	}, []);

	return <Provider store={storeRef.current}>
		{children}
		</Provider>
}
