"use client";

import Head from "next/head";
import LayoutWithNav from "@/components/layoutWithNav";

export default function PrivacyPolicyPage() {
  return (
    <LayoutWithNav>
      <Head>
        <title>Privacy Policy | SwopVend</title>
        <meta name="description" content="Read SwopVends privacy policy. Learn how we collect, use, and protect your personal information." />
      </Head>
      <div className="flex flex-column gap-6 px-4 py-6 lg:px-8 max-w-3xl mx-auto">
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-lg text-gray-700 mb-6">
            Your privacy is important to us. This Privacy Policy explains how SwopVend collects, uses, and protects your information when you use our platform.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Account information: name, email address, and password.</li>
            <li>Profile details: location, profile photo, and items you list.</li>
            <li>Usage data: how you interact with SwopVend, including messages and swaps.</li>
            <li>Device and log information: IP address, browser type, and device identifiers.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and improve our services.</li>
            <li>To communicate with you about your account or activity.</li>
            <li>To personalize your experience on SwopVend.</li>
            <li>To ensure safety and prevent fraud.</li>
            <li>To comply with legal obligations.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-2">3. Sharing Your Information</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>We do not sell your personal information.</li>
            <li>We may share information with service providers who help us operate SwopVend.</li>
            <li>We may disclose information if required by law or to protect our users and platform.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-2">4. Data Security</h2>
          <p>
            We use industry-standard security measures to protect your information. However, no method of transmission over the Internet is 100% secure.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">5. Your Choices</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>You can update or delete your account information at any time in your account settings.</li>
            <li>You may opt out of marketing emails by following the unsubscribe instructions in those emails.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-2">6. Childrens Privacy</h2>
          <p>
            SwopVend is not intended for children under 13. We do not knowingly collect personal information from children under 13.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on this page.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please <a href="/contact-us" className="text-primary underline">contact us</a>.
          </p>
        </section>
      </div>
    </LayoutWithNav>
  );
}