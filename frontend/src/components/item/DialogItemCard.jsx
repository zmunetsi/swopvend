import Image from 'next/image';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function DialogItemCard({ item }) {
  const conditionColors = {
    New: 'bg-green-100 text-green-900',
    Used: 'bg-blue-100 text-blue-900',
    Refurbished: 'bg-yellow-100 text-yellow-900',
    Damaged: 'bg-red-100 text-red-900',
  };
  const condition = item.condition || 'Used';
  const conditionClass = conditionColors[condition] || 'bg-gray-100 text-gray-800';

  return (
    <div className="w-full">
      <Link
        href={`/items/${item.slug || item.id}`}
        className="block no-underline text-decoration-none"
      >
        <div className="p-2">
          <div className="shadow-2 surface-card border-round">
            <div className="relative mb-1">
              <span
                className={`font-bold font-italic text-sm shadow-2 px-3 py-2 absolute ${conditionClass}`}
                style={{ borderRadius: '1.5rem', left: '1rem', top: '1rem' }}
              >
                {condition}
              </span>
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
              <Button
                label={item.title ? item.title.charAt(0).toUpperCase() + item.title.slice(1) : ''}
                className="font-light text-sm text-primary hover:bg-white"
                text
              />
            </div>
            <div className="flex flex-row flex-wrap gap-2 mt-0 mb-3 relative">
              <Chip
                className="text-primary text-xxs min-w-0 mx-3 mb-4"
                label={item.created_at ? dayjs(item.created_at).fromNow() : ''}
                icon="pi pi-fw pi-clock"
                style={{ fontSize: '0.7rem' }}
              />
              {item.status === 'given' && (
                <span
                  className="absolute flex align-items-center gap-1 px-3 py-1"
                  style={{
                    right: 0,
                    bottom: 0,
                    background: 'var(--primary-color, #4166A9)',
                    color: '#fff',
                    borderRadius: '1rem 0 0 0',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    zIndex: 2,
                  }}
                >
                  <i className="pi pi-gift" style={{ color: '#fff', fontSize: '1rem' }} />
                  Given Away
                </span>
              )}
              {item.status === 'processing' && (
                <span
                  className="absolute flex align-items-center gap-1 px-3 py-1"
                  style={{
                    right: 0,
                    bottom: 0,
                    background: 'var(--primary-color, #4166A9)',
                    color: '#fff',
                    borderRadius: '1rem 0 0 0',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    zIndex: 2,
                  }}
                >
                  <i className="pi pi-spin pi-cog" style={{ color: '#fff', fontSize: '1rem' }} />
                  Processing
                </span>
              )}
              {item.status === 'available' && item.is_giveaway && (
                <span
                  className="absolute flex align-items-center gap-1 px-3 py-1"
                  style={{
                    right: 0,
                    bottom: 0,
                    background: 'var(--primary-color, #4166A9)',
                    color: '#fff',
                    borderRadius: '1rem 0 0 0',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    zIndex: 2,
                  }}
                >
                  <i className="pi pi-gift" style={{ color: '#fff', fontSize: '1rem' }} />
                  Free
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}