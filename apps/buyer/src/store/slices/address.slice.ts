// store/address.slice.ts (Tạo file mới này)
import { DEFAULT_ADDRESS } from "@/lib/constants";
import clientLocal from "@/lib/storage/local.client";
import { TAddress } from "@/types/address.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAddressState = {
  defaultAddress: TAddress | null;
}

const initialState: TAddressState = {
  defaultAddress: clientLocal.get(DEFAULT_ADDRESS) || null,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setDefaultAddress: (state, { payload: address }: PayloadAction<TAddress>) => {
      clientLocal.set(DEFAULT_ADDRESS, address);
      state.defaultAddress = address;
    },
    clean: () => {
      clientLocal.remove(DEFAULT_ADDRESS);
      return { defaultAddress: null };
    },
  },
});

export const addressReducer = addressSlice.reducer;
export const addressActions = addressSlice.actions;