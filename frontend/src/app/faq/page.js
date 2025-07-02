"use client";

import Head from "next/head";
import LayoutWithNav from "@/components/layoutWithNav";
import { useState } from "react";

const faqs = [
  {
    question: "Do I have to pay to swap items?",
    answer: "No, SwopVend is completely free to use. You simply list your item and swap with others in the community—no money needed!",
  },
  {
    question: "How do I know if an item is available for swap?",
    answer: "Each listing shows its current status. If you see an item you like, you can message the owner to confirm availability and arrange a swap.",
  },
  {
    question: "Is it safe to meet other users?",
    answer: "We recommend meeting in public places and bringing a friend if possible. Always communicate through the platform for your safety.",
  },
  {
    question: "What if I can't find a swap right away?",
    answer: "New items are added all the time! Keep checking back, or try listing more items to increase your chances of finding a match.",
  },
  {
    question: "Can I swap multiple items at once?",
    answer: "Yes! You can arrange multi-item swaps by chatting with other users and agreeing on the details together.",
  },
  {
    question: "How do I report a problem or user?",
    answer: "You can report issues directly from the item or user profile page, or contact our support team via the Contact Us page.",
  },
  {
    question: "Can I delete my account?",
    answer: "Yes, you can delete your account from your account settings page at any time.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <LayoutWithNav>
      <Head>
        <title>FAQs | SwopVend</title>
        <meta name="description" content="Frequently asked questions about SwopVend. Learn how swapping works, safety tips, and more." />
      </Head>
      <div className="flex flex-column gap-6 px-4 py-6 lg:px-8 max-w-3xl mx-auto">
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-700 mb-6">
            Find answers to the most common questions about SwopVend. If you can't find what you're looking for, please <a href="/contact-us" className="text-primary underline">contact us</a>.
          </p>
          <div className="divide-y divide-gray-200 bg-white rounded-lg shadow">
            {faqs.map((faq, idx) => (
              <div key={idx}>
                <button
                  className="w-full text-left px-5 py-4 focus:outline-none hover:bg-gray-50 flex justify-between items-center"
                  onClick={() => toggle(idx)}
                  aria-expanded={openIndex === idx}
                  aria-controls={`faq-panel-${idx}`}
                >
                  <span className="font-medium text-lg text-900">{faq.question}</span>
                  <span className="ml-4 text-primary">{openIndex === idx ? "-" : "+"}</span>
                </button>
                {openIndex === idx && (
                  <div
                    id={`faq-panel-${idx}`}
                    className="px-5 pb-4 text-gray-700 text-base"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </LayoutWithNav>
  );
}