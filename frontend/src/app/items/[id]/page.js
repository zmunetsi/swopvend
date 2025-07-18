"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import LayoutWithNav from "@/components/layoutWithNav";
import ItemDetail from "@/components/item/ItemDetail";
import { fetchItemById } from "@/services/itemService";

export default function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItem = async () => {
      try {
        const data = await fetchItemById(id);
        setItem(data);
      } catch (error) {
        console.error("Failed to load item:", error);
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  return (
    <LayoutWithNav>
      <section className="md:py-2 md:px-6 lg:px-8">
        {loading && <p>Loading item...</p>}
        {!loading && item && <ItemDetail item={item} />}
        {!loading && !item && <p>Item not found.</p>}
      </section>
    </LayoutWithNav>
  );
}
