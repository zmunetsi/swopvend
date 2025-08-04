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
import DialogItemCard from '@/components/item/DialogItemCard';
import categories from '@/data/categories.json';
import conditions from '@/data/conditions.json';
import { CldImage } from 'next-cloudinary';
import { fetchCountries, fetchCities } from '@/services/locationService';
import { Message } from 'primereact/message';

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
  const [errors, setErrors] = useState({});
  const [flash, setFlash] = useState({ type: '', text: '' });

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
            city: data.city_detail?.id|| '', // <-- Prefill city by ID
            country: data.country_detail?.id || '', // <-- Prefill country by ID
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

  const validate = () => {
    const newErrors = {};
    if (!form.title) newErrors.title = "Title is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!selectedCountry) newErrors.country = "Country is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.featured_image && !isEdit) newErrors.featured_image = "Featured image is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFlash({ type: '', text: '' });

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      setLoading(false);
      setFlash({ type: 'error', text: 'Please fix the errors above.' });
      return;
    }

    const formData = new FormData();
    for (const key in form) {
      if (key === 'extra_images') {
        form.extra_images.forEach((file) => {
          formData.append('uploaded_images', file);
        });
      } else if (key === 'featured_image') {
        if (form.featured_image instanceof File) {
          formData.append('featured_image', form.featured_image);
        }
      } else if (form[key]) {
        formData.append(key, form[key]);
      }
    }

    try {
      let response;
      if (isEdit) {
        response = await updateItem(itemId, formData);
        setFlash({ type: 'success', text: 'Item updated successfully!' });
        setTimeout(() => {
          router.push('/account/items');
        }, 1800);
      } else {
        response = await uploadItem(formData);
        setUploadedItem(response);
        if (targetItemId) {
          setShowConfirmDialog(true);
          setFlash({ type: 'success', text: 'Item uploaded successfully!' });
          // Do NOT redirect yet; wait for confirmSwap
        } else {
          setFlash({ type: 'success', text: 'Item uploaded successfully!' });
          setTimeout(() => {
            router.push('/account/items');
          }, 1800);
        }
      }
    } catch (error) {
      setFlash({
        type: 'error',
        text: error?.response?.data?.detail || 'An error occurred. Please try again.',
      });
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
      setFlash({ type: 'success', text: 'Swap proposed successfully!' });
      setTimeout(() => {
        router.push('/account/swaps'); // Redirect to swap list after confirming
        onClose?.();
      }, 1200);
    } catch (error) {
      setFlash({
        type: 'error',
        text: error?.response?.data?.detail || 'Swap proposal failed. Please try again.',
      });
      setShowConfirmDialog(false);
    }
  };

  return (
    <>
      {flash.text && (
        <div className="mb-3">
          <Message severity={flash.type === 'success' ? 'success' : 'error'} text={flash.text} />
        </div>
      )}
      <form onSubmit={handleSubmit} className="p-fluid grid gap-3">
        <div className="col-12">
          <InputText
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Item title"
            className={errors.title ? 'p-invalid' : ''}
          />
          {errors.title && <small className="p-error">{errors.title}</small>}
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
            className={errors.category ? 'p-invalid' : ''}
          />
          {errors.category && <small className="p-error">{errors.category}</small>}
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
            className={errors.country ? 'p-invalid' : ''}
          />
          {errors.country && <small className="p-error">{errors.country}</small>}
        </div>
        <div className="col-12">
          <Dropdown
            name="city"
            value={form.city}
            options={filteredCities.map(city => ({ label: city.name, value: city.id }))}
            onChange={e => setForm({ ...form, city: e.value })}
            placeholder="Select City"
            disabled={!selectedCountry}
            className={errors.city ? 'p-invalid' : ''}
          />
          {errors.city && <small className="p-error">{errors.city}</small>}
        </div>
        <div className="col-12">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {errors.featured_image && <small className="p-error">{errors.featured_image}</small>}
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
      {/* Only show confirm dialog if targetItemId is present */}
      <Dialog
        visible={showConfirmDialog && !!targetItemId}
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
            <DialogItemCard item={uploadedItem} />
          </div>)}
      </Dialog>
    </>
  );
};

export default ItemForm;