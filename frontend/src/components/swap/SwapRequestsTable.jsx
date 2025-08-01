import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Tag } from 'primereact/tag';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { CldImage } from 'next-cloudinary';

const SwapActions = ({ swap, currentUser, onView, onApprove, onDecline }) => {
  const isReceivingUser = swap.to_trader?.id === currentUser?.id;
  const isPending = swap.status === 'pending';

  return (
    <div className="flex gap-2">
      <Button label="View" icon="pi pi-eye" className="p-button-text p-button-sm" onClick={() => onView(swap)} aria-label="View Swap" />
      {isReceivingUser && isPending && (
        <>
          <Button label="Approve" icon="pi pi-check" className="p-button-success p-button-sm" onClick={() => onApprove(swap.id)} aria-label="Approve Swap" />
          <Button label="Decline" icon="pi pi-times" className="p-button-danger p-button-sm" onClick={() => onDecline(swap.id)} aria-label="Decline Swap" />
        </>
      )}
    </div>
  );
};

const ItemImageTemplate = (item) => {
  return item?.featured_image_public_id ? (
    <CldImage
      width={60}
      height={40}
      crop="fit"
      className="object-cover"
      src={item.featured_image_public_id}
      alt={item.title} />
  ) : (
    <span>No Image</span>
  );
};

const StatusTemplate = (rowData) => {
  const status = rowData.status || 'pending';
  const severity = {
    accepted: 'success',
    declined: 'danger',
    pending: 'info',
  }[status];

  return <Tag value={status} severity={severity} />;
};

const SwapRequestsTable = ({ swaps, currentUser, onView, onApprove, onDecline }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState(null);
  const [filteredSwaps, setFilteredSwaps] = useState(swaps || []);

  const statusOptions = [
    { label: 'All', value: null },
    { label: 'Pending', value: 'pending' },
    { label: 'Accepted', value: 'accepted' },
    { label: 'Declined', value: 'declined' },
  ];

  const typeOptions = [
    { label: 'All', value: null },
    { label: 'Requested by You', value: 'offered' },
    { label: 'Offered to You', value: 'requested' },
  ];

  useEffect(() => {
    const filtered = swaps.filter((swap) => {
      const matchesSearch =
        swap.requested_item?.title.toLowerCase().includes(globalFilter.toLowerCase()) ||
        swap.offered_item?.title.toLowerCase().includes(globalFilter.toLowerCase());

      const matchesStatus = statusFilter ? swap.status === statusFilter : true;

      const isRequestingUser = swap.from_trader?.id === currentUser?.id;
      const matchesType =
        typeFilter === 'offered' ? isRequestingUser :
          typeFilter === 'requested' ? !isRequestingUser : true;

      return matchesSearch && matchesStatus && matchesType;
    });

    setFilteredSwaps(filtered);
  }, [globalFilter, statusFilter, typeFilter, swaps]);

  return (
    <div className="card max-w-screen">
      <div className="grid grid-nogutter align-items-center m-4">
        <div className="flex-auto lg:flex-1 mb-3 lg:mt-0 w-full mr-0 lg:mr-4 text-900">
          <InputText
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search swaps..."
            className="w-full"
          />
        </div>
        <div className="flex-auto lg:flex-1 mb-3 lg:mt-0 w-full mr-0 lg:mr-4 text-900">
          <Dropdown
            value={statusFilter}
            options={statusOptions}
            onChange={(e) => setStatusFilter(e.value)}
            placeholder="Filter by Status"
            className="w-full"
          />
        </div>
        <div className="flex-auto lg:flex-1 mb-3 lg:mt-0 w-full mr-0 lg:mr-4 text-900">
          <Dropdown
            value={typeFilter}
            options={typeOptions}
            onChange={(e) => setTypeFilter(e.value)}
            placeholder="Filter by Type"
            className="w-full"
          />
        </div>
      </div>
      <DataTable value={filteredSwaps} dataKey="id" paginator rows={10}
        scrollable
        className='m-4'
      >
        <Column header="Requested Item" body={(rowData) => rowData.requested_item?.title} />
        <Column header="Offered Item" body={(rowData) => rowData.offered_item?.title} />
        <Column header="Req. Image" body={(rowData) => ItemImageTemplate(rowData.requested_item)} />
        <Column header="Off. Image" body={(rowData) => ItemImageTemplate(rowData.offered_item)} />
        <Column header="Status" body={StatusTemplate} />
        <Column
          header="Actions"
          body={(rowData) => (
            <SwapActions
              swap={rowData}
              currentUser={currentUser}
              onView={onView}
              onApprove={onApprove}
              onDecline={onDecline}
            />
          )}
        />
      </DataTable>
    </div>
  );
};

export default SwapRequestsTable;
