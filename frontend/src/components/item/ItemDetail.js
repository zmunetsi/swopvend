import { useState } from "react";
import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { classNames } from 'primereact/utils';
import { useRouter, usePathname } from "next/navigation";
import { CldImage } from 'next-cloudinary';
import Link from "next/link";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

const conditionStyles = {
  New: {
    background: 'var(--green-100, #D1FADF)',
    color: 'var(--green-900, #027A48)'
  },
  Used: {
    background: 'var(--blue-100, #D1E9FF)',
    color: 'var(--blue-900, #175CD3)'
  },
  Refurbished: {
    background: 'var(--yellow-100, #FEF9C3)',
    color: 'var(--yellow-900, #B45309)'
  },
  Damaged: {
    background: 'var(--red-100, #FEE2E2)',
    color: 'var(--red-900, #B91C1C)'
  }
};

export default function ItemDetail({ item, showSwapButton = true }) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedImageIndex1, setSelectedImageIndex1] = useState(0);
  if (!item) return null;

  // Ensure featured image is always first
  const images1 = [
    item.featured_image_public_id,
    ...(item.extra_images || [])
  ];

  return (
    <div className="surface-section">
      <div className="grid">
        {/* Desktop layout */}
        <div className="col-12 lg:col-6 hidden md:flex surface-card p-3 border-round">
          {/* Sidebar thumbnails */}
          <div className="flex flex-column align-items-center mr-3" style={{ minWidth: '70px' }}>
            {images1.map((image, i) => {
              const src = image.image_public_id || image;
              const alt = image.image_public_id || `extra-image-${i}`;
              return (
                <div className="mb-2" key={src}>
                  <CldImage
                    width={60}
                    height={60}
                    crop="fit"
                    src={src}
                    alt={alt}
                    className={classNames(
                      'object-cover cursor-pointer border-2 border-round border-transparent transition-colors transition-duration-150',
                      { 'border-primary': selectedImageIndex1 === i }
                    )}
                    onClick={() => setSelectedImageIndex1(i)}
                  />
                </div>
              );
            })}
          </div>
          {/* Main image */}
          <div className="relative flex-1">
            <span
              className={`font-bold font-italic text-sm shadow-2 px-3 py-2 absolute`}
              style={{
                borderRadius: '1.5rem',
                left: '1rem',
                top: '1rem',
                background: conditionStyles[item.condition]?.background || 'var(--surface-0, #fff)',
                color: conditionStyles[item.condition]?.color || 'var(--primary-color, #4166A9)',
                zIndex: 2,
              }}
            >
              {item.condition}
            </span>
            {item.status === 'given' && (
              <span
                className="absolute flex align-items-center gap-1 px-3 py-1"
                style={{
                  right: 0,
                  bottom: 36,
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
                  bottom: 36,
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
                  bottom: 36,
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
            <CldImage
              width={663}
              height={400}
              src={images1[selectedImageIndex1]?.image_public_id || images1[selectedImageIndex1] || item.featured_image_public_id}
              alt={item.title}
              crop="fill"
              className="object-cover mb-5 w-full"
            />
          </div>
        </div>
        {/* Mobile layout */}
        <div className="col-12 flex flex-column align-items-center surface-card p-3 border-round flex md:hidden">
          {/* Main image */}
          <div className="relative w-full mb-3">
            <span
              className={`font-bold font-italic text-sm shadow-2 px-3 py-2 absolute`}
              style={{
                borderRadius: '1.5rem',
                left: '1rem',
                top: '1rem',
                background: conditionStyles[item.condition]?.background || 'var(--surface-0, #fff)',
                color: conditionStyles[item.condition]?.color || 'var(--primary-color, #4166A9)',
                zIndex: 2,
              }}
            >
              {item.condition}
            </span>
            {item.status === 'given' && (
              <span
                className="absolute flex align-items-center gap-1 px-3 py-1"
                style={{
                  right: 0,
                  bottom: 36,
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
                  bottom: 36,
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
                  bottom: 36,
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
            <CldImage
              width={400}
              height={240}
              src={images1[selectedImageIndex1]?.image_public_id || images1[selectedImageIndex1] || item.featured_image_public_id}
              alt={item.title}
              crop="fill"
              className="object-cover w-full"
            />
          </div>
          {/* Thumbnails horizontal */}
          <div className="flex flex-row gap-2 justify-content-center w-full mb-3">
            {images1.map((image, i) => {
              const src = image.image_public_id || image;
              const alt = image.image_public_id || `extra-image-${i}`;
              return (
                <div key={src}>
                  <CldImage
                    width={48}
                    height={48}
                    crop="fit"
                    src={src}
                    alt={alt}
                    className={classNames(
                      'object-cover cursor-pointer border-2 border-round border-transparent transition-colors transition-duration-150',
                      { 'border-primary': selectedImageIndex1 === i }
                    )}
                    onClick={() => setSelectedImageIndex1(i)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* Details section with light background */}
        <div className="col-12 lg:col-6 py-3 lg:pl-6 surface-ground p-4 border-round">
          <div className="font-medium text-3xl text-900 mb-3">{item.title}</div>
          <div className="text-500 mb-5">{item.description}</div>
          <ul className="list-none p-0 m-0 border-top-1 surface-border">
            <li className="flex align-items-center py-3 px-2 flex-wrap surface-ground">
              <div className="text-500 w-full md:w-4 font-medium">Location</div>
              <div className="text-900 w-full md:w-8">{ item.location }</div>
            </li>
            <li className="flex align-items-center py-3 px-2 flex-wrap surface-ground">
              <div className="text-500 w-full md:w-4 font-medium">Preferred item to swap</div>
              <div className="text-900 w-full md:w-8">{ item.preferred_item }</div>
            </li>
            <li className="flex align-items-center py-3 px-2 flex-wrap surface-ground">
              <div className="text-500 w-full md:w-4 font-medium">Condition</div>
              <div className="text-900 w-full md:w-8">{ item.condition }</div>
            </li>
            <li className="flex align-items-center py-3 px-2 flex-wrap surface-ground">
              <div className="text-500 w-full md:w-4 font-medium">Category</div>
              <div className="text-900 w-full md:w-8">{ item.category }</div>
            </li>
            <li className="flex align-items-center py-3 px-2 flex-wrap surface-ground">
              <div className="text-500 w-full md:w-4 font-medium">Posted date</div>
              <div className="text-900 w-full md:w-8">
                {item.created_at ? dayjs(item.created_at).fromNow() : ''}
              </div>
            </li>
          </ul>

          <Link
            href={`/account/swaps/propose/${item.id}?next=${encodeURIComponent(pathname)}`}
            className="block"
            tabIndex={-1}
          >
            <Button
              icon="pi pi-spinner"
              className="swop-button-primary w-full mb-5"
              label="Propose a Swap"
              disabled={!showSwapButton}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

