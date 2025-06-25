// app/auth/TokenRefresher.tsx
import { api } from "@/lib/api";
import { serverFetch } from "@/lib/fetch/fetch.server";
import { Fragment, Suspense } from "react";
import { TokenRestorer } from "./TokenRestorer";
import { getIsAuthenticated } from "@/functions/getIsAuthenticated";
import { TokenCleaner } from "./TokenCleaner";

export const TokenGate = async ({ children }: { children: React.ReactNode }) => {
  // If don't exist accessToken → clean → render children
  const isAuthenticated = await getIsAuthenticated();
  if (!isAuthenticated) {
    console.log(">>> TokenGate: isAuthenticated F: render children with no auth");
    return <TokenCleaner>{children}</TokenCleaner>;
  }

  // Check token is valid that using fetch current user
  const apiRes = await serverFetch(api.auth.getCurrentUser());
  console.log(">>> TokenGate: apiRes: ", apiRes);

  // If token expired → render TokenRestorer
  if (!apiRes.success && apiRes.code === 1010) {
    console.log(">>> TokenGate: Access token expired, render TokenRestorer");
    return (
      <Suspense fallback={
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-150px)]">
          <div className="text-center text-lg text-gray-600">Đang khôi phục trạng thái đã xác thực...</div>
        </div>
      }>
        <TokenRestorer />
      </Suspense>
    );
  }

  // If token is valid → render children
  if (apiRes.success) return <Fragment>{children}</Fragment>;


  // If occur unhandled exception → clean → render children
  console.error(">>> TokenGate: Unhandled error: render children with no auth");
  return <TokenCleaner>{children}</TokenCleaner>;
}