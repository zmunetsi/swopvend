"use client"

import Head from "next/head";
import LayoutWithNav from "@/components/layoutWithNav";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { CldImage } from "next-cloudinary";
import FooterCTA from "@/components/FooterCTA";

export default function AboutUsPage() {
  return (
    <LayoutWithNav>
      <Head>
        <title>About Us | SwopVend</title>
        <meta name="description" content="Learn about SwopVends mission, story, and values. Join our community and start swapping today!" />
      </Head>

      {/* Hero Section */}
      <section className="p-3 md:py-6 md:px-6 lg:px-8 flex flex-column lg:flex-row align-items-center justify-content-between gap-6">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-3">Built by SwopVend. For the Community.</h1>
          <p className="text-lg mb-4 text-gray-600 line-height-3">
            SwopVend isnt just an app — its a mindset. We are here to make swapping the new normal — because the future doesn’t need more waste, it needs smarter choices.
          </p>
          <Button
            label="Start Swapping"
            className="swop-button-primary p-button-raised p-button-primary"
            onClick={() => window.location.href = "/login?next=/account/items/upload"}
          />
        </div>
        <div className="flex-1">
          <CldImage
            src="swopvend_about_hero_fndymf"
            alt="People swapping items"
            width={646}
            height={500}
            sizes="100vw"
            crop="fill"
            className="border-round w-full"
          />
        </div>
      </section>

      {/* Why We Built SwopVend */}
      <section className="p-3 md:py-2 md:px-6 lg:px-8 flex flex-column lg:flex-row align-items-center gap-6">
        <div className="flex-1">
          <CldImage
            src="mission_umdwmg"
            alt="Swapping and sustainability"
            width={646}
            height={500}
            crop="fill"
            sizes="100vw"
            className="border-round w-full"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-3">Why We Built SwopVend</h2>
          <p className="text-lg text-gray-600 line-height-3">
            We saw perfectly good items gathering dust. We saw families spending on what others were giving away.
            So we built SwopVend — to simplify swapping, and bring value back to the community.
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="p-3 md:py-6 md:px-6 lg:px-8 bg-white/80 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6
        ">Our Values</h2>
        <div className="flex flex-column md:flex-row gap-6 justify-content-center">
          <div className="flex-1 flex flex-column items-center bg-white border-round shadow-1 p-5 min-w-[220px]">
            <span className="pi pi-sync text-4xl text-primary mb-3 text-center"></span>
            <span className="text-lg font-semibold mb-2 text-center">Sustainability</span>
            <span className="text-gray-600 text-center">We promote reuse and reducing waste for a better future.</span>
          </div>
          <div className="flex-1 flex flex-column items-center bg-white border-round shadow-1 p-5 min-w-[220px]">
            <span className="pi pi-users text-4xl text-primary mb-3 text-center"></span>
            <span className="text-lg font-semibold mb-2 text-center">Community</span>
            <span className="text-gray-600 text-center">We believe in building connections and trust through swapping.</span>
          </div>
          <div className="flex-1 flex flex-column items-center bg-white border-round shadow-1 p-5 min-w-[220px]">
            <span className="pi pi-check-circle text-4xl text-primary mb-3 text-center"></span>
            <span className="text-lg font-semibold mb-2 text-center">Integrity</span>
            <span className="text-gray-600 text-center">We operate honestly and transparently in all we do.</span>
          </div>
        </div>
      </section>

      {/* Community Testimonials Section */}
      <section className="p-3 md:py-6 md:px-6 lg:px-8">
        <div className="flex flex-column lg:flex-row">
          <div className="flex-1 pr-0 lg:pr-6 pb-6 lg:pb-0 px-1">
            <h2 className="mb-2 text-2xl font-bold">Join the swapping community.</h2>
            <span className="mt-2 text-lg text-gray-600 line-height-3">People are sharing great stories about us. Join our social platforms.</span>
            <div className="mt-5">
              <Button
                label="Facebook" className="swop-button-primary font-bold"
                onClick={() => window.open('https://www.facebook.com/profile.php?id=61578159959527', '_blank')}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
              <img src="/assets/images/home/daniel_avatar_round.png" className="w-5rem" alt="Jane Cooper" />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">I got a laptop in exchange for my old monitor. Best decision ever!</p>
                <div className="text-primary font-medium mb-1 text-right">Daniel</div>
                <div className="text-600 text-sm text-right">SwopVend User from Leeds</div>
              </div>
            </div>
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
              <img src="/assets/images/home/lisa_avatar.png" className="w-5rem" alt="Floyd Miles" />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">This is what I have been looking for all along. I am now able to get rid of junky inside my house while saving.</p>
                <div className="text-primary font-medium mb-1 text-right">Lara</div>
                <div className="text-600 text-sm text-right">SwopVend Manchester</div>
              </div>
            </div>
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
              <img src="/assets/images/home/peter_avatar.png" className="w-5rem" alt="Peter" />
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