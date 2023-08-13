"use client";
    
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { SkeletonTheme } from 'react-loading-skeleton';


export function Providers({ children }:{children: React.ReactNode}) {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <Provider store={store}>
        {children}
      </Provider>
    </SkeletonTheme>
  );
}