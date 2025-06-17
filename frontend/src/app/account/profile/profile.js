'use client';

import { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import countryList from 'country-list';
import { fetchCurrentUser, updateProfile } from '@/services/authService';

export default function ProfilePage() {

  const [form, setForm] = useState({
    username: '', // fetched from API
    first_name: '',
    last_name: '',
    email: '', // fetched from API
    city: '',
    postcode: '',
    country: '', // should be a string, not an object, for Dropdown value
    phone: '',
    profile_image: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [country, setCountry] = useState(null);
  const [ display_name, setDisplayName ] = useState('');
  const [value, setValue] = useState(false);
  const countries = countryList.getNames();

  // 1) Fetch current trader on mount
  useEffect(() => {
    let isMounted = true;
    const loadProfile = async () => {
      try {
        const user = await fetchCurrentUser();
        if (isMounted) {
          setForm(user);
          setDisplayName(user.first_name || user.username);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        if (isMounted) {
          setError('Failed to load profile.');
          setLoading(false);
        }
      }
    };
    loadProfile();
    return () => {
      isMounted = false; // Cleanup to avoid setting state on unmounted component
    };
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };
  const handleCountry = (e) => {
    setForm(f => ({ ...f, country: e.value }));
  };
  const handleUpload = ({ files }) => {
    setForm(f => ({ ...f, profile_image: files[0] }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const payload = new FormData();
      ['first_name', 'last_name', 'phone', 'city', 'postcode']
        .forEach(key => payload.append(key, form[key] || ''));
      if (form.country) {
        payload.append('country', form.country);
      }
      if (form.profile_image) {
        payload.append('profile_image', form.profile_image);
      }

      // Tell axios this is multipart/form-data
      const updatedUser = await updateProfile(payload);
      setForm(updatedUser);
      // Optionally show a “Saved!” message or refetch
    } catch (err) {
      console.error(err);
      setError('Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading profile…</div>;
  }

  return (
    <div className="surface-section flex-auto">
      <div className="flex flex-column flex-auto">
        <div>
          <div className="text-900 font-medium text-xl mb-3">Profile</div>
          <div className="font-medium mb-4">
            Welcome back, <span className="font-bold">{ display_name }!</span> 👋
          </div>

          <div className="surface-card p-4 shadow-2 border-round">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid formgrid p-fluid">
              <div className="field mb-4 col-12 md:col-6">
                <label htmlFor="firstname" className="font-medium"> Firstname</label>
                <InputText
                  id="firstname"
                  type="text"
                  value={form.first_name ?? ''}
                  onChange={handleChange}
                  name="first_name"
                />
              </div>
              <div className="field mb-4 col-12 md:col-6">
                <label htmlFor="lastname" className="font-medium">Lastname</label>
                <InputText
                  id="lastname"
                  type="text"
                  value={form.last_name ?? ''}
                  onChange={handleChange}
                  name="last_name"
                />
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
                  <img src="/assets/images/avatars/swopvend_placeholder_avatar.png" alt="avatar-f-4" className="mr-4" />
                  <FileUpload
                    mode="basic"
                    name="avatar"
                    onUpload={handleUpload}
                    onError={(e) => console.error('Upload failed:', e)}
                    onSelect={(e) => console.log('File selected:', e.files)}
                    accept="image/*" maxFileSize={1000000}
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
                  filter filterBy="name" showClear placeholder="Select a Country" itemTemplate={(country) => <div className="flex align-items-center">
                    <div>{country}</div>
                  </div>} />
              </div>
              <div className="surface-100 mb-3 col-12" style={{ height: '2px' }}></div>
              <div className="field mb-4 col-12">
                <label htmlFor="privacy" className="font-medium">Privacy</label>
                <div className="flex align-items-center">
                  <InputSwitch checked={value} onChange={(e) => setValue(e.value)} />
                  <span className="ml-2">Share my data with contacts</span>
                </div>
              </div>
              <div className="surface-100 mb-3 col-12" style={{ height: '2px' }}></div>
              <div className="col-12">
                <Button
                  label="Save Changes"
                  className="w-auto mt-3"
                  onClick={handleSave}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
