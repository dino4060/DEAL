'use client';

import { actions } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { TChildrenComponent } from "@/types/base.types";
import { Fragment, useEffect } from "react";

export const DataCleaner = ({ children }: TChildrenComponent) => {
  console.log(">>> GlobalDataInitializer: don't init.");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.auth.clean());
    dispatch(actions.address.clean());
    dispatch(actions.cart.clean());
  });

  return <Fragment>{children}</Fragment>;
}