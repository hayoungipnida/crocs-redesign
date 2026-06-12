import React, { useEffect, useRef } from 'react';
import './ShoeList.scss';
import shoe1 from '../image/shoe1.png';
import shoe2 from '../image/shoe2.png';
import shoe3 from '../image/shoe3.png';
import shoe4 from '../image/shoe4.png';
import shoe5 from '../image/shoe5.png';
import shoe6 from '../image/shoe6.png';

export default function ShoeList() {
  const scrollRef = useRef(null);
  const animRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);
  const isPaused = useRef(false);

  const shoes = [
    { name: '클래식 클로그', src: shoe1 },
    { name: '크래프티드 클로그', src: shoe2 },
    { name: '에코 클로그', src: shoe3 },
    { name: '베이 클로그', src: shoe4 },
    { name: '크록밴드 클로그', src: shoe5 },
    { name: '크러쉬 클로그', src: shoe6 },
  ];

  const infiniteShoes = [...shoes, ...shoes];


  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const ITEM_WIDTH = 150 + 20; 
    const INTERVAL_MS = 2000;    // 몇 ms마다 이동할지 (속도 조절)

    const slide = () => {
      if (isPaused.current || isDragging.current) return;

      const nextScroll = el.scrollLeft + ITEM_WIDTH;

     
      if (nextScroll >= el.scrollWidth / 2) {
        el.scrollLeft = 0;
      } else {
        el.scrollTo({ left: nextScroll, behavior: 'smooth' });
      }
    };

    const interval = setInterval(slide, INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);


  const onMouseDown = (e) => {
    isDragging.current = true;
    isPaused.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeftRef.current - (x - startX.current);
  };

  const onMouseUp = () => {
    isDragging.current = false;
    scrollRef.current.style.cursor = 'grab';
    // 1.5초 후 자동 슬라이드 재개
    setTimeout(() => { isPaused.current = false; }, 1500);
  };

  // 터치 스크롤
  const onTouchStart = (e) => {
    isPaused.current = true;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const onTouchMove = (e) => {
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeftRef.current - (x - startX.current);
  };

  const onTouchEnd = () => {
    setTimeout(() => { isPaused.current = false; }, 1500);
  };

  return (
    <section className="shoe-list">
      <h2 className="shoe-list__title">신자마자 딱 내 스타일</h2>
      <p className="shoe-list__subtitle">내게 꼭 맞는 스타일을 찾아보세요.</p>

      <div className="shoe-list__scroll-wrapper">
        <div
          className="shoe-list__container"
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {infiniteShoes.map((shoe, index) => (
            <div className="shoe-list__item" key={index}>
              <div className="shoe-list__image-box">
                <img src={shoe.src} alt={shoe.name} draggable={false} />
              </div>
              <p className="shoe-list__name">{shoe.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}