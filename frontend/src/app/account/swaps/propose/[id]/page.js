'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchUserItems, fetchItemDetail } from '@/services/itemService';
import SwapForm from '@/components/swap/SwapForm';

export default function ProposeSwapPage() {
  const { itemId } = useParams();
  const [targetItem, setTargetItem] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemRes, userItemsRes] = await Promise.all([
          fetchItemDetail(itemId),
          fetchUserItems(),
        ]);
        setTargetItem(itemRes);
        setUserItems(userItemsRes);
      } catch (err) {
        console.error('Error fetching swap data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [itemId]);

  if (loading) return <p>Loading...</p>;
  if (!targetItem) return <p>Item not found</p>;

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Propose a Swap</h1>
      <p className="mb-2">You are proposing a swap for: <strong>{targetItem.title}</strong></p>
      <SwapForm targetItem={targetItem} userItems={userItems} />
    </div>
  );
}