"use clinet";

import { CacheProvider } from '@/components';
import React, { PropsWithChildren } from 'react'
import MovieModal from './MovieModal';

const Main = ({children}: PropsWithChildren) => {
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