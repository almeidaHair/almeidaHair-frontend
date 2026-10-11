import React from 'react';

export function FloralSprig({ className = '' }: {className?: string;}) {
  return (
    <svg viewBox="0 0 80 72" aria-hidden="true" className={className}>
      <path d="M30 6 Q44 26 62 48" stroke="#C4A062" strokeWidth="1" fill="none" />
      <ellipse cx="33" cy="15" rx="4.5" ry="10" transform="rotate(-18 33 15)" fill="#8C2D4F" />
      <ellipse cx="47" cy="20" rx="4.5" ry="10" transform="rotate(28 47 20)" fill="#E59AB4" />
      <ellipse cx="42" cy="8" rx="3" ry="7" transform="rotate(35 42 8)" fill="#F2B8CB" />
      <ellipse cx="60" cy="34" rx="4.5" ry="10" transform="rotate(52 60 34)" fill="#8C2D4F" />
      <g transform="translate(20 50)">
        {[0, 72, 144, 216, 288].map((angle) =>
        <ellipse key={angle} cx="0" cy="-8" rx="5" ry="8" fill="#F5C6D6" transform={`rotate(${angle})`} />
        )}
        <circle r="3.4" fill="#C4A062" />
      </g>
    </svg>);

}