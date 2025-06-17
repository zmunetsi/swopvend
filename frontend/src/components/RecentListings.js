'use client';

import { useState } from 'react';
import { DataView } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import Link from 'next/link';
import 'primeflex/primeflex.css';

const dummyItems = [
  {
    id: 1,
    name: 'Vintage Bicycle',
    category: 'Transport',
    location: 'London',
    description: 'Classic red road bike in great condition.',
    image: '/assets/images/items/placeholder_bike.webp'
  },
  {
    id: 2,
    name: 'Guitar',
    category: 'Music',
    location: 'Manchester',
    description: 'Acoustic guitar, barely used.',
    image: '/assets/images/items/placeholder_guitar.webp'
  },
  {
    id: 3,
    name: 'Gaming Console',
    category: 'Electronics',
    location: 'Bristol',
    description: 'Old-gen console with 2 controllers.',
    image: '/assets/images/items/placeholder_console.webp'
  },
  {
    id: 4,
    name: 'Smartphone',
    category: 'Electronics',
    location: 'London',
    description: 'Latest model, excellent condition.',
    image: '/assets/images/items/placeholder_console.webp'
  }
];

const categories = [
  { label: 'All Categories', value: null },
  { label: 'Transport', value: 'Transport' },
  { label: 'Music', value: 'Music' },
  { label: 'Electronics', value: 'Electronics' }
];

const locations = [
  { label: 'All Locations', value: null },
  ...Array.from(new Set(dummyItems.map(item => item.location))).map(loc => ({ label: loc, value: loc }))
];

export default function RecentListings() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState(null);

  const filteredItems = dummyItems.filter(item => {
    const matchesCategory = category ? item.category === category : true;
    const matchesLocation = location ? item.location === location : true;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesLocation && matchesSearch;
  });

  const itemTemplate = (item) => (
    <div className="col-12 md:col-6 lg:col-3">
            <div className="p-2">
                <div className="shadow-2 p-4 surface-card border-round">
                    <div className="relative mb-3">
                        <span className="surface-overlay text-900 shadow-2 px-3 py-2 absolute" style={{ borderRadius: '1.5rem', left: '1rem', top: '1rem' }}>{item.location}</span>
                        <img  src={item.image} alt={item.name} className="w-full h-40 object-cover border-round mb-3" />
                    </div>
                    <div className="flex justify-content-between align-items-center mb-3">
                        <span className="text-900 font-medium text-xl">
                            <Link href={`/item/${item.id}`} className="text-900 no-underline hover:underline">
                                {item.name}
                            </Link>
                        </span>
                        <span>
                            <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                            <span className="font-medium">5.0</span>
                        </span>
                    </div>
                    <p className="mt-0 mb-3 text-600 line-height-3">
                        Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.
                    </p>
                </div>
            </div>
        </div>
  );

  return (
    <section className="p-4">
      <div className="flex flex-column md:flex-row justify-between align-items-center mb-4 gap-3">
        <h2 className="text-xl font-bold text-color">Recent Listings</h2>
        <div className="flex flex-wrap gap-2">
          <Dropdown
            value={category}
            options={categories}
            onChange={(e) => setCategory(e.value)}
            placeholder="Filter by Category"
            className="w-48"
          />
          <Dropdown
            value={location}
            options={locations}
            onChange={(e) => setLocation(e.value)}
            placeholder="Filter by Location"
            className="w-48"
          />
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
            />
          </span>
        </div>
      </div>

      <DataView value={filteredItems} layout="grid" itemTemplate={itemTemplate} paginator rows={4} />
    </section>
  );
}
