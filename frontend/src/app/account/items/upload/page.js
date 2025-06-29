"use client"

import ItemForm from "@/components/item/ItemForm";
import { useContext } from "react";
import { ServerAuthContext } from '@/context/ServerAuthContext';
import UserGreeting from "@/components/trader/UserGreeting";

export default function ItemUploadPage() {
  const user = useContext(ServerAuthContext);

  return (
    <div className="surface-section flex-auto">
      <div className="flex flex-column flex-auto">
        <div>
          <div className="text-900 font-medium text-xl mb-3">Upload Item</div>
          <UserGreeting user={user} />
          <ItemForm />
        </div>
      </div>
    </div>
  );
}