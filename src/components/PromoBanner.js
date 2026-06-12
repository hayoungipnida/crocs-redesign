import React, { useMemo, useState } from 'react';
import './PromoBanner.scss';
import banner1 from '../image/midbanner1.png';
import banner2 from '../image/midbanner2.png';

export default function PromoBanner() {
  const banners = [banner1, banner2];


  const [randomBanner] = useState(() => {
  return banners[Math.floor(Math.random() * banners.length)];
});

  return (
    <section className="promo-banner">
      <img src={randomBanner} alt="프로모션 배너" className="promo-banner__img" />
    </section>
  );
}