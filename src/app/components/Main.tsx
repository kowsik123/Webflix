"use client";

import React, { PropsWithChildren } from 'react'
import { CacheProvider } from '@/components';
import dynamic from 'next/dynamic';
const MovieModal = dynamic(() => import("./MovieModal"), {ssr: false});

const Main = ({ children }: PropsWithChildren) => {
  return (
    <main className="page-main">
      <CacheProvider>
        {children}
        <MovieModal />
      </CacheProvider>
    </main>
  )
}

export default Main