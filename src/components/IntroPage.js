import React, { useEffect, useState } from 'react';
import './IntroPage.scss';
import crocsLogo from '../image/crocslogo.png';


const BG_HOLES = [
  { top: 50,  left: 93  },
  { top: 50,  left: 375 }, 
  { top: 161, left: -28   }, 
  { top: 270, left: 375 },
  { top: 375, left: -28   },
  { top: 488, left: 375 },
  { top: 599, left: -28   },
  { top: 599, left: 258 },
];

const TEXT_HOLES = [
  { top: 161, left: 258, text: "Everyone Should", dir: "left",  delay: 0.1  },
  {  top: 270, left: 93 ,  text: "Be Comfortable",  dir: "right", delay: 0.5  },
  { top: 375, left: 258, text: "in Their Own",    dir: "left",  delay: 0.9  },
  { top: 488, left: 93, text: "Shoes.", dir: "right", delay: 0.0, customClass: "align-left" },
];

export default function IntroPage() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState([]);

  useEffect(() => {
    TEXT_HOLES.forEach((_, i) => {
      setTimeout(() => {
        setRevealedIndices((prev) => [...prev, i]);
      }, i * 600 + 50);
    });

    const fadeTimer = setTimeout(() => setIsFadingOut(true), 3000);
    return () => clearTimeout(fadeTimer);
  }, []);

  return (
    <div className={`crocs-intro ${isFadingOut ? 'crocs-intro--fade-out' : ''}`}>
      <div className="crocs-intro__container">

        <div className="crocs-intro__logo">
          <img src={crocsLogo} alt="crocs logo" className="logo-image" />
        </div>
        
        {/* 배경 구멍들 */}
        {BG_HOLES.map((hole, i) => (
          <div key={i} className="crocs-intro__hole-bg"
            style={{ top: hole.top, left: hole.left }} />
        ))}

        {/* 텍스트 구멍들 */}
        {TEXT_HOLES.map((hole, i) => (
      <div key={i}
        className={`crocs-intro__hole hole--${hole.dir} ${revealedIndices.includes(i) ? 'active' : ''} ${hole.customClass || ''}`}
        style={{ top: hole.top, left: hole.left }}
      >
        <span className="intro-text">
          {hole.text}
        </span>
      </div>
    ))}

      </div>
    </div>
  );
}