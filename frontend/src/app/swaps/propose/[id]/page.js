'use client';

import { useEffect, useState } from 'react';
import LayoutWithNav from '@/components/layoutWithNav';
import { useParams } from 'next/navigation';
import { getUserItems } from '@/services/itemService';
import { fetchItemById } from '@/services/itemService';
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
          fetchItemById(id),
          getUserItems(),
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
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!targetItem) return <p>Item not found</p>;

  return (
    <LayoutWithNav>
       <section id="home-recent-listings" className="px-4 py-4 md:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-2">Propose a Swap</h1>
        <p className="mb-6">Exchange items you no longer need for something new.</p>
        <SwapForm targetItem={targetItem} userItems={userItems} />
      </section>
    </LayoutWithNav>
  );
}