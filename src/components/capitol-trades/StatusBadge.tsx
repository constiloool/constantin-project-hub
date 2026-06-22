type StatusBadgeProps = {
  children: React.ReactNode;
  tone?: "positive" | "neutral" | "warning";
};

export function StatusBadge({ children, tone = "neutral" }: StatusBadgeProps) {
  return <span className={`ct-status-badge ct-status-${tone}`}>{children}</span>;
}
