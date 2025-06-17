'use client';

import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { getUserItems } from '@/services/itemService';

const ItemListTable = () => {
  const [items, setItems] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      const data = await getUserItems();
      if (!data || data.length === 0) {
        console.error('No items found or error fetching items');
        return;
      }
      setItems(data);
    };
    fetchItems();
  }, []);

  const imageTemplate = (rowData) => (
    <img
      src={rowData.featured_image}
      alt={rowData.title}
      className="h-2rem object-cover border-round"
    />
  );

  const statusTemplate = (rowData) => {
    const severity = {
      available: 'success',
      swapped: 'warning',
      given: 'info',
    }[rowData.status] || 'secondary';

    return <Tag value={rowData.status} severity={severity} />;
  };

  const conditionTemplate = (rowData) => (
    <Tag value={rowData.condition} severity="secondary" />
  );

  const actionTemplate = (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-eye" text  severity="info" aria-label="View" rounded />
      <Button icon="pi pi-pencil" text size="small" severity="warning" aria-label="Edit" rounded/>
      <Button icon="pi pi-trash" text size="small" severity="danger" aria-label="Delete" rounded/>
    </div>
  );

  return (
    <div className="w-full">
      <div className="flex justify-end mb-3">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </span>
      </div>

      <DataTable
        value={items}
        paginator
        rows={5}
        stripedRows
        globalFilter={globalFilter}
        className="w-full"
      >
        <Column body={imageTemplate} header="Image" style={{ width: '100px' }} />
        <Column field="title" header="Title" sortable />
        <Column field="category" header="Category" />
        <Column body={conditionTemplate} header="Condition" />
        <Column body={statusTemplate} header="Status" />
        <Column body={actionTemplate} header="Actions" />
      </DataTable>
    </div>
  );
};

export default ItemListTable;
