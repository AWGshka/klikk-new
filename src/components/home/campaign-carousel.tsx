"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Campaign = { name: string; image: string };

export function CampaignCarousel({ campaigns }: { campaigns: Campaign[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isResetting, setIsResetting] = useState(false);
  const slides =
    campaigns.length > 1 ? [...campaigns, campaigns[0]] : campaigns;

  useEffect(() => {
    if (
      campaigns.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const timer = window.setInterval(() => {
      setIsResetting(false);
      setActiveIndex((current) =>
        current >= campaigns.length - 1 ? campaigns.length : current + 1,
      );
    }, 5500);
    return () => window.clearInterval(timer);
  }, [campaigns.length]);

  if (campaigns.length === 0) return null;
  return (
    <section
      className="page-container campaign-carousel"
      aria-roledescription="carousel"
      aria-label="Klikk offers"
    >
      <div
        className="campaign-track"
        style={{
          transform: `translateX(-${activeIndex * 100}%)`,
          transition: isResetting ? "none" : undefined,
        }}
        onTransitionEnd={() => {
          if (activeIndex === campaigns.length) {
            setIsResetting(true);
            setActiveIndex(0);
          }
        }}
      >
        {slides.map((campaign, index) => (
          <div className="campaign-slide" key={`${campaign.image}-${index}`}>
            <Image
              src={campaign.image}
              alt={campaign.name}
              fill
              loading={index === 0 ? "eager" : "lazy"}
              sizes="100vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
