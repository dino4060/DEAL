// src/store/slices/cart.slice.ts
import { CART_GROUPS, CART_TOTAL } from "@/lib/constants";
import clientLocal from "@/lib/storage/local.client";
import { TCart, TCartGroup } from "@/types/cart.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TCartState = {
  total: number | null;
  groups: TCartGroup[] | null;
};

const initialState: TCartState = {
  total: clientLocal.get(CART_TOTAL) || null,
  groups: clientLocal.get(CART_GROUPS) || null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (_, { payload: cart }: PayloadAction<TCart>) => {
      const { total, cartGroups: groups } = cart;

      clientLocal.set(CART_TOTAL, total);
      clientLocal.set(CART_GROUPS, groups);

      return { total, groups };
    },
    plusTotal: (state, { payload: delta }: PayloadAction<number>) => {
      if (!state.total) return;

      const update = state.total + delta;
      state.total = Math.min(100, Math.max(0, update));
    },
    clean: () => {
      clientLocal.remove(CART_TOTAL);
      clientLocal.remove(CART_GROUPS);

      return { total: null, groups: null };
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;