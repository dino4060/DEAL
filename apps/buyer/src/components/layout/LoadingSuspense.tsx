'use client';
import { Suspense } from "react";

type LoadingSuspenseProps = {
  children: React.ReactNode;
}

const LoadingSuspense = ({ children }: LoadingSuspenseProps) => {
  return (
    <Suspense fallback={<div className="text-center my-8">Đang tải...</div>}>
      {children}
    </Suspense>
  );
}

export default LoadingSuspense;
