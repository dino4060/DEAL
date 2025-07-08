// src/store/slices/cart.slice.ts
import { CART_GROUPS, CART_TOTAL, CART_VERSION } from "@/lib/constants";
import clientLocal from "@/lib/storage/local.client";
import { TCart, TCartGroup } from "@/types/cart.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TCartState = {
  total: number | null;
  groups: TCartGroup[] | null;
  version: number | null;
};

const initialState: TCartState = {
  total: clientLocal.get(CART_TOTAL) || null,
  groups: clientLocal.get(CART_GROUPS) || null,
  version: clientLocal.get(CART_VERSION) || null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (_, { payload: cart }: PayloadAction<TCart>) => {
      const { total, cartGroups: groups } = cart;
      const version = 1;

      clientLocal.set(CART_TOTAL, total);
      clientLocal.set(CART_GROUPS, groups);
      clientLocal.set(CART_VERSION, version);

      return { total, groups, version };
    },
    plusTotal: (state, { payload: delta }: PayloadAction<number>) => {
      console.log("plusTotal");

      const update = (state.total || 0) + delta

      clientLocal.set(CART_TOTAL, update);

      state.total = Math.min(100, Math.max(0, update));
    },
    updateVersion: (state) => {
      const update = (state.version || 0) + 1;

      clientLocal.set(CART_VERSION, update);

      state.version = update;
    },
    clean: () => {
      clientLocal.remove(CART_TOTAL);
      clientLocal.remove(CART_GROUPS);
      clientLocal.remove(CART_VERSION);

      return { total: null, groups: null, version: null };
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;