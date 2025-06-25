'use client';

import { actions } from "@/store";
import { useAppDispatch } from "@/store/hooks";
import { TChildrenComponent } from "@/types/base.types";
import { Fragment, useEffect } from "react";

export const TokenCleaner = ({ children }: TChildrenComponent) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(actions.auth.clear());
  });

  return <Fragment>{children}</Fragment>;
}