// src/store/provider.tsx
"use client";

import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from ".";
import { PersistGate } from "redux-persist/integration/react";
import { TChildrenComponent } from "@/types/base.types";

// EXP: PersistGate:
// - Chặn render children cho đến khi persistor (localStorage) load xong.
// - Khi đang rehydrate, nếu bạn đặt loading={null}, nó không hiển thị gì cả (trống rỗng).

const StoreProvider = ({ children }: TChildrenComponent) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

// export default StoreProvider // Version of Persist Redux isn't used