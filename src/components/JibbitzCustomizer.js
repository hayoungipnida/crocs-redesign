import React, { useState, useRef } from 'react';
import './JibbitzCustomizer.scss';

 import shoeImg from '../image/jibbitzshoe.png';
 import jibbitz1 from '../image/j1.png';
 import jibbitz2 from '../image/j2.png';
 import jibbitz3 from '../image/j3.png';
 import jibbitz4 from '../image/j4.png';
 import jibbitz5 from '../image/j5.png';
 import jibbitz6 from '../image/j6.png';
 import jibbitz7 from '../image/j7.png';
 import jibbitz8 from '../image/j8.png';
 import jibbitz9 from '../image/j9.png';
 import jibbitz10 from '../image/j10.png';
 import jibbitz11 from '../image/j11.png';
 import jibbitz12 from '../image/j12.png';
 import jibbitz13 from '../image/j13.png';
 import jibbitz14 from '../image/j14.png';
 import jibbitz15 from '../image/j15.png';

const jibbitzList = [
  { id: 1,  label: '버즈',   src: jibbitz1 },
  { id: 2,  label: '우슐라',     src: jibbitz2 },
  { id: 3,  label: '도리',   src: jibbitz3 },
  { id: 4,  label: '체리',       src: jibbitz4 },
  { id: 5,  label: '스누피',   src: jibbitz5 },
  { id: 6,  label: '키티',   src: jibbitz6 },
  { id: 7,  label: '케로피',   src: jibbitz7 },
  { id: 8,  label: '별',     src: jibbitz8 },
  { id: 9,  label: '딤섬', src: jibbitz9 },
  { id: 10, label: '음양',     src: jibbitz10 },
  { id: 11, label: '몬스터볼', src: jibbitz11 },
  { id: 12, label: '축구공',     src: jibbitz12 },
  { id: 13, label: '파르펠레',     src: jibbitz13 },
  { id: 14, label: '펜네',       src: jibbitz14 },
  { id: 15, label: '푸실리',   src: jibbitz15 },
];


const SLOTS = [
  { id: 0, top: '24%', left: '38%' },
  { id: 1, top: '15%', left: '54%' },
  { id: 2, top: '26%', left: '70%' },
  { id: 3, top: '37%', left: '24%' },
  { id: 4, top: '38%', left: '40%' },
  { id: 5, top: '31%', left: '55%' },
  { id: 6, top: '52%', left: '18%' },
  { id: 7, top: '53%', left: '33%' },
  { id: 8, top: '50%', left: '55%' },
  { id: 9, top: '43%', left: '72%' },
  { id: 10, top: '61%', left: '72%' },
  { id: 11, top: '69%', left: '18%' },
  { id: 12, top: '62%', left: '43%' },

];
const BIG_IDS = [5, 6, 7];

export default function JibbitzCustomizer() {
  const [slots, setSlots] = useState({});
  const [dragging, setDragging] = useState(null);
  const [preview, setPreview] = useState(null);
  const handleDragOver = (e) => e.preventDefault();

  // 그리드 → 슬롯
  const handleDragStart = (item) => setDragging({ item, fromSlot: null });

  // 슬롯 → 슬롯
  const handleSlotDragStart = (e, slotId) => {
    e.stopPropagation();
    if (slots[slotId]) {
      setDragging({ item: slots[slotId], fromSlot: slotId });
    }
  };

  const handleDrop = (e, slotId) => {
    e.preventDefault();
    if (!dragging) return;
    setSlots((prev) => {
      const next = { ...prev };
      if (dragging.fromSlot !== null) {
        delete next[dragging.fromSlot];
      }
      next[slotId] = dragging.item;
      return next;
    });
    setDragging(null);
  };

  const handleTouchEnd = (e, slotId) => {
    e.preventDefault();
    if (!dragging) return;
    setSlots((prev) => {
      const next = { ...prev };
      if (dragging.fromSlot !== null) {
        delete next[dragging.fromSlot];
      }
      next[slotId] = dragging.item;
      return next;
    });
    setDragging(null);
  };


  const handleSlotClick = (slotId) => {
    if (slots[slotId]) {
      setSlots((prev) => {
        const next = { ...prev };
        delete next[slotId];
        return next;
      });
    }
  };

  /* ── 리셋 ── */
  const handleReset = () => {
    setSlots({});
    setPreview(null);
  };

  return (
    <section className="jibbitz">
      <h2 className="jibbitz__title">지비츠로</h2>
      <span className="jibbitz__title2">나만의 크록스를 만들어보세요</span>

      <div className="jibbitz__shoe-wrap">
        <img src={shoeImg} alt="크록스" className="jibbitz__shoe-img" />

        {SLOTS.map((slot) => (
          <div
            key={slot.id}
            className={[
              'jibbitz__slot',
              slots[slot.id] ? 'jibbitz__slot--filled' : '',
              slots[slot.id] && BIG_IDS.includes(slots[slot.id].id) ? 'jibbitz__slot--big' : '',
            ].join(' ')}
            style={{ top: slot.top, left: slot.left }}
            draggable={!!slots[slot.id]}
            onDragStart={(e) => handleSlotDragStart(e, slot.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, slot.id)}
            onTouchStart={() =>
              slots[slot.id] &&
              setDragging({ item: slots[slot.id], fromSlot: slot.id })
            }
            onTouchEnd={(e) => handleTouchEnd(e, slot.id)}
            onClick={() => handleSlotClick(slot.id)}
          >
            {slots[slot.id] && (
              slots[slot.id].src
                ? <img src={slots[slot.id].src} alt={slots[slot.id].label} />
                : <span>{slots[slot.id].label}</span>
            )}
          </div>
        ))}
      </div>

      {/* ── 리셋 버튼 ── */}
      <button className="jibbitz__reset" onClick={handleReset}>
        리셋하기
      </button>

      {/* ── 지비츠 그리드 ── */}
      <div className="jibbitz__grid">
        {jibbitzList.map((item) => (
          <div
            key={item.id}
            className="jibbitz__item"
            draggable
            onDragStart={() => handleDragStart(item)}
            onTouchStart={() => setDragging({ item, fromSlot: null })}
            onClick={() => setPreview(item)}
          >
            {item.src
              ? <img src={item.src} alt={item.label} />
              : <span>{item.label}</span>
            }
          </div>
        ))}
        <div className="jibbitz__more" onClick={() => alert('준비 중입니다.')}>
          <span className="jibbitz__more-icon">+</span>
          <span className="jibbitz__more-label">더보기</span>
        </div>
      </div>
    </section>
  );
}