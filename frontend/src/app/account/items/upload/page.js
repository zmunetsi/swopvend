"use client"

import ItemForm from "@/components/item/ItemForm";
import { useContext } from "react";
import { ServerAuthContext } from '@/context/ServerAuthContext';

export default function ItemUploadPage() {
  const user = useContext(ServerAuthContext);

  return (
    <div className="surface-section flex-auto flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="surface-card shadow-2 border-round-xl p-4 w-full" >
        <div className="mb-4">
          <div className="text-900 font-bold text-2xl mb-1">Upload Item</div>
          <div className="text-600 mb-3">Share your item with the SwopVend community. Fill in the details below to list your item for swapping or giving away.</div>
          <div className="surface-100" style={{ height: '2px', borderRadius: '2px' }}></div>
        </div>
        <ItemForm />
      </div>
    </div>
  );
}