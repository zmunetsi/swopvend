import { Tag } from "primereact/tag";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import { classNames } from 'primereact/utils';
import { useRouter } from "next/navigation";
import { CldImage } from 'next-cloudinary';

export default function ItemDetail({ item, showSwapButton = true }) {
  if (!item) return null;
  const router = useRouter();

  const [selectedImageIndex1, setSelectedImageIndex1] = useState(0);
  const images1 = item.extra_images || [
    'assets/images/blocks/ecommerce/productoverview1.jpg',
    'assets/images/blocks/ecommerce/productoverview2.jpg',
  ]

  console.log('ItemDetail', item);
  return (

    <div className="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div className="grid">
        <div className="col-12 lg:col-6">
          <CldImage
            width={400}
            height={600}
            src={item.featured_image_public_id}
            alt={item.title}
            crop="fill"          // Cloudinary will deliver a 400×300 image
            className="object-cover mb-5"
          />
          <div className="grid">
            {
              images1.map((image, i) => {
                return <div className='col-3' >
                  <CldImage
                    width={150}
                    height={150}
                    crop="fit"
                    src={image.image_public_id}
                    alt={image.image_public_id}
                    className={classNames('object-cover cursor-pointer border-2 border-round border-transparent transition-colors transition-duration-150', { 'border-primary': selectedImageIndex1 === i })}
                    onClick={() => setSelectedImageIndex1(i)} /> </div>
              })
            }
          </div>
        </div>
        <div className="col-12 lg:col-6 py-3 lg:pl-6">
          <div>
            <h1 className="mb-2 text-primary">{item.title}</h1>
          </div>
          <div className="flex align-items-center mb-4">
            <Tag value={item.category} severity="info" className="mr-2" />
          </div>
          <div>
            <h2 className="mb-2-">Location</h2>
            <p className="mt-2  text-gray-600">{item.location}</p>
          </div>
          <div>
            <h2 className="mb-2">Preferred Item to Swap</h2>
            <p className="mt-2  text-gray-600">{item.preferred_item}</p>
          </div>
          <div>
            <h2 className="mb-2">Description</h2>
            <p className="mt-2  text-gray-600">{item.description}</p>
          </div>

          <Button
            icon="pi pi-spinner"
            className="w-full mb-5"
            label="Propose a Swap" disabled={!showSwapButton}
            onClick={() => router.push(`/swaps/propose/${item.id}`)}
          />
          <Divider />
          <div className="flex align-items-center justify-content-center text-900 mb-5">
            <i className="pi pi-users mr-3"></i>
            <span><b>12 people</b> are looking at this right now.</span>
          </div>
        </div>
      </div>
    </div>

  );
}

