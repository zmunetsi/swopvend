'use client';
import { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Dropdown } from 'primereact/dropdown';
import UploadItemForm from '@/components/item/ItemForm';
import { Button } from 'primereact/button';
import ItemCard from '@/components/item/ItemCard';
import { proposeSwap } from '@/services/swapService';
import { createInterest } from '@/services/itemInterestService'; // <-- import here
import { useRouter } from 'next/navigation';
import { InputTextarea } from 'primereact/inputtextarea';

export default function SwapForm({ targetItem, userItems = [], onProposeSwap }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [note, setNote] = useState('');
  const [interestMessage, setInterestMessage] = useState('');
  const [interestLoading, setInterestLoading] = useState(false);
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

  const handleCreateInterest = async () => {
    setInterestLoading(true);
    setInterestMessage('');
    try {
      await createInterest({
        item: targetItem.id,
        interest_type: targetItem.status === 'given' ? 'free' : 'processing',
        note: note
      });
      setInterestMessage('Interest registered! We will notify the owner.');
      setNote('');
    } catch (error) {
      setInterestMessage(
        error?.response?.data?.detail ||
        'Failed to register interest. Please try again.'
      );
    } finally {
      setInterestLoading(false);
    }
  };

  const handleProposeSwap = async () => {
    try {
      await proposeSwap(targetItem.id, selectedItemId);
      router.push('/account/swaps');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="card shadow-2 p-4 surface-card border-round">
      <div className="grid">
        <ItemCard item={targetItem} showSwapButton={false} />
        <div className="col-12 md:col-6 lg:col-8">
          {(targetItem.status === 'given' || targetItem.status === 'processing') ? (
            <div className="p-4 surface-ground border-round flex flex-column align-items-center justify-content-center">
              {targetItem.status === 'given' ? (
                <i className="pi pi-gift text-4xl mb-3 text-primary" />
              ) : (
                <i className="pi pi-spin pi-cog text-4xl mb-3 text-primary" />
              )}
              <div className="font-bold text-lg mb-2 text-primary">
                {targetItem.status === 'given'
                  ? 'This item is being given away for free.'
                  : 'This item is currently involved in a swap.'}
              </div>
              <div className="text-600 mb-3">
                {targetItem.status === 'given'
                  ? 'It is no longer available for swaps because the owner wants to give it to anyone for free.'
                  : 'If the swap fails, we will notify interested parties.'}
              </div>
              <InputTextarea
                className="w-full mb-2"
                rows={2}
                placeholder="Add a note (optional)"
                value={note}
                onChange={e => setNote(e.target.value)}
                disabled={interestLoading}
              />
              <Button
                label="Show Interest"
                icon="pi pi-user-plus"
                className="p-button-success"
                onClick={handleCreateInterest}
                loading={interestLoading}
                disabled={interestLoading}
              />
              {interestMessage && (
                <div className={`text-xs mt-2 ${interestMessage.startsWith('Interest registered') ? 'text-success' : 'text-danger'}`}>
                  {interestMessage}
                </div>
              )}
              <div className="text-xs text-500 mt-2">
                {targetItem.status === 'given'
                  ? 'We will notify the owner of your interest.'
                  : 'We will notify you when the item is available.'}
              </div>
            </div>
          ) : (
            <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} renderActiveOnly={false}>
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
          )}
        </div>
      </div>
    </div>
  );
}
