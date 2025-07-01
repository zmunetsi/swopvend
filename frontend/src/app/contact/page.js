"use client";

import Head from "next/head";
import LayoutWithNav from "@/components/layoutWithNav";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useState } from "react";

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
            <img
              src="/assets/images/home/contact_us_illustration.png"
              alt="Contact SwopVend"
              className="w-96 max-w-full"
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
      </div>
    </LayoutWithNav>
  );
}