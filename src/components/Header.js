import React, { useState, useEffect } from 'react';
import './Header.scss';
import crocsLogo from '../image/crocslogo.png'; 
import icon1 from '../image/icon1.png';
import icon2 from '../image/icon2.png';
import icon3 from '../image/icon3.png';

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {

      if (window.scrollY > 120) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
     
      <div className="brand-intro-area">
        <img src={crocsLogo} alt="crocs brand site" className="brand-intro-area__logo" />
      </div>


      <header className={`sticky-header ${isSticky ? 'is-active' : ''}`}>
        <div className="sticky-header__inner">

          <div className="sticky-header__left">
            <a href="/" className="sticky-header__logo-link">
              <img src={crocsLogo} alt="crocs sticky" className="sticky-header__logo-img" />
            </a>
          </div>


          <div className="sticky-header__right">
  <a href="#" className="sticky-header__icon-btn">
    <img src={icon3} alt="장바구니" />
  </a>
  <a href="#" className="sticky-header__icon-btn">
    <img src={icon2} alt="로그인" />
  </a>
  <a href="#" className="sticky-header__icon-btn">
    <img src={icon1} alt="검색" />
  </a>
</div>
        </div>
      </header>
    </>
  );
};

export default Header;