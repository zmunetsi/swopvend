"use client";

import { useState } from "react";
import Head from "next/head";
import LayoutWithNav from "@/components/layoutWithNav";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { CldImage } from "next-cloudinary";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend or email service
    setSubmitted(true);
  };

  return (
    <LayoutWithNav>
      <Head>
        <title>Contact Us | SwopVend</title>
        <meta name="description" content="Contact the SwopVend team with your questions, feedback, or support requests." />
      </Head>
      <div className="flex flex-column gap-6 px-4 py-6 lg:px-8">
        {/* Hero Section */}
        <section className="flex flex-column lg:flex-row align-items-center justify-content-between gap-6">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
            <p className="text-lg mb-4">
              Have a question, suggestion, or need help? Reach out to the SwopVend team and we’ll get back to you as soon as possible.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
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

        {/* Contact Form Section */}
        <section className="bg-white/80 rounded-lg shadow-md p-4 sm:p-8 mb-10 max-w-2xl mx-auto">
          <h2 className="mb-4 text-2xl font-bold text-center">Send us a message</h2>
          {submitted ? (
            <div className="text-green-700 text-center text-lg font-medium py-8">
              Thank you for contacting us! We’ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <span className="p-float-label">
                <InputText
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
                <label htmlFor="name">Your Name</label>
              </span>
              <span className="p-float-label">
                <InputText
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
                <label htmlFor="email">Your Email</label>
              </span>
              <span className="p-float-label">
                <InputTextarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  className="w-full"
                  rows={5}
                  required
                />
                <label htmlFor="message">Message</label>
              </span>
              <Button
                type="submit"
                label="Send Message"
                className="p-button-raised p-button-primary mt-2"
              />
            </form>
          )}
        </section>

        {/* Additional Contact Info */}
        <section className="flex flex-column items-center text-center gap-2">
          <div className="text-xl font-semibold mb-1">Other ways to reach us</div>
          <div className="text-gray-700">
            Email: <a href="mailto:support@swopvend.com" className="text-primary">support@swopvend.com</a>
          </div>
          <div className="text-gray-700">
            Facebook: <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-primary">facebook.com/yourpage</a>
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
                  label="See more FAQs"
                  icon="pi pi-chevron-right"
                  iconPos="right"
                  className="p-button-text font-light text-sm text-primary"
                  onClick={() => window.location.href = "/faq"}
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