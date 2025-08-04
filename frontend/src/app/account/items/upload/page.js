"use client"

import ItemForm from "@/components/item/ItemForm";
import { useContext } from "react";
import { ServerAuthContext } from '@/context/ServerAuthContext';
import { useSearchParams } from "next/navigation";

export default function ItemUploadPage() {
  const user = useContext(ServerAuthContext);
  const searchParams = useSearchParams();
  const itemId = searchParams.get("edit"); // e.g. /account/items/upload?edit=123

  return (
    <div className="surface-section flex-auto flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="surface-card shadow-2 border-round-xl p-4 w-full" >
        <div className="mb-4">
          <div className="text-900 font-bold text-2xl mb-1">
            {itemId ? "Edit Item" : "Upload Item"}
          </div>
          <div className="text-600 mb-3">
            {itemId
              ? "Update your item details below to keep your listing fresh and accurate."
              : "Share your item with the SwopVend community. Fill in the details below to list your item for swapping or giving away."
            }
          </div>
          <div className="surface-100" style={{ height: '2px', borderRadius: '2px' }}></div>
        </div>
        <ItemForm itemId={itemId} isEdit={!!itemId} />
      </div>
    </div>
  );
}