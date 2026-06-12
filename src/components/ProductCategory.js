import React, { useState, useRef } from 'react';
import './ProductCategory.scss';
import shoe1 from '../image/shoe1.png';
import shoe2 from '../image/shoe2.png';
import shoe3 from '../image/shoe3.png';
import shoe4 from '../image/shoe4.png';
import shoe5 from '../image/shoe5.png';
import shoe6 from '../image/shoe6.png';

const categories = ['전체', '신제품', '인기상품', '콜라보', '세일'];

const products = [
  { id: 1, name: '클래식 클로그', price: '₩49,900 ~ 69,900', src: shoe1, category: '인기상품' },
  { id: 2, name: '크래프티드 클로그', price: '₩59,900 ~ 79,900', src: shoe2, category: '신제품' },
  { id: 3, name: '에코 클로그', price: '₩49,900 ~ 69,900', src: shoe3, category: '베스트' },
  { id: 4, name: '베이 클로그', price: '₩49,900 ~ 69,900', src: shoe4, category: '세일' },
  { id: 5, name: '크록밴드 클로그', price: '₩49,900 ~ 69,900', src: shoe5, category: '신제품' },
  { id: 6, name: '크러쉬 클로그', price: '₩49,900 ~ 69,900', src: shoe6, category: '베스트' },
];


export default function ProductCategory() {
  const [active, setActive] = useState('전체');
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const filtered = active === '전체'
    ? products
    : products.filter((p) => p.category === active);

  /* ── 드래그 스크롤 ── */
  const onMouseDown = (e) => {
    isDragging.current = true;
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
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };

  return (
    <section className="product-section">
      <h2 className="product-section__title">크록스 둘러보기</h2>

      {/* 필터 바 */}
      <div className="category-bar">
        <div
          className="category-bar__scroll"
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-bar__btn ${active === cat ? 'category-bar__btn--active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <button className="category-bar__filter">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="14" y2="12" />
            <line x1="4" y1="18" x2="10" y2="18" />
          </svg>
        </button>
      </div>

      {/* 상품 그리드 */}
      <div className="product-grid">
        {filtered.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => alert('준비 중입니다.')}
          >
            <div className="product-card__img-box">
              <img src={product.src} alt={product.name} />
            </div>
            <p className="product-card__name">{product.name}</p>
            <p className="product-card__price">{product.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}