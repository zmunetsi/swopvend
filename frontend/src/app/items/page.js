"use client";

import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";

import LayoutWithNav from "@/components/layoutWithNav";
import ItemCard from "@/components/item/ItemCard";
import { fetchAllItems } from "@/services/itemService";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = await fetchAllItems();
        setItems(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to fetch items:", err);
      }
    };
    loadItems();
  }, []);

  useEffect(() => {
    let filteredItems = [...items];

    if (searchTerm) {
      filteredItems = filteredItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLocation) {
      filteredItems = filteredItems.filter(
        (item) => item.location === selectedLocation
      );
    }

    if (selectedCategory) {
      filteredItems = filteredItems.filter(
        (item) => item.category === selectedCategory
      );
    }

    setFiltered(filteredItems);
  }, [searchTerm, selectedLocation, selectedCategory, items]);

  const locations = [...new Set(items.map((item) => item.location))].map((loc) => ({
    label: loc,
    value: loc,
  }));

  const categories = [...new Set(items.map((item) => item.category))].map((cat) => ({
    label: cat,
    value: cat,
  }));

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedLocation(null);
    setSelectedCategory(null);
  };

  return (
    <LayoutWithNav>
      {/* add hero here with background */}
      <section className="bg-gray-900 px-4 py-2 md:px-6 lg:px-8">
        <img src="assets/images/items/swopvend_items_banner.png" alt="swapping image" className="w-full" />
      </section>
      <section id="items-listings" className="px-4 py-4 md:px-6 lg:px-8">
        <div className="mb-3 flex  justify-content-between align-items-center">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Browse items</h2>
            <p className="mt-2 text-xl text-gray-600">Discover the latest items available for swapping.</p>
          </div>
        </div>

        {/* 🔍 Filter Panel */}
        <div className="flex flex-col md:flex-row md:items-end gap-3">
          <span className="p-input-icon-left w-full md:w-1/3">
            <i className="pi pi-search" />
            <InputText
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </span>

          <Dropdown
            value={selectedLocation}
            options={locations}
            onChange={(e) => setSelectedLocation(e.value)}
            placeholder="Filter by location"
            className="w-full md:w-1/3"
            showClear
          />

          <Dropdown
            value={selectedCategory}
            options={categories}
            onChange={(e) => setSelectedCategory(e.value)}
            placeholder="Filter by category"
            className="w-full md:w-1/3"
            showClear
          />

          <Button
            label="Clear Filters"
            onClick={clearFilters}
            outlined
            className="w-full md:w-auto"
          />
        </div>

        {/*  Data View */}
        <DataView
          value={filtered}
          layout="grid"
          itemTemplate={(item) => (
            <ItemCard item={item} />
          )}
          paginator
          rows={16}
          emptyMessage="No items found."
        />
      </section>
      <section style={{ background: 'url("assets/images/home/testimonials-4.png") no-repeat', backgroundSize: 'cover' }} className="px-4 py-8 md:px-6 lg:px-8">
        <div className="flex flex-column lg:flex-row">
          <div className="flex-1 pr-0 lg:pr-6 pb-6 lg:pb-0 px-4">
            <h2 className="mb-2 text-2xl font-bold">Join the swapping community.</h2>
            <span className="mt-2 text-xl text-gray-600 line-height-3">Sign up today to start swapping and save while making mother nature happy by recycling.</span>
            <div className="mt-5">
              <Button label="Sign up" className="font-bold" />
            </div>
          </div>
          <div className="flex-1">
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
              <img src="assets/images/home/avatar-f-1.png" className="w-5rem" />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">No matter where you go, Blocks is the coolest, most happening thing around! We can't understand how we've been living without Blocks.</p>
                <div className="text-primary font-medium mb-1 text-right">Jane Cooper</div>
                <div className="text-600 text-sm text-right">Belton, Inc</div>
              </div>
            </div>
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start mb-5" style={{ borderRadius: '10px' }}>
              <img src="assets/images/home/avatar-m-5.png" className="w-5rem" />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">We can't understand how we've been living without Blocks. Blocks impressed me on multiple levels. It's really wonderful.</p>
                <div className="text-primary font-medium mb-1 text-right">Floyd Miles</div>
                <div className="text-600 text-sm text-right">Belton, Inc</div>
              </div>
            </div>
            <div className="surface-card shadow-2 p-4 flex flex-column align-items-center md:flex-row md:align-items-start" style={{ borderRadius: '10px' }}>
              <img src="assets/images/home/avatar-f-2.png" className="w-5rem" />
              <div className="ml-4 mt-4 md:mt-0">
                <p className="mt-0 mb-3 line-height-3">Just what I was looking for. I would like to personally thank you for your outstanding product.</p>
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
