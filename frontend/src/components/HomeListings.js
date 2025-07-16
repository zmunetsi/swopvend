'use client';
import { useEffect, useState } from 'react';
import { DataView } from 'primereact/dataview';
import ItemCard from '@/components/item/ItemCard';
import { fetchAllItems } from '@/services/itemService';

export default function HomeListings() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchAllItems()
      .then((data) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const itemTemplate = (item) => (
    <ItemCard item={ item }
    />
  );

  return (
    <div>
      <DataView
        value={items}
        layout="grid"
        itemTemplate={itemTemplate}
        rows={5}
        loading={loading}
      />
    </div>
  );
}