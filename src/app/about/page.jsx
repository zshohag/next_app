import React from "react";

export const metadata = {
  title: {
    absolute: "About",
  },
  description: "About Page",
};

const AboutPage = () => {
  return (
    <div className="mb-8">
      <div className="text-xl mt-20 px-10  ">
        <h2 className="text-2xl font-bold text-center mb-4">About Us</h2>
        <p>
          At Z, we are passionate about bringing the latest and most innovative
          electronic gadgets right to your fingertips. Our mission is to provide
          tech enthusiasts and everyday users with a curated
        </p>
        <p className="mt-6">
          selection of high-quality gadgets that enhance your digital lifestyle.
          From cutting-edge smartphones and versatile laptops to smart home
          devices and accessories, Z is your one-stop destination for the best
          in modern technology. We believe that technology should be accessible,
          reliable,
        </p>
        <p className="mt-6">
          and exciting, and that is why we work hard to source products from
          trusted brands and emerging innovators. Whether you are looking to
          upgrade your home setup or searching for the latest tech trends, Z has
          you covered. Join us on a journey to discover the future of gadgets
          and elevate your tech game today with Z Aqua Essence! We believe that
          technology should be accessible, reliable, and exciting, and that is
          why we work
        </p>
        <p className="mt-4 py-6">
          hard to source products from trusted brands and emerging innovators.
          Whether you are looking to upgrade your home setup or searching for
          the latest tech trends, Z has you covered. Join us on a journey to
          discover the future of gadgets and elevate your tech game today with
          Z!
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
