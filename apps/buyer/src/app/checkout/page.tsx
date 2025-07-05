// src/app/checkout/page.tsx
import { CheckoutHeader } from '@/components/checkout/CheckoutHeader';
import { CheckoutHydrator } from '@/components/checkout/CheckoutHydrator';
import { getIsAuthenticated } from '@/functions/getIsAuthenticated';
import { redirect } from 'next/navigation';

// Đây là Server Component
export default async function CheckoutPage() {
  const isAuthenticated = await getIsAuthenticated();

  if (!isAuthenticated) {
    redirect('/');
  }

  let selectedCartItemIds: number[] = [];

  return (
    <div className="container mx-auto px-20 py-6">
      <CheckoutHeader />
      <CheckoutHydrator />
    </div>
  );
}