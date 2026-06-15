import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ShoeList from './components/ShoeList';
import ProductCategory from './components/ProductCategory';
import JibbitzCustomizer from './components/JibbitzCustomizer';
import './App.css';
import Footer from './components/Footer';
import IntroPage from './components/IntroPage';
import PromoBanner from './components/PromoBanner';
import promoBannerImg from './image/promobanner.png';
import PromoList from './components/PromoList';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  
  useEffect(() => {
    
   if (sessionStorage.getItem('introViewed')) {
   setShowIntro(false);
   return;
    }

   
    const timer = setTimeout(() => {
      setShowIntro(false);
      sessionStorage.setItem('introViewed', 'true'); 
    }, 10000);

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="App">
      {showIntro && <IntroPage />}

      {/* 메인 페이지 구성 요소들 */}
      <Header />
      <HeroBanner />
      <ShoeList />
      <PromoBanner />
      <ProductCategory />
      <JibbitzCustomizer/>
      <a href='#'><img src={promoBannerImg} alt="크록스 클럽 배너" style={{ width: '100%', display: 'block' }} /></a>
      
      <PromoList />
      <Footer />
    </div>
  );
}

export default App;