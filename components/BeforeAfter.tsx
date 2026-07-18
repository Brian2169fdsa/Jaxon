"use client";

import { useRef, useState } from "react";

export function BeforeAfter({ variant = 0 }: { variant?: number }) {
  const [position, setPosition] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  function update(clientX: number) {
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    setPosition(Math.max(4, Math.min(96, ((clientX - box.left) / box.width) * 100)));
  }

  return (
    <div
      ref={ref}
      className={`before-after before-after-${variant}`}
      onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); update(event.clientX); }}
      onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) update(event.clientX); }}
    >
      <div className="ba-after"><span>After</span></div>
      <div className="ba-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><span>Before</span></div>
      <div className="ba-handle" style={{ left: `${position}%` }}><span>↔</span></div>
      <input aria-label="Adjust before and after comparison" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} />
    </div>
  );
}
