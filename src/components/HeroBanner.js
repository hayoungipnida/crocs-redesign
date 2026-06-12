import { useState, useEffect, useRef } from 'react';
import './HeroBanner.scss'; 
import banner1 from '../image/banner1.png';
import banner2 from '../image/banner2.png';
import banner3 from '../image/banner3.png';

export default function HeroBanner() {

  const slides = [{ src: banner1, link: '' },
    { src: banner2, link: '' },
    { src: banner3, link: '' }];
  const displaySlides = [slides[slides.length - 1], ...slides, slides[0]];
  
  const [currentSlide, setCurrentSlide] = useState(1); 
  const [isTransitioning, setIsTransitioning] = useState(true);


  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleNext = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    if (currentSlide === displaySlides.length - 1) {
      setCurrentSlide(1);
    } else if (currentSlide === 0) {
      setCurrentSlide(displaySlides.length - 2);
    }
  };

  return (
    <div className="hero-banner">
      <div 
        className="hero-banner__slider" 
        style={{ 
          transform: `translateX(-${(currentSlide / displaySlides.length) * 100}%)`,
          transition: isTransitioning ? 'transform 0.6s ease-in-out' : 'none'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {displaySlides.map((slide, index) => (
          <div className="hero-banner__slide" key={index}>
            <a href={slide.link} className="hero-banner__link">
              <img src={slide.src} alt={`배너 ${index + 1}`} />
            </a>
          </div>
        ))}
      </div>

      <div className="hero-banner__indicators">
        {slides.map((_, index) => (
          <span 
            key={index}
            className={`hero-banner__bar ${index === currentSlide - 1 ? 'hero-banner__bar--active' : ''}`}
            onClick={() => {
                setIsTransitioning(true);
                setCurrentSlide(index + 1);
            }}
          />
        ))}
      </div>
    </div>
  );
}