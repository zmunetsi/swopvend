import Image from 'next/image';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

export default function ItemCard({ item }) {

  return (

    <div className="col-12 md:col-6 lg:col-4 xl:col-3">
      <Link href={`/items/${item.id}`} className="block no-underline text-decoration-none">
        <div className="p-2">
          <div className="shadow-2 p-4 surface-card border-round">
            <div className="relative mb-3">
              <span className="surface-0 font-medium font-italic text-primary shadow-2 px-3 py-2 absolute" style={{ borderRadius: '1.5rem', left: '1rem', top: '1rem' }}>{item.location || 'Location'}</span>
              <CldImage
                width={400}
                height={300}
                crop="fill"
                className="w-full h-full object-cover"
                src={item.featured_image_public_id}
                alt={item.title}
              />
            </div>
            <div className="flex justify-content-between align-items-center mb-3">
              <span className="text-700 text-primary font-medium text-xl no-underline">{item.title || 'Item Title'}</span>
              <span>
                <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
                <span className="font-medium">5.0</span>
              </span>
            </div>
            <p className="mt-0 mb-3 text-primary line-height-3 no-underline">
              {item.description || 'Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.'}
            </p>
          </div>
        </div>
      </Link>
    </div>

  );
}