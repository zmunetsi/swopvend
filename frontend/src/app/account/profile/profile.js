'use client';

import { useState, useEffect, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import { updateProfile } from '@/services/authService';
import { ServerAuthContext } from '@/context/ServerAuthContext';
import UserGreeting from '@/components/trader/UserGreeting';
import { CldImage } from 'next-cloudinary';
import { fetchCountries, fetchCities } from '@/services/locationService';

export default function ProfilePage() {
  const user = useContext(ServerAuthContext);

  const [form, setForm] = useState({
    username: user?.username || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    city: user?.city_detail || '',
    postcode: user?.postcode || '',
    country: user?.country_detail || '',
    phone: user?.phone || '',
    profile_image: user?.profile_image || ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [display_name, setDisplayName] = useState(user?.first_name || user?.username || '');
  const [imagePreview, setImagePreview] = useState(
    typeof user?.profile_image === 'string' && user?.profile_image
      ? user.profile_image
      : '/assets/images/avatars/swopvend_placeholder_avatar.png'
  );
  const [objectUrl, setObjectUrl] = useState(null);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(user?.country_detail?.id || '');
  const [selectedCity, setSelectedCity] = useState(user?.city_detail?.id || '');

  useEffect(() => {
    setDisplayName(form.first_name || form.username);
  }, [form.first_name, form.username]);

  useEffect(() => {
    if (typeof form.profile_image === 'string' && form.profile_image) {
      setImagePreview(form.profile_image);
    }
    if (!form.profile_image) {
      setImagePreview('/assets/images/avatars/swopvend_placeholder_avatar.png');
    }
  }, [form.profile_image]);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    fetchCountries().then(setCountries);
    fetchCities().then(setCities);
  }, []);

  useEffect(() => {
    // Set initial country and city from user (by ID)
    setSelectedCountry(user?.country_detail?.id || '');
    setSelectedCity(user?.city_detail?.id || '');
    setForm(f => ({
      ...f,
      country: user?.country_detail?.id || '',
      city: user?.city_detail?.id || ''
    }));
  }, [user]);

  const filteredCities = selectedCountry
    ? cities.filter(city => city.country && city.country.id === selectedCountry)
    : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setValidationErrors(errors => ({ ...errors, [name]: undefined }));
  };
  const handleCountry = (e) => {
    setSelectedCountry(e.value);
    setSelectedCity('');
    setForm(f => ({ ...f, country: e.value, city: '' }));
    setValidationErrors(errors => ({ ...errors, country: undefined }));
  };
  const handleCity = (e) => {
    setSelectedCity(e.value);
    setForm(f => ({ ...f, city: e.value }));
  };
  const handleUpload = (event) => {
    const file = event.files?.[0];
    if (file) {
      setForm(f => ({ ...f, profile_image: file }));
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setObjectUrl(url);
    }
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');
    setValidationErrors({});

    const errors = {};
    if (!form.first_name) errors.first_name = 'First name is required.';
    if (!form.last_name) errors.last_name = 'Last name is required.';
    if (!selectedCountry) errors.country = 'Country is required.';
    if (!selectedCity) errors.city = 'City is required.';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSaving(false);
      setError('Please fix the errors below.');
      return;
    }

    try {
      const payload = new FormData();
      payload.append('first_name', form.first_name || '');
      payload.append('last_name', form.last_name || '');
      payload.append('phone', form.phone || '');
      payload.append('postcode', form.postcode || '');
      payload.append('country', selectedCountry); // send country ID
      payload.append('city', selectedCity);       // send city ID
      if (form.profile_image && typeof form.profile_image !== 'string') {
        payload.append('profile_image', form.profile_image);
      }
      const updatedUser = await updateProfile(payload);

      // Update state with response, using country_detail and city_detail for display
      setForm({
        ...updatedUser,
        country: updatedUser.country_detail?.id || '',
        city: updatedUser.city_detail?.id || '',
      });
      setSelectedCountry(updatedUser.country_detail?.id || '');
      setSelectedCity(updatedUser.city_detail?.id || '');
      setDisplayName(updatedUser.first_name || updatedUser.username);
      setError('');
      setValidationErrors({});
      setSuccess('Profile updated successfully!');
      if (updatedUser.profile_image) {
        setImagePreview(updatedUser.profile_image);
        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          setObjectUrl(null);
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  const profileImagePublicId = user?.profile_image_public_id || 'swopvend_placeholder_avatar_ntjphs';

  if (!user || (!user.id && !user.username)) {
    return <div className="text-center p-8">Loading profile…</div>;
  }

  return (
    <div className="surface-section flex-auto">
      <div className="flex flex-column flex-auto">
        <div>
          <div className="p-4">
            <UserGreeting user={user} />
          </div>
          <div className="surface-card p-0 shadow-2 border-round-xl max-w-3xl mx-auto">
            {/* Modern header */}
            <div className="flex flex-column md:flex-row align-items-center justify-content-between gap-4 p-4 border-bottom-1 surface-border">
              <div className="flex align-items-center gap-3">
                <div className="flex align-items-center justify-content-center border-circle border-2 border-primary" style={{ width: 80, height: 80, background: '#fff' }}>
                  {typeof form.profile_image === 'string' && !form.profile_image.startsWith('blob:') ? (
                    <CldImage
                      src={profileImagePublicId}
                      alt="avatar"
                      width={72}
                      height={72}
                      className="border-circle"
                      style={{ objectFit: 'cover', borderRadius: '50%' }}
                    />
                  ) : (
                    <img
                      src={imagePreview}
                      alt="avatar"
                      style={{ width: 72, height: 72, objectFit: 'cover', borderRadius: '50%' }}
                    />
                  )}
                </div>
                <div>
                  <div className="font-bold text-xl">{display_name}</div>
                  <div className="text-600">{form.email}</div>
                </div>
              </div>
              <div>
                <FileUpload
                  mode="basic"
                  name="avatar"
                  onSelect={handleUpload}
                  accept="image/*"
                  maxFileSize={1000000}
                  chooseOptions={{ className: 'p-button-outlined p-button-sm' }}
                  chooseLabel="Change Avatar"
                />
              </div>
            </div>
            <div className="p-4">
              {error && <div className="mb-4"><Message severity="error" text={error} /></div>}
              {success && <div className="mb-4"><Message severity="success" text={success} /></div>}
              <form onSubmit={handleSave}>
                <div className="grid formgrid p-fluid">
                  <div className="field mb-4 col-12 md:col-6">
                    <label htmlFor="firstname" className="font-medium">First name</label>
                    <InputText
                      id="firstname"
                      type="text"
                      value={form.first_name ?? ''}
                      onChange={handleChange}
                      name="first_name"
                      className={validationErrors.first_name ? 'p-invalid' : ''}
                      placeholder="Your first name"
                    />
                    {validationErrors.first_name && (
                      <small className="p-error">{validationErrors.first_name}</small>
                    )}
                  </div>
                  <div className="field mb-4 col-12 md:col-6">
                    <label htmlFor="lastname" className="font-medium">Last name</label>
                    <InputText
                      id="lastname"
                      type="text"
                      value={form.last_name ?? ''}
                      onChange={handleChange}
                      name="last_name"
                      className={validationErrors.last_name ? 'p-invalid' : ''}
                      placeholder="Your last name"
                    />
                    {validationErrors.last_name && (
                      <small className="p-error">{validationErrors.last_name}</small>
                    )}
                  </div>
                  <div className="field mb-4 col-12 md:col-6">
                    <label htmlFor="username" className="font-medium">Username</label>
                    <InputText id="username" type="text" value={form.username ?? ''} disabled />
                  </div>
                  <div className="field mb-4 col-12 md:col-6">
                    <label htmlFor="email" className="font-medium">Email</label>
                    <InputText id="email" type="text" value={form.email ?? ''} disabled />
                  </div>
                  <div className="field mb-4 col-12 md:col-6">
                    <label htmlFor="phone" className="font-medium">Phone</label>
                    <InputText
                      id="phone"
                      type="text"
                      value={form.phone ?? ''}
                      onChange={handleChange}
                      name="phone"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="field mb-4 col-12 md:col-6">
                    <label htmlFor="country" className="font-medium">Country</label>
                    <Dropdown
                      name="country"
                      value={selectedCountry}
                      options={countries.map(c => ({ label: c.name, value: c.id }))}
                      onChange={handleCountry}
                      placeholder="Select Country"
                      filter
                      showClear
                      className={validationErrors.country ? 'p-invalid' : ''}
                    />
                    {validationErrors.country && (
                      <small className="p-error">{validationErrors.country}</small>
                    )}
                  </div>
                  <div className="field mb-4 col-12 md:col-6">
                    <label htmlFor="city" className="font-medium">City</label>
                    <Dropdown
                      name="city"
                      value={selectedCity}
                      options={filteredCities.map(city => ({ label: city.name, value: city.id }))}
                      onChange={handleCity}
                      placeholder="Select City"
                      disabled={!selectedCountry}
                      filter
                      showClear
                    />
                  </div>
                  <div className="col-12 flex justify-content-end mt-4">
                    <Button
                      label={saving ? "Saving..." : "Save Changes"}
                      className="w-auto p-button-md"
                      type="submit"
                      disabled={saving}
                      icon={saving ? "pi pi-spin pi-spinner" : "pi pi-save"}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}