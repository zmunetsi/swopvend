'use client';

import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { Dialog } from 'primereact/dialog';
import { uploadItem } from '@/services/itemService';
import { proposeSwap } from '@/services/swapService';
import ItemCard from '@/components/item/ItemCard';
import categories from '@/data/categories.json';
import conditions from '@/data/conditions.json';
import { useRouter } from 'next/navigation';
import { CldImage } from 'next-cloudinary';

const ItemForm = ({ targetItemId, onClose }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    preferred_item: '',
    description: '',
    category: '',
    condition: '',
    location: '',
    featured_image: null,
    extra_images: [],
  });


  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [uploadedItem, setUploadedItem] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, featured_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    for (const key in form) {
      if (key === 'extra_images') {
        form.extra_images.forEach((file, i) => {
          formData.append('uploaded_images', file); // assuming backend accepts list
        });
      } else if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      const response = await uploadItem(formData);
      setUploadedItem(response);
      setShowConfirmDialog(true);
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmSwap = async () => {
    console.log(targetItemId, uploadedItem.id);
    if (!targetItemId || !uploadedItem) {
      console.error('Missing target item ID or uploaded item');
      return;
    }
    try {
      await proposeSwap(targetItemId, uploadedItem.id);
      setShowConfirmDialog(false);
      router.push('/account/swaps'); // Redirect to swaps page
      onClose?.(); // Notify parent
    } catch (error) {
      console.error('Swap proposal failed', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-fluid grid gap-3">
        <div className="col-12">
          <InputText
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Item title"
          />
        </div>
        <div className="col-12">
          <InputText
            name="preferred_item"
            value={form.preferred_item}
            onChange={handleChange}
            placeholder="What would you like to swap this for?"
          />
        </div>
        <div className="col-12">
          <InputTextarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows={4}
          />
        </div>
        <div className="col-6">
          <Dropdown
            name="category"
            value={form.category}
            options={categories}
            onChange={(e) => setForm({ ...form, category: e.value })}
            placeholder="Select Category"
          />
        </div>
        <div className="col-6">
          <Dropdown
            name="condition"
            value={form.condition}
            options={conditions}
            onChange={(e) => setForm({ ...form, condition: e.value })}
            placeholder="Select Condition"
          />
        </div>
        <div className="col-12">
          <InputText
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Location"
          />
        </div>
        <div className="col-12">
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
        <div className="col-12">
          <label htmlFor="extra_images" className="block mb-1">Additional Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setForm({ ...form, extra_images: Array.from(e.target.files) })}
          />
        </div>
        <div className="col-12">
          <Button type="submit" label="Upload Item" loading={loading} />
        </div>
      </form>
      <Dialog
        visible={showConfirmDialog}
        onHide={() => setShowConfirmDialog(false)}
        header="Use this item for swap?"
        footer={
          <>
            <Button label="Yes, Propose Swap" icon="pi pi-check" onClick={confirmSwap} autoFocus />
            <Button label="Upload Another" icon="pi pi-times" className="p-button-text" onClick={() => setShowConfirmDialog(false)} />
          </>
        }
      >
        {uploadedItem &&
          (<div>
            <Link href={`/items/${uploadedItem.id}`} className="block no-underline text-decoration-none">
              <div className="p-2">
                <div className="shadow-2 p-4 surface-card border-round">
                  <div className="relative mb-3">
                    <span className="surface-0 font-medium font-italic text-primary shadow-2 px-3 py-2 absolute" style={{ borderRadius: '1.5rem', left: '1rem', top: '1rem' }}>{uploadedItem.location || 'Location'}</span>
                    <CldImage
                      width={400}
                      height={300}
                      crop="fit" 
                      className="w-full h-full object-cover"
                      src={uploadedItem.featured_image_public_id}
                      alt={uploadedItem.title} />
                  </div>
                  <div className="flex justify-content-between align-items-center mb-3">
                    <span className="text-700 text-primary font-medium text-xl no-underline">{uploadedItem.title || 'Item Title'}</span>
                    <span>
                      <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                      <span className="font-medium">5.0</span>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>)}
      </Dialog>
    </>
  );
};

export default ItemForm;