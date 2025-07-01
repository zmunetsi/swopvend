"use client";

import Head from "next/head";
import LayoutWithNav from "@/components/layoutWithNav";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { CldImage } from "next-cloudinary";

export default function HowItWorksPage() {
  return (
    <LayoutWithNav>
      <Head>
        <title>How It Works | SwopVend</title>
        <meta name="description" content="Learn how SwopVend makes swapping easy, sustainable, and fun. See how to list, discover, and swap items in your community." />
      </Head>
      <div className="flex flex-column gap-6 px-4 py-6 lg:px-8">

        {/* Hero Section */}
        <section className="flex flex-column lg:flex-row align-items-center justify-content-between gap-6">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-3">How SwopVend works.</h1>
            <p className="text-lg mb-4">
              Its easy to swap your items and find what you need.
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
              crop="fill"
              className="border-round w-full"
            />
          </div>
        </section>

        <section className="flex flex-column lg:flex-row align-items-center gap-4">
          <div className="flex-1">
            <img src="/assets/images/home/upload_with_primary_bg.png" alt="Upload your item" className="w-full" />
            <div className="mt-3 mb-2 font-medium text-primary text-xl">List Your Item</div>
            <span className="text-700 line-height-3">Upload your old item you want to swap.</span>
          </div>
          <div className="flex-1">
            <img src="/assets/images/home/swap_with_primary_bg.png" alt="Find a swap" className="w-full" />
            <div className="mt-3 mb-2 font-medium text-primary text-xl">Find a Swap</div>
            <span className="text-700 line-height-3">Search for already uploaded items. You could find an item available to swap with.</span>
          </div>
          <div className="flex-1">
            <img src="/assets/images/home/make_deal_with_primary_bg.png" alt="Make a deal" className="w-full" />
            <div className="mt-3 mb-2 font-medium text-primary text-xl">Make a Deal</div>
            <span className="text-700 line-height-3">Declare your intention to swap. The swap is complete when agreement is reached.</span>
          </div>
        </section>
        {/* FAQS */}
        <section className="flex flex-column lg:flex-row align-items-center">
          <div className="flex-1">
            <div className="mb-1 flex justify-content-between align-items-center">
              <div>
                <h2 className="mb-2 text-2xl font-bold">Frequently Asked Questions</h2>
                <p className="mt-2 text-xl text-gray-600">Here are answers to some common questions about using SwopVend.</p>
              </div>
              <div>
                <Button
                  label="Contact us"
                  icon="pi pi-envelope"
                  iconPos="right"
                  className="font-light text-sm text-primary"
                  text
                  onClick={() => window.location.href = "/contact"}
                />
              </div>
            </div>

            <div className="grid mt-6">
              <div className="col-12 text-900 md:col-6 font-medium text-lg line-height-3">
                Do I have to pay to swap items?
              </div>
              <div className="col-12 md:col-6 text-700 line-height-3">
                No, SwopVend is completely free to use. You simply list your item and swap with others in the community—no money needed!
              </div>
            </div>
            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
            <div className="grid">
              <div className="col-12 text-900 md:col-6 font-medium text-lg line-height-3">
                How do I know if an item is available for swap?
              </div>
              <div className="col-12 md:col-6 text-700 line-height-3">
                Each listing shows its current status. If you see an item you like, you can message the owner to confirm availability and arrange a swap.
              </div>
            </div>
            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
            <div className="grid">
              <div className="col-12 text-900 md:col-6 font-medium text-lg line-height-3">
                Is it safe to meet other users?
              </div>
              <div className="col-12 md:col-6 text-700 line-height-3">
                We recommend meeting in public places and bringing a friend if possible. Always communicate through the platform for your safety.
              </div>
            </div>
            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
            <div className="grid">
              <div className="col-12 text-900 md:col-6 font-medium text-lg line-height-3">
                What if I cant find a swap right away?
              </div>
              <div className="col-12 md:col-6 text-700 line-height-3">
                New items are added all the time! Keep checking back, or try listing more items to increase your chances of finding a match.
              </div>
            </div>
            <hr className="my-3 mx-0 border-top-1 border-none surface-border" />
            <div className="grid">
              <div className="col-12 text-900 md:col-6 font-medium text-lg line-height-3">
                Can I swap multiple items at once?
              </div>
              <div className="col-12 md:col-6 text-700 line-height-3">
                Yes! You can arrange multi-item swaps by chatting with other users and agreeing on the details together.
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button
                label="See more FAQs"
                icon="pi pi-chevron-right"
                iconPos="right"
                className="p-button-text font-light text-sm text-primary"
                onClick={() => window.location.href = "/faq"}
              />
            </div>
          </div>
        </section>

      </div>
    </LayoutWithNav>
  );
}