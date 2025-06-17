'use client';
import { DataView } from 'primereact/dataview';
import ItemCard from './ItemCard';


const items = [
  {
    id: 1,
    name: 'Vintage Bicycle',
    category: 'Transport',
    location: 'London',
    description: 'Classic red road bike in great condition.',
    image: 'assets/images/items/placeholder_book.webp'
  },
  {
    id: 2,
    name: 'Guitar',
    category: 'Music',
    location: 'Manchester',
    description: 'Acoustic guitar, barely used.',
    image: 'assets/images/items/placeholder_watch.webp'
  },
  {
    id: 3,
    name: 'Gaming Console',
    category: 'Electronics',
    location: 'Bristol',
    description: 'Old-gen console with 2 controllers.',
    image: 'assets/images/items/placeholder_bicycle.webp'
  },
  {
    id: 4,
    name: 'Smartphone',
    category: 'Electronics',
    location: 'London',
    description: 'Latest model, excellent condition.',
    image: 'assets/images/items/placeholder_watch.webp'
  },
    {
    id: 1,
    name: 'Vintage Bicycle',
    category: 'Transport',
    location: 'London',
    description: 'Classic red road bike in great condition.',
    image: 'assets/images/items/placeholder_book.webp'
  },
  {
    id: 2,
    name: 'Guitar',
    category: 'Music',
    location: 'Manchester',
    description: 'Acoustic guitar, barely used.',
    image: 'assets/images/items/placeholder_watch.webp'
  },
  {
    id: 3,
    name: 'Gaming Console',
    category: 'Electronics',
    location: 'Bristol',
    description: 'Old-gen console with 2 controllers.',
    image: 'assets/images/items/placeholder_bicycle.webp'
  },
  {
    id: 4,
    name: 'Smartphone',
    category: 'Electronics',
    location: 'London',
    description: 'Latest model, excellent condition.',
    image: 'assets/images/items/placeholder_watch.webp'
  }
];

export default function HomeListings({ data = items }) {
  // Template for rendering each item
  const itemTemplate = (item) => (
      <ItemCard
        image={item.image}
        title={item.name}
        location={item.location}
        description={item.description}
        onClick={() => console.log('Clicked:', item.title)}
      />
  );

  return (
    <div>
      <DataView
        value={data}
        layout="grid"
        itemTemplate={itemTemplate}
        rows={4}
        className='px-3'
      />
    </div>
  );
}