"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
}) {
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
      className="before-after"
      onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); update(event.clientX); }}
      onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) update(event.clientX); }}
    >
      <div className="ba-after"><Image src={after} alt={afterAlt} fill sizes="(max-width: 800px) 100vw, 50vw" /><span>After</span></div>
      <div className="ba-before" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}><Image src={before} alt={beforeAlt} fill sizes="(max-width: 800px) 100vw, 50vw" /><span>Before</span></div>
      <div className="ba-handle" style={{ left: `${position}%` }}><span>↔</span></div>
      <input aria-label="Adjust before and after comparison" type="range" min="0" max="100" value={position} onChange={(event) => setPosition(Number(event.target.value))} />
    </div>
  );
}
