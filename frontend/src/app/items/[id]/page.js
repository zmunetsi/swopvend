"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import LayoutWithNav from "@/components/layoutWithNav";
import { AuthContext } from '@/context/authContext';
import ItemDetail from "@/components/item/ItemDetail";
import { fetchItemById } from "@/services/itemService";

export default function ItemDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, loading: userLoading } = useContext(AuthContext);

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

  // Show loading until both item and user are loaded
  if (loading || userLoading) {
    return (
      <LayoutWithNav>
        <section className="md:py-2 md:px-6 lg:px-8">
          <p>Loading item...</p>
        </section>
      </LayoutWithNav>
    );
  }
console.log( "user", user)
  return (
    <LayoutWithNav>
      <section className="md:py-2 md:px-6 lg:px-8">
        {item && <ItemDetail item={item} currentUserId={user?.id} />}
        {!item && <p>Item not found.</p>}
      </section>
    </LayoutWithNav>
  );
}
