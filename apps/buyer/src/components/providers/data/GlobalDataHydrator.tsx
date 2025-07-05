// components/providers/data/GlobalDataHydrator.tsx
"use client";
import { actions } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { TAddress } from "@/types/address.types";
import { TUser } from "@/types/auth.types";
import { TCart } from "@/types/cart.types";
import { useEffect } from "react";

type TGlobalDataHydratorProps = {
  currentUser: TUser | null;
  defaultAddress: TAddress | null;
  cart: TCart | null;
}

export const GlobalDataHydrator = ({ currentUser, defaultAddress, cart }: TGlobalDataHydratorProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    currentUser && dispatch(actions.auth.setCurrentUser(currentUser));
    defaultAddress && dispatch(actions.address.setDefaultAddress(defaultAddress));
    cart && dispatch(actions.cart.setCart(cart));

    console.log(">>> GlobalDataHydrator: init successfully");
  }, [currentUser, defaultAddress, cart, dispatch]);

  return null;
};