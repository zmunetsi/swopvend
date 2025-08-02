'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchUserItems, fetchItemDetail } from '@/services/itemService';
import SwapForm from '@/components/swap/SwapForm';

export default function ProposeSwapPage() {
  const { id } = useParams();
  const [targetItem, setTargetItem] = useState(null);
  const [userItems, setUserItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemRes, userItemsRes] = await Promise.all([
          fetchItemDetail(id),
          fetchUserItems(),
        ]);
        // Only show items with status 'available'
        const availableItems = userItemsRes.filter(item => item.status === 'available');
        setTargetItem(itemRes);
        setUserItems(availableItems);
      } catch (err) {
        console.error('Error fetching swap data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!targetItem) return <p>Item hj not found</p>;

  return (
    <div className="container m-4">
      <h1 className="text-2xl font-bold mb-4">Propose a Swap</h1>
      <p className="mb-4">You are proposing a swap for: <strong>{targetItem.title}</strong></p>
      <SwapForm targetItem={targetItem} userItems={userItems} />
    </div>
  );
}