'use client';

import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { CldImage } from 'next-cloudinary';
import { renewItem, giveAwayItem, deleteItem } from '@/services/itemService';
import { useRouter } from 'next/navigation';

const ItemListTable = ({ items }) => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [loadingId, setLoadingId] = React.useState(null);
  const router = useRouter();

  const imageTemplate = (rowData) => {
    const publicId = rowData.featured_image_public_id || 'swopvend_placeholder_avatar';
    return (
      <CldImage
        src={publicId}
        alt={rowData.title}
        width={64}
        height={48}
        crop="fill"
        className="h-2rem object-cover border-round"
        style={{ borderRadius: '0.5rem', objectFit: 'cover' }}
      />
    );
  };

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

  const handleRenew = async (item) => {
    setLoadingId(item.id);
    try {
      await renewItem(item.id);
      window.location.reload(); // Or trigger a parent refresh if you want a better UX
    } catch (error) {
      alert('Failed to renew item.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleGiveAway = async (item) => {
    setLoadingId(item.id);
    try {
      await giveAwayItem(item.id);
      window.location.reload(); // Or trigger a parent refresh if you want a better UX
    } catch (error) {
      alert('Failed to mark item as given away.');
    } finally {
      setLoadingId(null);
    }
  };

  const handleEdit = (item) => {
    router.push(`/account/items/edit/${item.id}`);
  };

  const handleDelete = async (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
      setLoadingId(item.id);
      try {
        // You should have a deleteItem service
        await deleteItem(item.id);
        window.location.reload(); // Or trigger a parent refresh for better UX
      } catch (error) {
        alert('Failed to delete item.');
      } finally {
        setLoadingId(null);
      }
    }
  };

  const handleView = (item) => {
    router.push(`/items/${item.id}`);
  };

  const actionTemplate = (rowData) => {
    if (rowData.is_archived) {
      return (
        <div className="flex gap-2">
          <Button
            label="Renew"
            icon="pi pi-refresh"
            severity="success"
            size="small"
            aria-label="Renew"
            onClick={() => handleRenew(rowData)}
            loading={loadingId === rowData.id}
            rounded
          />
          <Button
            label="Give Away"
            icon="pi pi-gift"
            severity="info"
            size="small"
            aria-label="Give Away"
            onClick={() => handleGiveAway(rowData)}
            loading={loadingId === rowData.id}
            rounded
          />
        </div>
      );
    }
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          text
          severity="info"
          aria-label="View"
          rounded
          onClick={() => handleView(rowData)}
        />
        <Button
          icon="pi pi-pencil"
          text
          size="small"
          severity="warning"
          aria-label="Edit"
          rounded
          onClick={() => handleEdit(rowData)}
        />
        <Button
          icon="pi pi-trash"
          text
          size="small"
          severity="danger"
          aria-label="Delete"
          rounded
          loading={loadingId === rowData.id}
          onClick={() => handleDelete(rowData)}
        />
      </div>
    );
  };

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
        emptyMessage="No items found."
        responsiveLayout="scroll"
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
