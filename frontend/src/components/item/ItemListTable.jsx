'use client';

import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Tag } from 'primereact/tag';
import { CldImage } from 'next-cloudinary';
import { renewItem, giveAwayItem, deleteItem, archiveItem } from '@/services/itemService';
import { useRouter } from 'next/navigation';

const ItemListTable = ({ items }) => {
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState(null);
  const [categoryFilter, setCategoryFilter] = React.useState(null);
  const [loadingId, setLoadingId] = React.useState(null);
  const router = useRouter();

  // Get unique categories for dropdown
  const categoryOptions = [
    ...new Set(items.map((item) => item.category).filter(Boolean)),
  ].map((cat) => ({
    label: cat,
    value: cat,
  }));

  // Get unique statuses for dropdown
  const statusOptions = [
    ...new Set(items.map((item) => item.status).filter(Boolean)),
  ].map((status) => ({
    label: status,
    value: status,
  }));

  // Filter items based on search and dropdowns
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      globalFilter === '' ||
      (item.title && item.title.toLowerCase().includes(globalFilter.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(globalFilter.toLowerCase()));

    const matchesStatus =
      !statusFilter || item.status === statusFilter;

    const matchesCategory =
      !categoryFilter || item.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

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
    let value = rowData.status;
    let severity = {
      available: 'success',
      swapped: 'warning',
      given: 'info',
      processing: 'info',
      archived: 'danger',
    }[value] || 'secondary';

    // If either is_archived is true or status is 'archived', show archived
    if (rowData.is_archived || rowData.status === 'archived') {
      value = 'archived';
      severity = 'danger';
    }

    return <Tag value={value} severity={severity} />;
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
    // Use the new upload page with ?edit=ITEM_ID for editing
    router.push(`/account/items/upload?edit=${item.id}`);
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

  const handleArchive = async (item) => {
    if (window.confirm(`Are you sure you want to archive "${item.title}"?`)) {
      setLoadingId(item.id);
      try {
        await archiveItem(item.id);
        window.location.reload(); // Or trigger a parent refresh for better UX
      } catch (error) {
        alert('Failed to archive item.');
      } finally {
        setLoadingId(null);
      }
    }
  };

  const handleView = (item) => {
    router.push(`/items/${item.slug || item.id}`);
  };

  const actionTemplate = (rowData) => {
    // If item is archived by status or flag, show only Renew and Permanently Delete
    if (rowData.is_archived || rowData.status === 'archived') {
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
            tooltip="Make this item available again"
          />
          <Button
            label="Delete"
            icon="pi pi-trash"
            severity="danger"
            size="small"
            aria-label="Delete"
            onClick={() => handleDelete(rowData)}
            loading={loadingId === rowData.id}
            rounded
            tooltip="Permanently delete this item"
          />
        </div>
      );
    }
    // Otherwise, show all actions
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-eye"
          text
          severity="info"
          aria-label="View"
          rounded
          onClick={() => handleView(rowData)}
          tooltip="View item details"
        />
        <Button
          icon="pi pi-pencil"
          text
          size="small"
          severity="warning"
          aria-label="Edit"
          rounded
          onClick={() => handleEdit(rowData)}
          tooltip="Edit this item"
        />
        <Button
          icon="pi pi-box"
          text
          size="small"
          severity="secondary"
          aria-label="Archive"
          rounded
          loading={loadingId === rowData.id}
          onClick={() => handleArchive(rowData)}
          tooltip="Archive (soft delete) this item"
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
          tooltip="Permanently delete this item"
        />
      </div>
    );
  };

  return (
    <div className="card max-w-screen">
      <div className="grid grid-nogutter align-items-center m-4">
        <div className="flex-auto lg:flex-1 mb-3 lg:mt-0 w-full mr-0 lg:mr-4 text-900">
          <span className="w-full">
            <InputText
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search items..."
              className="w-full"
              aria-label="Search items"
            />
          </span>
        </div>
        <div className="flex-auto lg:flex-1 mb-3 lg:mt-0 w-full mr-0 lg:mr-4 text-900">
          <Dropdown
            value={statusFilter}
            options={statusOptions}
            onChange={(e) => setStatusFilter(e.value)}
            placeholder="Filter by Status"
            className="w-full"
            showClear
            aria-label="Filter by Status"
          />
        </div>
        <div className="flex-auto lg:flex-1 mb-3 lg:mt-0 w-full mr-0 lg:mr-4 text-900">
          <Dropdown
            value={categoryFilter}
            options={categoryOptions}
            onChange={(e) => setCategoryFilter(e.value)}
            placeholder="Filter by Category"
            className="w-full"
            showClear
            aria-label="Filter by Category"
          />
        </div>
      </div>
      <DataTable
        value={filteredItems}
        paginator
        rows={5}
        stripedRows
        className="m-4"
        emptyMessage="No items found."
        scrollable
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
