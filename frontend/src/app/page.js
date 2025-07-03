import LayoutWithNav from '@/components/layoutWithNav';
import { Button } from 'primereact/button';
import HomeListings from '@/components/HomeListings';

export default function HomePage() {
  return (
    <LayoutWithNav>
      <section className="bg-gray-900 p-2 md:py-8 md:pt-8 md:px-6 lg:px-8">
        <div className="flex flex-wrap">
          <div className="w-12 lg:w-6 p-4">
            <h1 className="text-6xl font-bold mt-0 mb-3">Swap and Save </h1>
            <p className="text-3xl text-gray-400 mt-0 mb-5">Exchange items you no longer need for something new.</p>
            <Button label="Start swapping" className="font-bold" />
          </div>
          <div className="w-12 lg:w-6 text-center lg:text-right overflow-hidden">
            <img src="assets/images/home/swap-2.png" alt="swapping image" className="w-full" />
          </div>
        </div>
      </section>
      <section id="home-recent-listings" className="p-2 md:py-6 md:px-6 lg:px-8">
        <div className="mb-1 px-4 flex  justify-content-between align-items-center">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Recent Listings</h2>
            <p className="mt-2 text-xl text-gray-600">Discover the latest items available for swapping.</p>
          </div>
          <div>
            <Button label="Browse more" icon="pi pi-chevron-right" iconPos="right" className='font-light text-sm text-primary' text />
          </div>
        </div>
        <HomeListings />
      </section>
      <section id="home-howit-works" className="p-2 md:py-8 md:px-6 lg:px-8">
        <div className="mb-1 px-4 flex  justify-content-between align-items-center">
          <div>
            <h2 className="mb-2 text-2xl font-bold">How it works</h2>
            <p className="mt-2 text-xl text-gray-600">A simple and secure way to swap items.</p>
          </div>
          <div>
            <Button label="Start swapping" icon="pi pi-chevron-right" iconPos="right" className='font-light text-sm text-primary' text />
          </div>
        </div>
        <div className="flex flex-wrap px-3">
          <div className="w-full lg:w-6 xl:w-4 p-2">
            <img src="assets/images/home/upload_with_primary_bg.png" alt="Image" className="w-full" />
            <div className="mt-3 mb-2 font-medium text-primary text-xl">List Your Item</div>
            <span className="text-700 line-height-3">Upload your old item you want to swap.</span>
          </div>
          <div className="w-full lg:w-6 xl:w-4 p-2">
            <img src="assets/images/home/swap_with_primary_bg.png" alt="Image" className="w-full" />
            <div className="mt-3 mb-2 font-medium text-primary text-xl">Find a Swap</div>
            <span className="text-700 line-height-3">Search for already uploaded items. You could find an item available to swap with.</span>
          </div>
          <div className="w-full lg:w-6 xl:w-4 p-2">
            <img src="assets/images/home/make_deal_with_primary_bg.png" alt="Image" className="w-full" />
            <div className="mt-3 mb-2 font-medium text-primary text-xl">Make a Deal</div>
            <span className="text-700 line-height-3">Declare your intention to swap. The swap is complete when agreement is reached.</span>
          </div>
        </div>
      </section>

      <section style={{ background: 'url("assets/images/home/testimonials-4.png") no-repeat', backgroundSize: 'cover' }} className="p-2 md:py-8 md:px-6 lg:px-8">
        <div className="flex flex-column lg:flex-row">
          <div className="flex-1 pr-0 lg:pr-6 pb-6 lg:pb-0 px-4">
            <h2 className="mb-2 text-2xl font-bold">Join the swapping community.</h2>
            <span className="mt-2 text-xl text-gray-600 line-height-3">People are sharing great stories about us. Join our social platforms.</span>
           <div className="mt-5">
            <Button label="Facebook" className="font-bold" />
          </div>
          </div>
          <div className="flex-1">
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
              <img src="assets/images/home/avatar-f-1.png" className="w-5rem" alt="Jane Cooper" />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">No matter where you go, Blocks is the coolest, most happening thing around! We can&apos;t understand how we&apos;ve been living without Blocks.</p>
                <div className="text-primary font-medium mb-1 text-right">Jane Cooper</div>
                <div className="text-600 text-sm text-right">Belton, Inc</div>
              </div>
            </div>
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
              <img src="assets/images/home/avatar-m-5.png" className="w-5rem" alt="Floyd Miles" />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">We can&apos;t understand how we&apos;ve been living without Blocks. Blocks impressed me on multiple levels. It&apos;s really wonderful.</p>
                <div className="text-primary font-medium mb-1 text-right">Floyd Miles</div>
                <div className="text-600 text-sm text-right">Belton, Inc</div>
              </div>
            </div>
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start" style={{ borderRadius: '10px' }}>
              <img src="assets/images/home/avatar-f-2.png" className="w-5rem" alt="Leslie Alexander" />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">Just what I was looking for. I would like to personally thank you for your outstanding product.</p>
                <div className="text-primary font-medium mb-1 text-right">Leslie Alexander</div>
                <div className="text-600 text-sm text-right">Alfred, Inc</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutWithNav>
  );
}
