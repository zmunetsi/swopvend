'use client';

import { useState, useEffect, useContext } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
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
  const [display_name, setDisplayName] = useState(user?.first_name || user?.username || '');
  const [value, setValue] = useState(false);

  const countries = countryList.getNames().map(name => ({ name, code: name }));

  useEffect(() => {
    setDisplayName(form.first_name || form.username);
  }, [form.first_name, form.username]);

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
      const updatedUser = await updateProfile(payload);
      setForm(updatedUser);
      setDisplayName(updatedUser.first_name || updatedUser.username);
    } catch (err) {
      console.error(err);
      setError('Failed to save profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return <div className="text-center p-8">Loading profile…</div>;
  }

  return (
    <div className="surface-section flex-auto">
      <div className="flex flex-column flex-auto">
        <div>
          <div className="text-900 font-medium text-xl mb-3">Profile</div>
          <UserGreeting user={user} />
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
                  <img src={form.profile_image || '/assets/images/avatars/swopvend_placeholder_avatar.png'} alt="avatar-f-4" className="mr-4" />
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
                  optionValue="name"
                  filter filterBy="name" showClear placeholder="Select a Country"
                  itemTemplate={(country) => <div className="flex align-items-center">
                    <div>{country.name}</div>
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
                  label={saving ? "Saving..." : "Save Changes"}
                  className="w-auto mt-3"
                  onClick={handleSave}
                  disabled={saving}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
