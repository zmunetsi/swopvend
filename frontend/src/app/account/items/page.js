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
    <div>
      <div className="flex justify-content-between items-center m-4">
        <h2 className="text-xl font-semibold">My Items</h2>
        <Button className="swop-button-primary" size="small" label="Add Item" icon="pi pi-plus" onClick={() => router.push('/account/items/upload')} />
      </div>
      <ItemListTable items={items} />
    </div>
  );
}
