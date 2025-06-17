'use client';
import { useEffect, useState } from 'react';
import { getUserItems } from '@/services/itemService';
import ItemListTable from '@/components/item/ItemListTable';

export default function MyItemsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await getUserItems();
      setItems(data);
    };
    fetch();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.length > 0 ? (
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
