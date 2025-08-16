"use client";

import { useState, useRef } from "react";
import Head from "next/head";
import LayoutWithNav from "@/components/layoutWithNav";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { CldImage } from "next-cloudinary";
import { Dropdown } from "primereact/dropdown";
import { sendContactMessage } from "@/services/contactService";
import { Message } from "primereact/message";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactUsPage() {
  const [form, setForm] = useState({ name: "", email: "", reason: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const RECAPTCHA_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const recaptchaRef = useRef(null);

  const reasons = [
    { label: "General Inquiry", value: "general" },
    { label: "Support", value: "support" },
    { label: "Feedback", value: "feedback" },
    { label: "Partnership", value: "partnership" },
    { label: "Other", value: "other" },
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = (e) => {
    setForm({ ...form, reason: e.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Get ReCAPTCHA token
      const recaptchaToken = await recaptchaRef.current.executeAsync();
      recaptchaRef.current.reset();

      // Send form data with ReCAPTCHA token
      await sendContactMessage({ ...form, recaptcha_token: recaptchaToken });
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to send message.");
    } finally {
      setLoading(false);
    }
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
            <div className="mt-4 space-y-2">
              <div className="text-gray-700">
                <span className="font-semibold">Email:</span>{" "}
                <a href="mailto:support@swopvend.com" className="text-primary underline">support@swopvend.com</a>
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">Facebook:</span>{" "}
                <a href="https://www.facebook.com/profile.php?id=61578159959527" target="_blank" rel="noopener noreferrer" className="text-primary underline">facebook.com/SwopVend</a>
              </div>
            </div>
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
        <section className="flex flex-column lg:flex-row gap-6">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-2">Get in touch with us!</h2>
            <p className="text-lg mb-4">
              Please use the form below to contact us. Select the reason for your message and provide as much detail as possible. Our team will respond as soon as possible.
            </p>
          </div>
          <div className="flex-1">
            <div className="p-fluid pr-0 md:pr-6">
              {submitted ? (
                <Message severity="success" text="Thank you for contacting us! We’ll get back to you soon." className="mb-4" />
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Message severity="error" text={error} className="mb-3" />
                  )}
                  <div className="field">
                    <label htmlFor="name" className="font-medium">Name</label>
                    <InputText
                      id="name"
                      name="name"
                      className="py-3 px-2 text-lg"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="email1" className="font-medium">Email</label>
                    <InputText
                      id="email1"
                      name="email"
                      className="py-3 px-2 text-lg"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="reason" className="font-medium">Reason for Contact</label>
                    <Dropdown
                      id="reason"
                      name="reason"
                      value={form.reason}
                      options={reasons}
                      onChange={handleDropdownChange}
                      placeholder="Select a reason"
                      className="py-3 px-2 text-lg w-full"
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="message" className="font-medium">Message</label>
                    <InputTextarea
                      id="message"
                      name="message"
                      rows={6}
                      autoResize
                      className="py-3 px-2 text-lg"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Invisible ReCAPTCHA */}
                  {RECAPTCHA_KEY && (
                    <ReCAPTCHA
                      sitekey={RECAPTCHA_KEY}
                      size="invisible"
                      ref={recaptchaRef}
                    />
                  )}

                  <Button
                    label={loading ? "Sending..." : "Send Message"}
                    icon="pi pi-send"
                    className="swop-button-primary w-auto"
                    type="submit"
                    disabled={loading}
                  />
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </LayoutWithNav>
  );
}