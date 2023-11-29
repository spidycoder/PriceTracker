"use client";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const heroImage = [
  { imageUrl: "/assets/images/hero-1.svg", alt: "smartwatch" },
  { imageUrl: "/assets/images/hero-2.svg", alt: "bag" },
  { imageUrl: "/assets/images/hero-3.svg", alt: "lamp" },
  { imageUrl: "/assets/images/hero-4.svg", alt: "air-fryer" },
  { imageUrl: "/assets/images/hero-5.svg", alt: "chair" },
];
const HeroCarousel = () => {
  return (
    <div className="hero-carousel">
      <Carousel
        showArrows={false}
        showStatus={false}
        autoPlay
        showThumbs={false}
        interval={2000}
        infiniteLoop
      >
        {heroImage.map((products) => (
          <Image
            src={products.imageUrl}
            alt={products.alt}
            key={products.alt}
            className="object-contain"
            width={484}
            height={484}
          />
        ))}
      </Carousel>
      <Image
        src="/assets/icons/hand-drawn-arrow.svg"
        alt="arrow"
        width={175}
        height={175}
        className="max-xl:hidden absolute -left-[15%] z-0 bottom-3"
      />
    </div>
  );
};

export default HeroCarousel;