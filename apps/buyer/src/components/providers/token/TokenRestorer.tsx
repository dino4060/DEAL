// app/components/auth/TokenRestorer.tsx
'use client';
import { api } from '@/lib/api';
import { clientFetch } from '@/lib/fetch/fetch.client';
import { actions } from '@/store';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';

// NOTE: useEffect
// Giả sử component có usePathname, isHome, useEffect, if()
// Component body được thực thi trước, gồm usePathname, isHome và if()
// if() return null, ko amount component
// if() ko return, useEffect sẽ chạy sau khi render xong (tương đương componentDidMount)

// EXPLAIN: TokenRestorer
// tryRefreshToken S => update store => refresh app
// tryRefreshToken F => clean store => refresh app

export function TokenRestorer() {
  console.log(">>> TokenRestorer: render");

  const [success, setSuccess] = useState<boolean | undefined>(undefined);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const tryRefreshToken = async () => {
      const { success, data } = await clientFetch(api.auth.refresh());

      if (success && data.isAuthenticated) {
        console.log(">>> TokenRestorer: Refresh success");
        dispatch(actions.auth.setCredentials(data));
        setSuccess(true);
        router.refresh();

      } else {
        console.warn(">>> TokenRestorer: Refresh failed");
        dispatch(actions.auth.clean());
        setSuccess(false);
        router.refresh();
      }
    };

    tryRefreshToken();
  }, [router, dispatch]);

  return (
    <Fragment>
      {success === undefined ? (
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-150px)]">
          <div className="text-center text-lg text-gray-600">
            Đang khôi phục trạng thái xác thực...
          </div>
        </div>

      ) : success === true ? (
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-150px)]">
          <div className="text-center text-lg text-gray-600">
            Thành công khôi phục trạng thái xác thực.
          </div>
        </div>
      ) : (
        <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-150px)]">
          <div className="text-center text-lg text-red-600">
            Thất bại khôi phục trạng thái xác thực.
          </div>
        </div>
      )}
    </Fragment>
  );
}
