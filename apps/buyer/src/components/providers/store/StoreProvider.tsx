"use client";
import { store } from "@/store";
import { TChildrenComponent } from "@/types/base.types";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";

export const StoreProvider = ({ children }: TChildrenComponent) => {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  );
}