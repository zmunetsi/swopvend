import React from 'react';
import { Card } from 'primereact/card';
import { Tag } from 'primereact/tag';
import { CldImage } from 'next-cloudinary';

const DemoItemCard = ({ item }) => {
  const {
    featured_image_public_id,
    name,
    description,
    distance,
    daysLeft
  } = item;

  return (
    <div className="col-6 lg:col-4 xl:col-3 border-bottom-1 surface-border md:border-bottom-none">
            <div className="p-2">
                <CldImage
                width={400}
                height={300}
                crop="fill"
                className="w-full h-full object-cover"
                src={item.featured_image_public_id}
                alt={item.title}
              />
                <div className="text-900 text-xl font-medium mb-2">$100.00</div>
                <div className="mb-2">
                    <span className="text-600 line-through">$150.00</span>
                    <span className="ml-2 text-pink-500 font-medium">%50</span>
                </div>
                <span className="text-900">Product Name</span>
            </div>
        </div>
  );
};

export default DemoItemCard;
