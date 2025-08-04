"use client";

import { useRouter } from 'next/navigation';
import LayoutWithNav from '@/components/layoutWithNav';
import { Button } from 'primereact/button';
import HomeListings from '@/components/HomeListings';
import cities from '@/data/cities.json';
import Link from 'next/link';
import FooterCTA from '@/components/FooterCTA';

export default function HomePage() {
  const router = useRouter();
  return (
    <LayoutWithNav>
      <section style={{ background: 'url("/assets/images/home/swopvend_hero_1920x600_more_left_space.webp") no-repeat', backgroundSize: 'cover' }} className="px-4 md:py-8 md:pt-8 md:px-6 lg:px-8">
        <div className="flex flex-wrap">
          <div className="w-12 lg:w-6 py-6">
            <h1 className="text-6xl font-bold mt-0 mb-3 text-primary">Swap and Save </h1>
            <p className="text-2xl text-gray-600 mt-0 mb-5">Exchange items you no longer need for something new.</p>
            <Button
              label="Start swapping"
              className="swop-button-primary font-bold"
              onClick={() => router.push('/account/items/upload')}
            />
          </div>
          <div className="w-12 lg:w-6 text-center lg:text-right overflow-hidden">

          </div>
        </div>
      </section>
      <section id="city-listings" className="px-3 md:py-6 md:px-6 lg:px-8">
        <div className="mb-1 flex  justify-content-between align-items-center">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Around your city</h2>
            <p className="mt-2 text-xl text-gray-600">Discover the latest items near you available for swapping.</p>
          </div>
          <div>
            <Button
              label="More cities"
              icon="pi pi-chevron-right"
              iconPos="right"
              className="swop-button-primary font-light text-sm"
              onClick={() => router.push('/items')}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-3 pt-3">
          {cities.map(city => (
            <Link
              key={city.name}
              href={city.url}
              className="flex flex-column h-25rem flex-grow-1 no-underline"
            >
              <div
                className="flex h-full bg-no-repeat bg-cover bg-center border-round shadow-2 lg:mx-0"
                style={{
                  background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.5) 100%), url(${city.image})`,
                  minWidth: '15rem'
                }}
              >
                <p className="font-medium text-2xl text-white text-center w-full align-self-end">{city.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section id="home-howit-works" className="px-3 md:py-2 md:px-6 lg:px-8">
        <div className="mb-1 px-1 flex  justify-content-between align-items-center">
          <div>
            <h2 className="mb-2 text-2xl font-bold">How it works</h2>
            <p className="mt-2 text-xl text-gray-600">A simple and secure way to swap items.</p>
          </div>
          <div>
            <Button
              label="Start swapping"
              icon="pi pi-chevron-right"
              iconPos="right"
              className="swop-button-primary font-light text-sm"
              onClick={() => router.push('/account/items/upload')}
            />
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-6 xl:w-4 p-2">
            <img src="assets/images/home/upload_with_primary_bg.png" alt="Image" className="w-full" />
            <div className="mt-3 mb-2 font-medium text-primary text-xl">List Your Item</div>
            <span className="text-700 line-height-3">Post your unwanted item and get it ready for swapping.</span>
          </div>
          <div className="w-full lg:w-6 xl:w-4 p-2">
            <img src="assets/images/home/swap_with_primary_bg.png" alt="Image" className="w-full" />
            <div className="mt-3 mb-2 font-medium text-primary text-xl">Find a Swap</div>
            <span className="text-700 line-height-3">Browse local listings to discover items you’d love to own.</span>
          </div>
          <div className="w-full lg:w-6 xl:w-4 p-2">
            <img src="assets/images/home/make_deal_with_primary_bg.png" alt="Image" className="w-full" />
            <div className="mt-3 mb-2 font-medium text-primary text-xl">Make a Deal</div>
            <span className="text-700 line-height-3">Chat and agree to a fair swap with another user near you.</span>
          </div>
        </div>
      </section>
      <section id="home-recent-listings" className="px-3 md:py-6 md:px-6 lg:px-8">
        <div className="mb-1 flex  justify-content-between align-items-center">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Just added</h2>
            <p className="mt-2 text-xl text-gray-600">Discover the latest items near you available for swapping.</p>
          </div>
          <div>
            <Button
              label="Browse more"
              icon="pi pi-chevron-right"
              iconPos="right"
              className="swop-button-primary font-light text-sm"
              onClick={() => router.push('/items')}
            />
          </div>
        </div>
        <HomeListings />
      </section>
      <section className="p-3 md:py-6 md:px-6 lg:px-8">
        <div className="flex flex-column lg:flex-row">
          <div className="flex-1 pr-0 lg:pr-6 pb-6 lg:pb-0 px-1">
            <h2 className="mb-2 text-2xl font-bold">Join the swapping community.</h2>
            <span className="mt-2 text-xl text-gray-600 line-height-3">People are sharing great stories about us. Join our social platforms.</span>
            <div className="mt-5">
              <Button
                label="Facebook" className="swop-button-primary font-bold"
                onClick={() => window.open('https://www.facebook.com/profile.php?id=61578159959527', '_blank')}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
              <img src="assets/images/home/daniel_avatar_round.png" className="w-5rem" alt="Jane Cooper" />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">I got a laptop in exchange for my old monitor. Best decision ever!</p>
                <div className="text-primary font-medium mb-1 text-right">Daniel</div>
                <div className="text-600 text-sm text-right">SwopVend User from Leeds</div>
              </div>
            </div>
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
              <img src="assets/images/home/lisa_avatar.png" className="w-5rem" alt="Floyd Miles" />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">This is what I have been looking for all along. I am now able to get rid of junky inside my house while saving.</p>
                <div className="text-primary font-medium mb-1 text-right">Lara</div>
                <div className="text-600 text-sm text-right">SwopVend Manchester</div>
              </div>
            </div>
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
              <img src="assets/images/home/peter_avatar.png" className="w-5rem" alt="Peter" />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">Swapping feels good. Less waste, more joy.</p>
                <div className="text-primary font-medium mb-1 text-right">Peter</div>
                <div className="text-600 text-sm text-right">SwopVend User from Crewe</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section >
        <FooterCTA />
      </section>
      
    </LayoutWithNav>
  );
}
