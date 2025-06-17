"use client";

import { useEffect, useState } from "react";
import {
  fetchSwapRequests,
  updateSwapStatus,
  deleteSwapRequest,
} from "@/services/swapService";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

const SwapRequests = () => {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSwaps();
  }, []);

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

  const handleUpdate = async (id, status) => {
    await updateSwapStatus(id, status);
    loadSwaps();
  };

  const handleCancel = async (id) => {
    await deleteSwapRequest(id);
    loadSwaps();
  };

  if (loading) return <p>Loading...</p>;
  if (swaps.length === 0) return <p>No swap requests found.</p>;

  return (
    <div className="grid gap-4">
      {swaps.map((swap) => (
        <Card key={swap.id} title={`Item #${swap.requested_item}`}>
          <p>{swap.message || "No message"}</p>
          <p>Status: <strong>{swap.status}</strong></p>
          <div className="flex gap-2 mt-2">
            {swap.status === "pending" && (
              <>
                <Button label="Accept" onClick={() => handleUpdate(swap.id, "accepted")} />
                <Button label="Decline" severity="danger" onClick={() => handleUpdate(swap.id, "declined")} />
              </>
            )}
            <Button label="Cancel" severity="secondary" onClick={() => handleCancel(swap.id)} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SwapRequests;
