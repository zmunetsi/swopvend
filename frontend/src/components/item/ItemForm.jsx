'use client';

import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { Dialog } from 'primereact/dialog';
import { uploadItem, updateItem, fetchItemDetail } from '@/services/itemService';
import { proposeSwap } from '@/services/swapService';
import ItemCard from '@/components/item/ItemCard';
import categories from '@/data/categories.json';
import conditions from '@/data/conditions.json';
import { CldImage } from 'next-cloudinary';
import { fetchCountries, fetchCities } from '@/services/locationService';

const ItemForm = ({ itemId, targetItemId, onClose }) => {
  const router = useRouter();
  const isEdit = !!itemId;

  const [form, setForm] = useState({
    title: '',
    preferred_item: '',
    description: '',
    category: '',
    condition: '',
    city: '',
    country: '',
    featured_image: null,
    extra_images: [],
    featured_image_public_id: '',
  });

  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [uploadedItem, setUploadedItem] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // Fetch item details if editing
  useEffect(() => {
    if (isEdit) {
      setLoading(true);
      fetchItemDetail(itemId)
        .then((data) => {
          setForm({
            title: data.title || '',
            preferred_item: data.preferred_item || '',
            description: data.description || '',
            category: data.category || '',
            condition: data.condition || '',
            city: data.city_detail?.id || '',
            country: data.city_detail?.country.id || '',
            featured_image: null,
            extra_images: [],
            featured_image_public_id: data.featured_image_public_id || '',
          });
          setSelectedCountry(data.city_detail?.country.id || '');
        })
        .catch((err) => {
          console.error('Failed to fetch item details', err);
        })
        .finally(() => setLoading(false));
    }
  }, [isEdit, itemId]);

  // Fetch countries and cities on mount
  useEffect(() => {
    fetchCountries().then(setCountries);
    fetchCities().then(setCities);
  }, []);

  // Filter cities by selected country
  const filteredCities = selectedCountry
    ? cities.filter(city => city.country && city.country.id === selectedCountry)
    : [];

  // If editing, set selectedCountry from loaded item
  useEffect(() => {
    if (isEdit && form.country) {
      setSelectedCountry(form.country);
    }
  }, [isEdit, form.country]);

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
        form.extra_images.forEach((file) => {
          formData.append('uploaded_images', file);
        });
      } else if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      let response;
      if (isEdit) {
        response = await updateItem(itemId, formData);
        router.push('/account/items');
      } else {
        response = await uploadItem(formData);
        setUploadedItem(response);
        setShowConfirmDialog(true);
      }
    } catch (error) {
      console.error(isEdit ? 'Update failed' : 'Upload failed', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmSwap = async () => {
    if (!targetItemId || !uploadedItem) {
      console.error('Missing target item ID or uploaded item');
      return;
    }
    try {
      await proposeSwap(targetItemId, uploadedItem.id);
      setShowConfirmDialog(false);
      router.push('/account/swaps');
      onClose?.();
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
        <div className="col-12">
          <Dropdown
            name="category"
            value={form.category}
            options={categories}
            onChange={(e) => setForm({ ...form, category: e.value })}
            placeholder="Select Category"
          />
        </div>
        <div className="col-12">
          <Dropdown
            name="condition"
            value={form.condition}
            options={conditions}
            onChange={(e) => setForm({ ...form, condition: e.value })}
            placeholder="Select Condition"
          />
        </div>
        <div className="col-12">
          <Dropdown
            name="country"
            value={selectedCountry}
            options={countries.map(c => ({ label: c.name, value: c.id }))}
            onChange={e => {
              setSelectedCountry(e.value);
              setForm({ ...form, country: e.value, city: '' }); // Reset city when country changes
            }}
            placeholder="Select Country"
          />
        </div>
        <div className="col-12">
          <Dropdown
            name="city"
            value={form.city}
            options={filteredCities.map(city => ({ label: city.name, value: city.id }))}
            onChange={e => setForm({ ...form, city: e.value })}
            placeholder="Select City"
            disabled={!selectedCountry}
          />
        </div>
        <div className="col-12">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {isEdit && form.featured_image_public_id && (
            <div className="mt-2">
              <CldImage
                width={200}
                height={150}
                crop="fit"
                className="object-cover"
                src={form.featured_image_public_id}
                alt={form.title}
              />
            </div>
          )}
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
          <Button type="submit" label={isEdit ? "Update Item" : "Upload Item"} loading={loading} />
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
            {/* Use ItemCard for preview */}
            <ItemCard item={uploadedItem} />
          </div>)}
      </Dialog>
    </>
  );
};

export default ItemForm;