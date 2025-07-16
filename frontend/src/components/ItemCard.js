import Image from 'next/image';

export default function ItemCard({ image, title, location, description, onClick }) {
  return (
    <div className="col-6 lg:col-4 xl:col-3">
      <div className="p-2">
        <div className="shadow-2 p-4 surface-card border-round">
          <div className="relative mb-3">
            <span className="surface-0 font-medium font-italic text-600 shadow-2 px-3 py-2 absolute" style={{ borderRadius: '1.5rem', left: '1rem', top: '1rem' }}>{location}</span>
            <img src={ image} className="w-full" />
          </div>
          <div className="flex justify-content-between align-items-center mb-3">
            <span className="text-700 font-medium text-xl">{title}</span>
            <span>
              <i className="pi pi-star-fill text-yellow-500 mr-1"></i>
              <span className="font-medium">5.0</span>
            </span>
          </div>
          {/* <p className="mt-0 mb-3 text-600 line-height-3">
            Enim nec dui nunc mattis enim ut tellus. Tincidunt arcu.
          </p> */}
        </div>
      </div>
    </div>
  );
}