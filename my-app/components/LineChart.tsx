"use client";
import { useState } from "react";

export default function LineChart({
  data,
  height = 240,
  formatValue = (v: number) => v.toLocaleString(),
}: {
  data: { day: string; value: number }[];
  height?: number;
  formatValue?: (v: number) => string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const width = 700;
  const padTop = 40;
  const padBottom = 28;
  const padLeft = 8;
  const padRight = 8;
  const max = Math.max(...data.map((d) => d.value)) * 1.2;
  const min = 0;
  const innerW = width - padLeft - padRight;
  const innerH = height - padTop - padBottom;
  const lastIndex = data.length - 1;

  const points = data.map((d, i) => {
    const x = padLeft + (innerW * i) / (data.length - 1);
    const y = padTop + innerH - (innerH * (d.value - min)) / (max - min);
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath =
    linePath +
    ` L ${points[points.length - 1].x} ${padTop + innerH} L ${points[0].x} ${
      padTop + innerH
    } Z`;

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        style={{ height }}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2f5bd6" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2f5bd6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={padLeft}
            x2={width - padRight}
            y1={padTop + innerH * (1 - f)}
            y2={padTop + innerH * (1 - f)}
            stroke="#eef0f3"
            strokeWidth={1}
          />
        ))}
        <path d={areaPath} fill="url(#areaFill)" />
        <path d={linePath} fill="none" stroke="#2f5bd6" strokeWidth={2.5} />

        {hover !== null && (
          <line
            x1={points[hover].x}
            x2={points[hover].x}
            y1={padTop}
            y2={padTop + innerH}
            stroke="#2f5bd6"
            strokeDasharray="3 3"
            strokeWidth={1}
          />
        )}

        {points.map((p, i) => {
          const isLast = i === lastIndex;
          return (
            <g key={i}>
              <rect
                x={p.x - innerW / data.length / 2}
                y={0}
                width={innerW / data.length}
                height={height}
                fill="transparent"
                onMouseEnter={() => setHover(i)}
              />

              {/* value label */}
              {isLast ? (
                <g>
                  <rect
                    x={p.x - 28}
                    y={Math.max(p.y - 32, 2)}
                    width={56}
                    height={20}
                    rx={6}
                    fill="#2f5bd6"
                  />
                  <text
                    x={p.x}
                    y={Math.max(p.y - 32, 2) + 14}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={700}
                    fill="#fff"
                  >
                    {formatValue(p.value)}
                  </text>
                </g>
              ) : (
                <text
                  x={p.x}
                  y={Math.max(p.y - 12, 12)}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight={600}
                  fill="#6b7280"
                >
                  {formatValue(p.value)}
                </text>
              )}

              <circle
                cx={p.x}
                cy={p.y}
                r={hover === i ? 5 : isLast ? 4.5 : 3}
                fill={isLast ? "#2f5bd6" : "#fff"}
                stroke="#2f5bd6"
                strokeWidth={2}
              />

              <text
                x={p.x}
                y={height - 6}
                textAnchor="middle"
                fontSize="11"
                fill="#9ca3af"
              >
                {p.day}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
