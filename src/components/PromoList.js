import React from 'react';
import './PromoList.scss';
import promo1 from '../image/promo1.png';
import promo2 from '../image/promo2.png';
import promo3 from '../image/promo3.png';

const promoItems = [
  { id: 1, src: promo1, title: 'KBO x 크록스 지비츠', sub: '컬렉션 쇼핑하기' },
  { id: 2, src: promo2, title: '엄브로 x 크록스', sub: '컬렉션 쇼핑하기' },
  { id: 3, src: promo3, title: '에코 컬렉션', sub: '컬렉션 쇼핑하기' },
];

export default function PromoList() {
  return (
    <section className="promo-list">
      {promoItems.map((item, index) => (
        <div
            key={item.id}
            className="promo-list__item"
            onClick={() => alert('준비 중입니다.')}
        >
          <div className="promo-list__img-box">
            <img src={item.src} alt={item.title} />
          </div>
          <div className="promo-list__text">
            <p className="promo-list__title">{item.title}</p>
            <p className="promo-list__sub">{item.sub}</p>
          </div>
        </div>
      ))}
    </section>
  );
}