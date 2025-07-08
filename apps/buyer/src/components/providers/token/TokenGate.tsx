// app/auth/TokenRefresher.tsx
import { getIsAuthenticated } from "@/functions/getIsAuthenticated";
import { api } from "@/lib/api";
import { serverFetch } from "@/lib/fetch/fetch.server";
import { TChildrenComponent } from "@/types/base.types";
import { Fragment } from "react";
import { TokenCleaner } from "./TokenCleaner";
import { TokenRestorer } from "./TokenRestorer";

export const TokenGate = async ({ children }: TChildrenComponent) => {
  // If don't exist accessToken → clean → render children
  const isAuthenticated = await getIsAuthenticated();
  if (!isAuthenticated) {
    console.log(">>> TokenGate: isAuthenticated F: clean & render children");
    return <TokenCleaner>{children}</TokenCleaner>;
  }

  // Check token using fetch current user
  const { success, code } = await serverFetch(api.auth.getCurrentUser());

  // If token expired → render TokenRestorer
  if (!success && code === 1010) {
    console.log(">>> TokenGate: Access token expired: render TokenRestorer");
    return (<TokenRestorer />);
  }

  // If token is valid → render children
  if (success) {
    console.log(">>> TokenGate: Access token is valid: render children");
    return <Fragment>{children}</Fragment>;
  }

  // If occur unhandled exception → clean → render children
  console.error(">>> TokenGate: Unhandled error: clean & render children");
  return <TokenCleaner>{children}</TokenCleaner>;
}