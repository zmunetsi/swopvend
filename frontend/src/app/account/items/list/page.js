'use client';
import { useEffect, useState } from 'react';
import { getUserItems } from '@/services/itemService';
import ItemListTable from '@/components/item/ItemListTable';
import Link from 'next/link';

export default function MyItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getUserItems();
        setItems(data);
      } catch (err) {
        setError('Failed to load items.');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <div className="p-4 relative">
      <h2 className="text-xl font-semibold mb-4">My Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="col-span-full text-center text-red-500">{error}</div>
        ) : items.length > 0 ? (
          <ItemListTable items={items} />
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No items found. Start adding some!
          </div>
        )}
      </div>
      <Link
        href="/account/items/add"
        aria-label="Add Item"
        className="fixed bottom-8 right-8 z-50 bg-primary hover:bg-orange-500 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center text-3xl transition-colors"
        title="Add Item"
      >
        +
      </Link>
    </div>
  );
}
