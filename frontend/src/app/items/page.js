"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Image from "next/image";

import LayoutWithNav from "@/components/layoutWithNav";
import ItemCard from "@/components/item/ItemCard";
import { fetchAllItems } from "@/services/itemService";

// Wrap ItemsPage in Suspense to fix useSearchParams warning
export default function ItemsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ItemsPage />
    </Suspense>
  );
}

function ItemsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cityParam = searchParams.get("city");

  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState(cityParam || null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchAllItems();
        setItems(data);
        setFiltered(data);
      } catch (err) {
        setError("Failed to fetch items.");
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  // Update selectedCity if cityParam changes
  useEffect(() => {
    if (cityParam) setSelectedCity(cityParam);
  }, [cityParam]);

  useEffect(() => {
    let filteredItems = [...items];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredItems = filteredItems.filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(term)) ||
          (item.description && item.description.toLowerCase().includes(term))
      );
    }

    if (selectedCity) {
      filteredItems = filteredItems.filter(
        (item) => item.city === selectedCity || item.city_detail?.name === selectedCity
      );
    }

    if (selectedCategory) {
      filteredItems = filteredItems.filter(
        (item) => item.category === selectedCategory
      );
    }

    setFiltered(filteredItems);
  }, [searchTerm, selectedCity, selectedCategory, items]);

  // Get unique cities from items
  const cities = [
    ...new Set(
      items
        .map((item) => item.city_detail?.name || item.city)
        .filter(Boolean)
    ),
  ].map((city) => ({
    label: city,
    value: city,
  }));

  const categories = [
    ...new Set(items.map((item) => item.category).filter(Boolean)),
  ].map((cat) => ({
    label: cat,
    value: cat,
  }));

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCity(null);
    setSelectedCategory(null);
  };

  return (
    <LayoutWithNav>
      <Head>
        <title>Browse Items | SwopVend</title>
        <meta name="description" content="Discover the latest items available for swapping on SwopVend." />
      </Head>
      {/* Hero Section */}
      <section className="bg-gray-900 px-4 py-2 md:px-6 lg:px-8">
        <img
          src="/assets/images/items/swopvend_items_banner.png"
          alt="SwopVend items banner"
          width={1200}
          height={300}
          className="w-full h-auto"
          priority
        />
      </section>
      <section id="items-listings" className="px-4 py-4 md:px-6 lg:px-8">
        <div className="mb-3 flex justify-content-between align-items-center">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Browse items</h2>
            <p className="mt-2 text-xl text-gray-600">Discover the latest items available for swapping.</p>
          </div>
        </div>

        
        {/* 🔍 Filter Panel */}
        <div className="grid grid-nogutter align-items-center">
          <div className="flex-auto lg:flex-1 mb-3 lg:mt-0 w-full mr-0 lg:mr-4 text-900">
            <InputText
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              aria-label="Search items"
            />
          </div>
          <div className="flex-auto lg:flex-1 mb-3 lg:mt-0 w-full mr-0 lg:mr-4 text-900">
            <Dropdown
              value={selectedCity}
              options={cities}
              onChange={(e) => setSelectedCity(e.value)}
              placeholder="Filter by city"
              className="w-full"
              showClear
              aria-label="Filter by city"
            />
          </div>
          <div className="flex-auto lg:flex-1 mb-3 lg:mt-0 w-full mr-0 lg:mr-4 text-900">
            <Dropdown
              value={selectedCategory}
              options={categories}
              onChange={(e) => setSelectedCategory(e.value)}
              placeholder="Filter by category"
              className="w-full"
              showClear
              aria-label="Filter by category"
            />
          </div>
          <div className="flex-auto lg:flex-1 mb-3 lg:mt-0 w-full mr-0 lg:mr-4 text-900o">
            <Button
              label="Clear Filters"
              onClick={clearFilters}
              outlined
              className="w-full md:w-auto"
              aria-label="Clear Filters"
            />
          </div>
        </div>

        {/* Responsive Grid for Items */}
        {loading ? (
          <div className="text-center text-gray-400 py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-8">No items found.</div>
            ) : (
              filtered.map((item) => (
                <ItemCard
                  key={item.slug || item.id}
                  item={item}
                  onClick={() => router.push(`/items/${item.slug || item.id}`)}
                />
              ))
            )}
          </div>
        )}
      </section>
      {/* Testimonials Section */}
      <section
        style={{
          background: 'url("/assets/images/home/testimonials-4.png") no-repeat',
          backgroundSize: "cover",
        }}
        className="px-4 py-8 md:px-6 lg:px-8"
      >
        <div className="flex flex-column lg:flex-row">
          <div className="flex-1 pr-0 lg:pr-6 pb-6 lg:pb-0 px-4">
            <h2 className="mb-2 text-2xl font-bold">Join the swapping community.</h2>
            <span className="mt-2 text-xl text-gray-600 line-height-3">
              Sign up today to start swapping and save while making mother nature happy by recycling.
            </span>
            <div className="mt-5">
              <Button
                label="Sign up"
                className="font-bold"
                onClick={() => router.push("/signup")}
                aria-label="Sign up"
              />
            </div>
          </div>
          <div className="flex-1">
            <div
              className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5"
              style={{ borderRadius: "10px" }}
            >
              <Image
                src="/assets/images/home/avatar-f-1.png"
                alt="Jane Cooper testimonial"
                width={80}
                height={80}
                className="w-5rem h-5rem object-cover rounded-full"
              />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">
                  No matter where you go, Blocks is the coolest, most happening thing around! We can&apos;t understand how we&apos;ve been living without Blocks.
                </p>
                <div className="text-primary font-medium mb-1 text-right">Jane Cooper</div>
                <div className="text-600 text-sm text-right">Belton, Inc</div>
              </div>
            </div>
            <div
              className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5"
              style={{ borderRadius: "10px" }}
            >
              <Image
                src="/assets/images/home/avatar-m-5.png"
                alt="Floyd Miles testimonial"
                width={80}
                height={80}
                className="w-5rem h-5rem object-cover rounded-full"
              />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">
                  We can&apos;t understand how we&apos;ve been living without Blocks. Blocks impressed me on multiple levels. It&apos;s really wonderful.
                </p>
                <div className="text-primary font-medium mb-1 text-right">Floyd Miles</div>
                <div className="text-600 text-sm text-right">Belton, Inc</div>
              </div>
            </div>
            <div
              className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start"
              style={{ borderRadius: "10px" }}
            >
              <Image
                src="/assets/images/home/avatar-f-2.png"
                alt="Leslie Alexander testimonial"
                width={80}
                height={80}
                className="w-5rem h-5rem object-cover rounded-full"
              />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">
                  Just what I was looking for. I would like to personally thank you for your outstanding product.
                </p>
                <div className="text-primary font-medium mb-1 text-right">Leslie Alexander</div>
                <div className="text-600 text-sm text-right">Alfred, Inc</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </LayoutWithNav>
  );
}
