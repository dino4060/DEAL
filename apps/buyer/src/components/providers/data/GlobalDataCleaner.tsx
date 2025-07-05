'use client';

import { actions } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { TChildrenComponent } from "@/types/base.types";
import { Fragment, useEffect } from "react";

export const GlobalDataCleaner = ({ children }: TChildrenComponent) => {
  console.log(">>> GlobalDataInitializer: don't init.");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.auth.clear());
    dispatch(actions.address.clear());
    dispatch(actions.cart.clear());
  });

  return <Fragment>{children}</Fragment>;
}