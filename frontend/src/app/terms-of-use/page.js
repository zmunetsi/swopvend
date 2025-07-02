"use client";

import Head from "next/head";
import LayoutWithNav from "@/components/layoutWithNav";

export default function TermsOfUsePage() {
  return (
    <LayoutWithNav>
      <Head>
        <title>Terms of Use | SwopVend</title>
        <meta name="description" content="Read the terms of use for SwopVend. Understand your rights and responsibilities as a user of our platform." />
      </Head>
      <div className="flex flex-column gap-6 px-4 py-6 lg:px-8 max-w-3xl mx-auto">
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Terms of Use</h1>
          <p className="text-lg text-gray-700 mb-6">
            Welcome to SwopVend! Please read these Terms of Use carefully before using our platform. By accessing or using SwopVend, you agree to be bound by these terms.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
          <p>
            By creating an account or using SwopVend, you agree to comply with and be legally bound by these Terms of Use and our Privacy Policy.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">2. User Responsibilities</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide accurate and up-to-date information when registering and listing items.</li>
            <li>Use SwopVend for lawful purposes only.</li>
            <li>Respect other users and communicate honestly and respectfully.</li>
            <li>Do not post prohibited, illegal, or offensive items.</li>
            <li>Arrange swaps safely and responsibly; SwopVend is not responsible for in-person meetings.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-2">3. Prohibited Activities</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>No fraudulent, misleading, or illegal activity.</li>
            <li>No harassment, abuse, or threats to other users.</li>
            <li>No posting of stolen, counterfeit, or prohibited items.</li>
            <li>No spamming or unauthorized advertising.</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-6 mb-2">4. Account Termination</h2>
          <p>
            SwopVend reserves the right to suspend or terminate your account at any time for violations of these terms or for any other reason at our discretion.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">5. Limitation of Liability</h2>
          <p>
            SwopVend is a platform for connecting users to swap items. We do not guarantee the quality, safety, or legality of items listed. Users are responsible for their own transactions and interactions.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">6. Changes to Terms</h2>
          <p>
            We may update these Terms of Use from time to time. Continued use of SwopVend after changes means you accept the new terms.
          </p>
          <h2 className="text-2xl font-semibold mt-6 mb-2">7. Contact</h2>
          <p>
            If you have any questions about these Terms of Use, please <a href="/contact-us" className="text-primary underline">contact us</a>.
          </p>
        </section>
      </div>
    </LayoutWithNav>
  );
}