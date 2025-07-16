import Image from 'next/image';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';

export default function ItemCard({ item }) {

  return (

    <div className="col-6 md:col-3 lg:col-2">
      <Link href={`/items/${item.id}`} className="block no-underline text-decoration-none">
        <div className="p-2">
          <div className="shadow-2 surface-card border-round">
            <div className="relative mb-1">
              <span className="surface-0 font-bold font-italic text-sm text-primary shadow-2 px-3 py-2 absolute" style={{ borderRadius: '1.5rem', left: '1rem', top: '1rem' }}>{item.condition || 'Good'}</span>
              <CldImage
                width={400}
                height={300}
                crop="fill"
                className="w-full h-full object-cover"
                src={item.featured_image_public_id}
                alt={item.title}
              />
            </div>
            <div className="flex justify-content-between align-items-center">
              <Button label={ item.title }  className='font-light text-sm text-primary hover:bg-white' text />
            </div>
            <Chip className="text-primary text-sm m-3 mt-0" label="5 miles away" icon="pi pi-fw pi-map-marker" />
          </div>
        </div>
      </Link>
    </div>

  );
}