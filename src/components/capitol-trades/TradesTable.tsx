import { StatusBadge } from "@/components/capitol-trades/StatusBadge";

export type CopiedTrade = {
  date: string;
  politician: string;
  ticker: string;
  action: string;
  signalAge: string;
  allocation: string;
  status: string;
};

export type SkippedTrade = {
  date: string;
  politician: string;
  ticker: string;
  action: string;
  reason: string;
  status: string;
};

type TradesTableProps =
  | { kind: "copied"; rows: CopiedTrade[] }
  | { kind: "skipped"; rows: SkippedTrade[] };

export function TradesTable(props: TradesTableProps) {
  const copied = props.kind === "copied";

  return (
    <div className="ct-table-scroll">
      <table className="ct-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Politician</th>
            <th>Ticker</th>
            <th>Action</th>
            {copied ? <th>Signal Age</th> : <th>Reason</th>}
            {copied ? <th>Allocation</th> : null}
            <th>Bot Status</th>
          </tr>
        </thead>
        <tbody>
          {props.rows.length === 0 ? (
            <tr>
              <td className="ct-table-empty" colSpan={copied ? 7 : 6}>
                {copied
                  ? "No bot-executed paper trades yet."
                  : "No skipped decisions are available yet."}
              </td>
            </tr>
          ) : props.rows.map((row) => (
            <tr key={`${row.date}-${row.ticker}-${row.politician}`}>
              <td>{row.date}</td>
              <td>{row.politician}</td>
              <td><strong>{row.ticker}</strong></td>
              <td><StatusBadge tone={row.action === "BUY" ? "positive" : "warning"}>{row.action}</StatusBadge></td>
              <td>{copied ? (row as CopiedTrade).signalAge : (row as SkippedTrade).reason}</td>
              {copied ? <td>{(row as CopiedTrade).allocation}</td> : null}
              <td><StatusBadge tone={copied ? "positive" : "neutral"}>{row.status}</StatusBadge></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
