import { StatusBadge } from "@/components/capitol-trades/StatusBadge";

export type CopiedTrade = {
  id?: string;
  date: string;
  politician: string;
  ticker: string;
  assetName?: string;
  owner?: string;
  action: string;
  signalAge: string;
  allocation: string;
  status: string;
  reason?: string;
};

export type SkippedTrade = {
  id?: string;
  date: string;
  politician: string;
  ticker: string;
  assetName?: string;
  owner?: string;
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
            <th>Asset / Owner</th>
            <th>Action</th>
            {copied ? <th>Signal Age</th> : <th>Reason</th>}
            {copied ? <th>Allocation</th> : null}
            <th>Bot Status</th>
          </tr>
        </thead>
        <tbody>
          {props.rows.length === 0 ? (
            <tr>
              <td className="ct-table-empty" colSpan={copied ? 8 : 7}>
                {copied
                  ? "No accepted or bot-executed paper trades yet."
                  : "No skipped decisions are available yet."}
              </td>
            </tr>
          ) : props.rows.map((row) => {
            const normalizedAction = row.action.trim().toUpperCase();
            const isPurchase = ["BUY", "PURCHASE", "PURCHASED"].includes(
              normalizedAction,
            );

            return (
              <tr key={row.id ?? `${row.date}-${row.ticker}-${row.politician}-${row.status}-${row.owner ?? ""}-${row.assetName ?? ""}`}>
                <td>{row.date}</td>
                <td>{row.politician}</td>
                <td><strong>{row.ticker}</strong></td>
                <td>
                  <span>{row.assetName ?? "—"}</span>
                  {row.owner ? <small className="ct-table-subtext">{row.owner}</small> : null}
                </td>
                <td>
                  <StatusBadge tone={isPurchase ? "positive" : "warning"}>
                    {row.action}
                  </StatusBadge>
                </td>
                <td>
                  {copied ? (
                    <>
                      {(row as CopiedTrade).signalAge}
                      {(row as CopiedTrade).reason ? (
                        <small className="ct-table-subtext">{(row as CopiedTrade).reason}</small>
                      ) : null}
                    </>
                  ) : (
                    (row as SkippedTrade).reason
                  )}
                </td>
                {copied ? <td>{(row as CopiedTrade).allocation}</td> : null}
                <td>
                  <StatusBadge tone={copied && row.status === "Copied" ? "positive" : copied ? "warning" : "neutral"}>
                    {row.status}
                  </StatusBadge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
