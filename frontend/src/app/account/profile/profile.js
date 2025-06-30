'use client';

import { useState, useEffect, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';
import countryList from 'country-list';
import { updateProfile } from '@/services/authService';
import { ServerAuthContext } from '@/context/ServerAuthContext';
import UserGreeting from '@/components/trader/UserGreeting';

export default function ProfilePage() {
  const user = useContext(ServerAuthContext);

  const [form, setForm] = useState({
    username: user?.username || '',
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    city: user?.city || '',
    postcode: user?.postcode || '',
    country: user?.country || '',
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

  const countries = countryList.getNames().map(name => ({ name, code: name }));

  useEffect(() => {
    setDisplayName(form.first_name || form.username);
  }, [form.first_name, form.username]);

  // Update preview if profile_image changes (e.g., after save)
  useEffect(() => {
    if (typeof form.profile_image === 'string' && form.profile_image) {
      setImagePreview(form.profile_image);
    }
    if (!form.profile_image) {
      setImagePreview('/assets/images/avatars/swopvend_placeholder_avatar.png');
    }
  }, [form.profile_image]);

  // Clean up object URLs to avoid memory leaks
  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  // Auto-hide success message after 4 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setValidationErrors(errors => ({ ...errors, [name]: undefined }));
  };
  const handleCountry = (e) => {
    setForm(f => ({ ...f, country: e.value }));
    setValidationErrors(errors => ({ ...errors, country: undefined }));
  };
  const handleUpload = (event) => {
    const file = event.files?.[0];
    if (file) {
      setForm(f => ({ ...f, profile_image: file }));
      // Clean up previous object URL
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

    // Validation
    const errors = {};
    if (!form.first_name) errors.first_name = 'First name is required.';
    if (!form.last_name) errors.last_name = 'Last name is required.';
    if (!form.country) errors.country = 'Country is required.';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setSaving(false);
      setError('Please fix the errors below.');
      return;
    }

    try {
      const payload = new FormData();
      ['first_name', 'last_name', 'phone', 'city', 'postcode']
        .forEach(key => payload.append(key, form[key] || ''));
      if (form.country) {
        payload.append('country', form.country);
      }
      // Only append if it's a File (new upload)
      if (form.profile_image && typeof form.profile_image !== 'string') {
        payload.append('profile_image', form.profile_image);
      }
      const updatedUser = await updateProfile(payload);
      setForm(updatedUser);
      setDisplayName(updatedUser.first_name || updatedUser.username);
      setError('');
      setValidationErrors({});
      setSuccess('Profile updated successfully!');
      // Update preview if backend returns a new image URL
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

  if (!user || (!user.id && !user.username)) {
    return <div className="text-center p-8">Loading profile…</div>;
  }

  return (
    <div className="surface-section flex-auto">
      <div className="flex flex-column flex-auto">
        <div>
          <div className="text-900 font-medium text-xl mb-3">Profile</div>
          <UserGreeting user={user} />
          <div className="surface-card p-4 shadow-2 border-round">
            {error && <div className="mb-4"><Message severity="error" text={error} /></div>}
            {success && <div className="mb-4"><Message severity="success" text={success} /></div>}
            <form onSubmit={handleSave}>
              <div className="grid formgrid p-fluid">
                <div className="field mb-4 col-12 md:col-6">
                  <label htmlFor="firstname" className="font-medium"> Firstname</label>
                  <InputText
                    id="firstname"
                    type="text"
                    value={form.first_name ?? ''}
                    onChange={handleChange}
                    name="first_name"
                    className={validationErrors.first_name ? 'p-invalid' : ''}
                  />
                  {validationErrors.first_name && (
                    <small className="p-error">{validationErrors.first_name}</small>
                  )}
                </div>
                <div className="field mb-4 col-12 md:col-6">
                  <label htmlFor="lastname" className="font-medium">Lastname</label>
                  <InputText
                    id="lastname"
                    type="text"
                    value={form.last_name ?? ''}
                    onChange={handleChange}
                    name="last_name"
                    className={validationErrors.last_name ? 'p-invalid' : ''}
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
                <div className="surface-100 mb-3 col-12" style={{ height: '2px' }}></div>
                <div className="field mb-4 col-12 md:col-6">
                  <label htmlFor="phone" className="font-medium">Phone</label>
                  <InputText
                    id="phone"
                    type="text"
                    value={form.phone ?? ''}
                    onChange={handleChange}
                    name="phone"
                  />
                </div>
                <div className="field mb-4 col-12 md:col-6">
                  <label htmlFor="avatar" className="font-medium">Avatar</label>
                  <div className="flex align-items-center">
                    <img
                      src={imagePreview}
                      alt="avatar"
                      className="mr-4"
                      style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: '50%' }}
                    />
                    <FileUpload
                      mode="basic"
                      name="avatar"
                      onSelect={handleUpload}
                      accept="image/*"
                      maxFileSize={1000000}
                      chooseOptions={{ className: 'p-button-plain p-button-outlined' }}
                      chooseLabel="Upload Image"
                    />
                  </div>
                </div>
                <div className="surface-100 mb-3 col-12" style={{ height: '2px' }}></div>
                <div className="field mb-4 col-12 md:col-6">
                  <label htmlFor="city" className="font-medium">City</label>
                  <InputText
                    id="city"
                    type="text"
                    value={form.city ?? ''}
                    onChange={handleChange}
                    name="city"
                  />
                </div>
                <div className="field mb-4 col-12 md:col-6">
                  <label htmlFor="postcode" className="font-medium">Post code</label>
                  <InputText
                    id="postcode"
                    type="text"
                    value={form.postcode ?? ''}
                    onChange={handleChange}
                    name="postcode"
                  />
                </div>
                <div className="field mb-4 col-12 md:col-6">
                  <label htmlFor="bio" className="font-medium">Country</label>
                  <Dropdown
                    options={countries}
                    value={form.country ?? ''}
                    id="country"
                    name="country"
                    onChange={handleCountry}
                    optionLabel="name"
                    optionValue="name"
                    filter filterBy="name" showClear placeholder="Select a Country"
                    itemTemplate={(country) => <div className="flex align-items-center">
                      <div>{country.name}</div>
                    </div>}
                    className={validationErrors.country ? 'p-invalid' : ''}
                  />
                  {validationErrors.country && (
                    <small className="p-error">{validationErrors.country}</small>
                  )}
                </div>
                <div className="surface-100 mb-3 col-12" style={{ height: '2px' }}></div>
                <div className="col-12">
                  <Button
                    label={saving ? "Saving..." : "Save Changes"}
                    className="w-auto mt-3"
                    type="submit"
                    disabled={saving}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}