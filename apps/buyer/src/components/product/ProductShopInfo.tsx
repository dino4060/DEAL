'use client';
import { RESOURCES } from "@/lib/constants";
import { getFileUrl } from "@/lib/files";
import { TShop, TShopLean } from "@/types/shop.types";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

const imageUrls = [
  '/images/bottle.jpg',
  '/images/camera.jpg',
  '/images/clock.jpg',
  '/images/cup.jpg',
  '/images/lamp.jpg',
  '/images/mouse.jpg',
  '/images/oil.jpg',
  '/images/watch.jpg',
  '/images/ring (2).jpg',
  '/images/headphones (2).jpg',
];

type TProductShopInfoProps = {
  shop: TShopLean;
}

export const ProductShopInfo = ({ shop }: TProductShopInfoProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft ?? 0));
    setScrollLeft(scrollRef.current?.scrollLeft ?? 0);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // tốc độ kéo
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 divide-y divide-gray-200">
      {/* Shop info */}
      <div className="pb-4 flex justify-between items-center">
        {/* Shop image */}
        <div className="flex justify-start items-center gap-4">
          <Image
            src={getFileUrl(shop.photo, RESOURCES.SHOPS.BASE, shop.id)} //'/images/star.jpg'
            alt='Shop Avatar'
            width={80}
            height={80}
            className="w-20 h-20 object-cover rounded-full border border-gray-200"
          />

          <div className="text-gray-500 text-sm space-y-1">
            {/* Shop name */}
            <div className="text-black text-lg font-semibold">
              {shop.name}
            </div>
            {/* Ship highlights */}
            <div className="flex items-center gap-2">
              <div className="bg-black text-white font-medium px-1 rounded flex">
                Mall
              </div>
              <div className="bg-green-100 text-black font-medium px-1 rounded flex items-center gap-0.5">
                <Star className="w-4 h-4 text-green-500" fill="currentColor" />
                4.9
              </div>
              <div>
                28.7K sold
              </div>
            </div>
            {/* Another highlight */}
            <div className="">
              <span className="text-black font-medium">1331 </span>
              returning customer
            </div>
          </div>
        </div>

        {/* Shop actions */}
        <div className="flex flex-col justify-center items-center gap-2">
          <Link
            href={`/shops/${shop.id}`}
            className="px-6 rounded bg-gray-200 text-base font-semibold"
          >
            Visit
          </Link>
          <button className="px-6 rounded bg-gray-200 text-base font-semibold">
            Chat
          </button>
        </div>
      </div>

      {/* Products from the shop */}
      <div className="pt-4 space-y-4">
        <div className="text-gray-500 text-sm font-medium">
          More from this shop
        </div>

        {/* todo: custom hook grab an overflow-x list */}
        <div
          className="overflow-x-auto scrollbar-hidden cursor-grab active:cursor-grabbing flex gap-3 select-none"
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {imageUrls.map((url) => (
            <div
              key={url}
              className="w-26 space-y-2"
            >
              {/* STANDARD: use the Next Image */}
              {/* Product image */}
              <div className="w-26 aspect-square relative">
                <Image
                  src={url}
                  alt='Other projects'
                  fill
                  draggable={false}
                  className="object-cover rounded-lg"
                />
              </div>

              {/* Product price */}
              <div>
                <div className="text-sm font-medium truncate">
                  {/* Todo: create a "cover price" method */}
                  ₫299.000
                </div>
                <div className="px-1 rounded bg-red-100 text-red-500 text-[12px] font-semibold inline-flex items-center">
                  -63%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};