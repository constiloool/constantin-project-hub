"use client";

import { useId, useState } from "react";

export type PortfolioPoint = {
  date: string;
  equity: number;
};

type PortfolioChartProps = {
  data: PortfolioPoint[];
};

const width = 900;
const height = 300;
const padding = { top: 20, right: 22, bottom: 42, left: 68 };

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export function PortfolioChart({ data }: PortfolioChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const gradientId = useId().replace(/:/g, "");

  if (data.length < 2) {
    return <div className="ct-empty-state">Not enough portfolio history to draw the chart.</div>;
  }

  const values = data.map((point) => point.equity);
  const rawMin = Math.min(...values);
  const rawMax = Math.max(...values);
  const range = Math.max(rawMax - rawMin, 100);
  const min = rawMin - range * 0.18;
  const max = rawMax + range * 0.18;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const x = (index: number) => padding.left + (index / (data.length - 1)) * chartWidth;
  const y = (value: number) => padding.top + ((max - value) / (max - min)) * chartHeight;
  const points = data.map((point, index) => `${x(index)},${y(point.equity)}`).join(" ");
  const areaPoints = `${padding.left},${height - padding.bottom} ${points} ${width - padding.right},${height - padding.bottom}`;
  const yTicks = Array.from({ length: 4 }, (_, index) => min + ((max - min) * index) / 3).reverse();
  const active = activeIndex === null ? null : data[activeIndex];

  return (
    <div className="ct-chart-wrap">
      <svg
        className="ct-chart"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Line chart showing paper account portfolio value over time"
        onPointerLeave={() => setActiveIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1373ff" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#88df50" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {yTicks.map((tick) => (
          <g key={tick}>
            <line className="ct-chart-grid" x1={padding.left} x2={width - padding.right} y1={y(tick)} y2={y(tick)} />
            <text className="ct-chart-axis" x={padding.left - 12} y={y(tick) + 4} textAnchor="end">
              {formatCurrency(tick)}
            </text>
          </g>
        ))}
        <polygon points={areaPoints} fill={`url(#${gradientId})`} />
        <polyline className="ct-chart-line" points={points} />
        {data.map((point, index) => (
          <g key={point.date}>
            <rect
              className="ct-chart-hit"
              x={x(index) - chartWidth / data.length / 2}
              y={padding.top}
              width={chartWidth / data.length}
              height={chartHeight}
              onPointerEnter={() => setActiveIndex(index)}
            />
            <circle
              className={`ct-chart-dot ${activeIndex === index ? "is-active" : ""}`}
              cx={x(index)}
              cy={y(point.equity)}
              r={activeIndex === index ? 6 : 3.5}
            />
            <text className="ct-chart-axis" x={x(index)} y={height - 14} textAnchor="middle">
              {formatDate(point.date)}
            </text>
          </g>
        ))}
        {active ? (
          <line
            className="ct-chart-guide"
            x1={x(activeIndex!)}
            x2={x(activeIndex!)}
            y1={padding.top}
            y2={height - padding.bottom}
          />
        ) : null}
      </svg>
      {active ? (
        <div
          className="ct-chart-tooltip"
          style={{ left: `${(x(activeIndex!) / width) * 100}%`, top: `${(y(active.equity) / height) * 100}%` }}
        >
          <span>{formatDate(active.date)}</span>
          <strong>{formatCurrency(active.equity)}</strong>
        </div>
      ) : null}
    </div>
  );
}
