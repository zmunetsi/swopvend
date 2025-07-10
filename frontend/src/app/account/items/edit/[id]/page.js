"use client"

import ItemForm from "@/components/item/ItemForm";
import { useContext } from "react";
import { ServerAuthContext } from '@/context/ServerAuthContext';
import UserGreeting from "@/components/trader/UserGreeting";
import { useParams } from 'next/navigation';

export default function ItemEditPage() {
  const user = useContext(ServerAuthContext);
  const { id } = useParams();

  return (
    <div className="surface-section flex-auto">
      <div className="flex flex-column flex-auto">
        <div>
          <div className="text-900 font-medium text-xl mb-3">Edit Item</div>
          <UserGreeting user={user} />
          <ItemForm itemId={id} />
        </div>
      </div>
    </div>
  );
}