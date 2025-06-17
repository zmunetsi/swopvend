'use client'

import SwapRequestsTable from "@/components/swap/SwapRequestsTable";
import { useRef, useEffect, useState } from "react";
import { fetchSwapRequests, updateSwapStatus } from "@/services/swapService";
import { fetchCurrentUser } from '@/services/authService';
import { useRouter } from 'next/navigation';
import { Dialog } from "primereact/dialog";
import * as swapService from '@/services/swapService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

export default function SwapPage() {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null)
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [targetSwapId, setTargetSwapId] = useState(null);
  const toast = useRef(null);
  const router = useRouter()

  const showDialog = (type, swapId) => {
    setDialogType(type);
    setTargetSwapId(swapId);
    setDialogVisible(true);
  };

  const handleConfirm = async () => {
    try {
      console.log(targetSwapId)
      await updateSwapStatus(targetSwapId, dialogType);
      // toast.success(`Swap ${dialogType}.`);
      window.location.reload();
    } catch (err) {
      //toast.error(`Failed to ${dialogType} swap.`);
    } finally {
      setDialogVisible(false);
    }
  };

  const onView = (swap) => {
    router.push(`/account/swaps/${swap.id}`);
  };

  const onApprove = (swapId) => {
    showDialog('accepted', swapId);
  };

  const onDecline = (swapId) => {
    showDialog('declined', swapId);
  }

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user)
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile.');
        setLoading(false);
      }
    };

    const loadSwaps = async () => {
      try {
        const data = await fetchSwapRequests();
        setSwaps(data);
      } catch (err) {
        console.error("Failed to load swaps", err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
    loadSwaps();
  }, []);


  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">My Swap Requests</h2>
      <SwapRequestsTable swaps={swaps}
        loading={loading}
        currentUser={currentUser}
        onView={onView}
        onApprove={onApprove}
        onDecline={onDecline}
      />

      <Dialog
        header="Confirm Action"
        visible={dialogVisible}
        onHide={() => setDialogVisible(false)}
        footer={
          <div className="flex justify-end gap-2">
            <Button label="Cancel" className="p-button-text" onClick={() => setDialogVisible(false)} />
            <Button label="Confirm" className="p-button" onClick={handleConfirm} />
          </div>
        }
      >
        <p>Are you sure you want to <strong>{dialogType}</strong> this swap?</p>
      </Dialog>
    </div>
  );
}
