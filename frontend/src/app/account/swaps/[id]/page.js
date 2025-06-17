// SwapDetailPage.jsx (redesigned to match visual mockup with scrollable message thread)
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSwapById, updateSwapStatus, postSwapMessage } from '@/services/swapService';
import { fetchCurrentUser } from '@/services/authService';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { InputTextarea } from 'primereact/inputtextarea';
import { CldImage } from 'next-cloudinary';

export default function SwapDetailPage() {
  const { id } = useParams();
  const [swap, setSwap] = useState(null);
  const [content, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)

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
    async function fetchSwap() {
      const data = await getSwapById(id);
      setSwap(data);
      setLoading(false);
    }
    loadProfile();
    fetchSwap();
  }, [id]);

  const handleStatusUpdate = async (status) => {
    await updateSwapStatus(id, status);
    const updated = await getSwapById(id);
    setSwap(updated);
  };

  const handleSendMessage = async () => {
    if (!content.trim()) return;
    setPosting(true);
    const newMessage = await postSwapMessage(id, { content });
    if (newMessage) {
      setSwap((prev) => ({ ...prev, messages: [...prev.messages, newMessage] }));
      setMessage('');
    }
    setPosting(false);
  };

  if (loading || !swap) return <div className="p-4 text-center">Loading...</div>;

  const { from_trader, to_trader, requested_item, offered_item, messages = [] } = swap;
  const otherTrader = from_trader.id === currentUser.id ? to_trader : from_trader;

  return (

    <Card className="p-4 border-round-md shadow-2">
      <div className="text-2xl font-bold mb-3">Swap Request</div>

      {/* Trader Info */}
      <div className="flex align-items-center gap-3 mb-3">
        <Avatar image={otherTrader.avatar} label={otherTrader.username[0]} size="large" shape="circle" />
        <div>
          <div className="font-semibold text-lg">{otherTrader.username}</div>
          <div className="text-sm text-500">{otherTrader.email}</div>
        </div>
      </div>

      {/* Message Thread */}
      <div className="mb-4">
        <div className="font-medium mb-2">Messages</div>
        <div className="surface-100 p-3 border-round scrollable max-h-20rem mb-2">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`shadow-2 mb-2 p-2 border-round-sm ${msg.sender.id === currentUser.id ? 'bg-primary text-white ml-auto w-max' : 'bg-white text-900 mr-auto w-max'
                }`}
            >

              <div className={`mb-2 p-2 border-round-sm text-xs ${msg.sender.id === currentUser.id ? 'text-white' : 'text-primary'
                }`}>{msg.content}</div>
              <div className="text-xs mt-1 text-500">{new Date(msg.created_at).toLocaleString()}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <InputTextarea
            value={content}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="w-full"
            rows={2}
          />
          <Button label="Send" icon="pi pi-send" onClick={handleSendMessage} loading={posting} disabled={!content.trim()} />
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-nogutter justify-content-between align-items-center mb-4">
        <div className="col md:col-6">
          <div className="font-medium mb-2">Your Item</div>
          <CldImage
            width={400}
            height={300}
            crop="fit"
            className="object-cover border-round"
            publicId={offered_item.featured_image_public_id}
            alt={offered_item.title} />
        </div>
        <div className="col md:col-6">
          <div className="font-medium mb-2">Requested Item</div>
          <CldImage
            width={400}
            height={300}
            crop="fit"
            className="object-cover border-round"
            src={requested_item.featured_image_public_id}
            alt={requested_item.title} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-content-between gap-3">
        <Button label="Accept" className="w-full p-button-primary" onClick={() => handleStatusUpdate('accepted')} />
        <Button label="Decline" className="w-full p-button-outlined" onClick={() => handleStatusUpdate('declined')} />
      </div>
    </Card>

  );
}
