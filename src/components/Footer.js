import React, { useState } from 'react';
import './Footer.scss';
import cover1 from '../image/cover1.png';
import cover2 from '../image/cover2.png';
import cover3 from '../image/cover3.png';
import cover4 from '../image/cover4.png';

const Footer = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuData = [
    {
      id: 'benefits',
      title: '크록스 혜택',
      image: cover1,
      items: [
        '크록스 클럽 15% 할인 쿠폰',
        '콜라보레이션 / 리미티드 에디션',
        '세일 상품 최대 50% 할인'
      ]
    },
    {
      id: 'company',
      title: '회사',
      image: cover2,
      items: [
        '회사 소개',
        '지속 가능성',
        '지구',
        '사람',
        '커뮤니티'
      ]
    },
    {
      id: 'cs',
      title: '고객센터',
      image: cover4,
      items: [
        '자주 묻는 질문들',
        '주문조회',
        '접근성',
        '출고 및 배송',
        '교환',
        '반품',
        '취소',
        '크록스 사이즈 변환표'
      ]
    },
    {
      id: 'hours',
      title: '고객센터 운영 시간',
      image: cover1,
      items: [
        { type: 'title', text: '업무 시간' },
        { type: 'content', text: '월 - 금 : 오전 10시 - 오후 5시' },
        { type: 'title', text: '점심시간' },
        { type: 'content', text: '오후 12시 - 1시' },
        { type: 'link', text: '빠른이메일고객상담' }
      ]
    },
    {
      id: 'crocs',
      title: 'CROCS',
      image: cover3,  
      items: [
        '개인 정보 보호 설정',
        '개인정보 처리방침',
        '이용약관',
        '크록스코리아 주식회사 서울시 강남구 테헤란로 410 (대치동 889-13) 금강타워 6층',
        '대표: 양승준',
        '사업자등록번호: 106-86-52611',
        '통신판매업신고번호: 제2008-서울강남-1684호'
      ]
    }
  ];

  const handleToggle = (id) => {
    setActiveMenu(prev => (prev === id ? null : id));
  };

  return (
    <footer className="footer">
      <div className="footer__accordion">
        {menuData.map((menu) => {
          const isOpen = activeMenu === menu.id;

          return (
            <div key={menu.id} className={`footer__section ${isOpen ? 'is-open' : ''}`}>
              <button
                className="footer__title-btn"
                onClick={() => handleToggle(menu.id)}
              >
                {menu.title}

                {/* 팝업 이미지 — title-btn 안에 위치 */}
                {isOpen && menu.image && (
                  <div
                    className="footer__popup"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      handleToggle(menu.id);
                    }}
                  >
                    <img src={menu.image} alt={menu.title} className="footer__popup-img" />
                  </div>
                )}
              </button>

              <div className="footer__content">
                <ul className="footer__list">
                  {menu.items.map((item, index) => {
                    if (menu.id === 'hours') {
                      if (item.type === 'title' || item.type === 'content') {
                        return (
                          <li key={index} className={`footer__item footer__item--${item.type}`}>
                            {item.text}
                          </li>
                        );
                      }
                      return (
                        <li key={index} className="footer__item footer__item--link">
                          <a href="#" className="footer__link">{item.text}</a>
                        </li>
                      );
                    }

                    if (menu.id === 'crocs') {
                      if (index < 3) {
                        return (
                          <li key={index} className="footer__item">
                            <a href="#" className="footer__link">{item}</a>
                          </li>
                        );
                      }
                      if (index === 3) {
                        return (
                          <div key={index} className="footer__info-group">
                            <span className="footer__info-text">{menu.items[3]}</span>
                            <span className="footer__info-text">{menu.items[4]}</span>
                            <span className="footer__info-text">{menu.items[5]}</span>
                            <span className="footer__info-text">{menu.items[6]}</span>
                          </div>
                        );
                      }
                      return null;
                    }

                    return (
                      <li key={index} className="footer__item">
                        <a href="#" className="footer__link">{item}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </footer>
  );
};

export default Footer;