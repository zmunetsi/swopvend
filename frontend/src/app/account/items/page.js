'use client';
import { useEffect, useState } from 'react';
import { getUserItems } from '@/services/itemService';
import ItemListTable from '@/components/item/ItemListTable';
import { Button } from 'primereact/button';
import { useRouter } from 'next/navigation';

export default function MyItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getUserItems();
        setItems(data);
      } catch (err) {
        setError('Failed to load items. Please try again.');
      }
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-content-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Items</h2>
        <Button label="Add Item" icon="pi pi-plus" onClick={() => router.push('/account/items/upload')} />
      </div>
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
    </div>
  );
}
