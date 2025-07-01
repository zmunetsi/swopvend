"use client"

import Head from "next/head";
import LayoutWithNav from "@/components/layoutWithNav";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { CldImage } from "next-cloudinary";

export default function AboutUsPage() {
  return (
    <LayoutWithNav>
      <Head>
        <title>About Us | SwopVend</title>
        <meta name="description" content="Learn about SwopVend's mission, story, and values. Join our community and start swapping today!" />
      </Head>
      <div className="flex flex-column gap-6 px-4 py-6 lg:px-8">

        {/* Hero Section */}
        <section className="flex flex-column lg:flex-row align-items-center justify-content-between gap-6">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-3">Built by SwopVend. For the Community.</h1>
            <p className="text-lg mb-4">
              SwopVend isn't just an app — it's a mindset. We're here to make swapping the new normal — because the future doesn’t need more waste, it needs smarter choices.
            </p>
            <Button
              label="Start Swapping"
              className="p-button-raised p-button-primary"
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
        <section className="flex flex-column lg:flex-row align-items-center gap-6">
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
            <h2 className="text-3xl font-semibold mb-2">Why We Built SwopVend</h2>
            <p className="text-base">
              We saw perfectly good items gathering dust. We saw families spending on what others were giving away.
              So we built SwopVend — to simplify swapping, and bring value back to the community.
            </p>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="bg-white/80 rounded-lg shadow-md p-4 sm:p-8 mb-10">
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1 flex flex-col items-center">
              <span className="text-lg font-semibold mb-1">Sustainability</span>
              <span className="text-gray-600 text-center">We promote reuse and reducing waste for a better future.</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="text-lg font-semibold mb-1">Community</span>
              <span className="text-gray-600 text-center">We believe in building connections and trust through swapping.</span>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <span className="text-lg font-semibold mb-1">Integrity</span>
              <span className="text-gray-600 text-center">We operate honestly and transparently in all we do.</span>
            </div>
          </div>
        </section>

        {/* Community Testimonials Section */}
        <section className="grid grid-nogutter md:grid-cols-3 gap-4" style={{ background: 'url("assets/images/home/testimonials-4.png") no-repeat', backgroundSize: 'cover' }}>
          <div className="flex flex-column lg:flex-row">
            <div className="flex-1 pr-0 lg:pr-6 pb-6 lg:pb-0 px-4">
              <h2 className="mb-2 text-2xl font-bold">Join the swapping community.</h2>
              <span className="mt-2 text-xl text-gray-600 line-height-3">People are sharing great stories about us. Join our social platforms.</span>
              <div className="mt-5">
                <Button
                  label="Facebook"
                  className="font-bold"
                  onClick={() => window.open("https://facebook.com/yourpage", "_blank")}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
                <img src="assets/images/home/avatar-f-1.png" className="w-5rem" alt="Jane Cooper" />
                <div className="ml-4 mt-4 md:mt-0">
                  <p className="mt-0 mb-3 line-height-3">No matter where you go, Blocks is the coolest, most happening thing around! We can't understand how we've been living without Blocks.</p>
                  <div className="text-primary font-medium mb-1 text-right">Jane Cooper</div>
                  <div className="text-600 text-sm text-right">Belton, Inc</div>
                </div>
              </div>
              <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
                <img src="assets/images/home/avatar-m-5.png" className="w-5rem" alt="Floyd Miles" />
                <div className="ml-4 mt-4 md:mt-0">
                  <p className="mt-0 mb-3 line-height-3">We can't understand how we've been living without Blocks. Blocks impressed me on multiple levels. It's really wonderful.</p>
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

      </div>
    </LayoutWithNav>
  );
}