// app/components/auth/TokenRestorer.tsx
'use client';
import { api } from '@/lib/api';
import { clientFetch } from '@/lib/fetch/fetch.client';
import { actions } from '@/store';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// TokenGate isAuth T, apiCurrentUser F => don't render children, render TokenRestorer
export function TokenRestorer() {
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // NOTE: useEffect
  // Giả sử component có usePathname, isHome, useEffect, if()
  // Component body được thực thi trước, gồm usePathname, isHome và if()
  // if() return null, ko amount component
  // if() ko return, useEffect sẽ chạy sau khi render xong (tương đương componentDidMount)
  useEffect(() => {
    const tryRefreshToken = async () => {
      console.log(">>> TokenRestorer: tryRefreshToken");
      const apiRes = await clientFetch(api.auth.refresh());

      if (apiRes.success) {
        console.log(">>> TokenRestorer: Refresh success");
        dispatch(actions.auth.setCredentials(apiRes.data));
        setSuccess(true);
        router.refresh();
        // request to refresh
        // => middleware isAuth T, go through isPublic F
        // => TokenGate isAuth T, apiCurrentUser T, render children withAuth
      } else {
        console.warn(">>> TokenRestorer: Refresh failed, clearing auth");
        dispatch(actions.auth.clean());
        setSuccess(false);
        router.refresh();
        // request to refresh
        // => middleware isAuth F, decide to redirect from isPublic F
        // => TokenGate isAuth F, render children noAuth
      }
    };
    tryRefreshToken();
  }, [router, dispatch]);

  return (
    <>
      {success
        ? (
          <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-150px)]">
            <div className="text-center text-lg text-gray-600">"Đã khôi phục trạng thái xác thực thành công."</div>
          </div>
        )
        : (
          <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-150px)]">
            <div className="text-center text-lg text-red-600">
              "Thất bại khôi phục trạng thái xác thực."
            </div>
          </div>
        )
      }
    </>

  );
}
