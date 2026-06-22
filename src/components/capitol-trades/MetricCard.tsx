type MetricCardProps = {
  label: string;
  value: string;
  detail: string;
  tone?: "positive" | "neutral";
};

export function MetricCard({ label, value, detail, tone = "neutral" }: MetricCardProps) {
  return (
    <article className="ct-metric-card">
      <span>{label}</span>
      <strong>{value}</strong>
      <small className={tone === "positive" ? "ct-positive-text" : ""}>{detail}</small>
    </article>
  );
}
