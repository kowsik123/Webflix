"use client";

import React, { PropsWithChildren } from 'react'
import MovieModal from './MovieModal';
import { CacheProvider } from '@/components';

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