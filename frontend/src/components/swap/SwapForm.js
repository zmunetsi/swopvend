'use client';
import { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import UploadItemForm from '@/components/item/ItemForm';
import { Button } from 'primereact/button';
import ItemCard from '@/components/item/ItemCard';
import { proposeSwap } from '@/services/swapService';
import { useRouter } from 'next/navigation';

export default function SwapForm({ targetItem, userItems = [], onProposeSwap }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedItemId && onProposeSwap) {
      await onProposeSwap(selectedItemId);
    }
  };
  // create select item header template
  const selectItemHeaderTemplate = (options) => {
    return (
      <div className="flex align-items-center gap-2 p-3" style={{ cursor: 'pointer' }} onClick={options.onClick}>
        <Button label="Select your item to swap with" className={!options.selected ? 'p-button-outlined' : ''} />
      </div>
    );
  };
  // create an upload header template
  const uploadHeaderTemplate = (options) => {
    console.log('uploadHeaderTemplate', options);
    return (
      <div className="flex align-items-center gap-2 p-3" style={{ cursor: 'pointer' }} onClick={options.onClick}>
        <Button label="Upload item to swap with" className={!options.selected ? 'p-button-outlined' : ''} />
      </div>
    );
  };

  const handleProposeSwap = async () => {
    try {
      await proposeSwap(targetItem.id, selectedItemId);
      //toast.success('Swap proposed successfully');
      router.push('/account/swaps');
    } catch (error) {
      console.error(error);
      //toast.error('Failed to propose swap');
    }
  };

  return (
    <div className="card shadow-2 p-4 surface-card border-round">
      <div className="grid">
        <ItemCard className="col-12 md:col-6 lg:col-4" item={targetItem}
          showSwapButton={false} />
        <div className="col-12 md:col-6 lg:col-8">
          <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} renderActiveOnly={false} >
            <TabPanel header="Header I" headerTemplate={selectItemHeaderTemplate} disabled={userItems.length === 0}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Dropdown
                  value={selectedItemId}
                  onChange={(e) => setSelectedItemId(e.value)}
                  options={userItems.map(item => ({ label: item.title, value: item.id }))}
                  placeholder="Choose one of your items"
                  className="w-full"
                />
                <Button
                  className="my-4" label="Propose Swap" icon="pi pi-exchange" type="submit"
                  onClick={handleProposeSwap}
                  disabled={!selectedItemId}
                />
              </form>
            </TabPanel>
            <TabPanel headerTemplate={uploadHeaderTemplate} headerClassName="flex align-items-center">
              <UploadItemForm context="swap" 
                onClose={(item) => {
                  // console.log('Item uploaded:', item);
                }} 
                targetItemId={targetItem.id}
               />
            </TabPanel>
          </TabView>
        </div>
      </div>
    </div>
  );
}
