"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { MetricCard } from "@/components/capitol-trades/MetricCard";
import { PortfolioChart, type PortfolioPoint } from "@/components/capitol-trades/PortfolioChart";
import { StatusBadge } from "@/components/capitol-trades/StatusBadge";
import {
  TradesTable,
  type CopiedTrade,
  type SkippedTrade,
} from "@/components/capitol-trades/TradesTable";

type BotStatus = {
  botStatus: string;
  lastScan: string;
  dataSource: string;
  broker: string;
  safeMode: boolean;
  cron: string;
  lastError: string;
};

type DashboardData = {
  portfolio: PortfolioPoint[];
  copiedTrades: CopiedTrade[];
  skippedTrades: SkippedTrade[];
  status: BotStatus;
};

const dataRoot = "/data/capitol-trades";

async function loadJson<T>(path: string): Promise<T> {
  const response = await fetch(`${dataRoot}/${path}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Could not load ${path}`);
  }

  return response.json() as Promise<T>;
}

export function CapitolTradesDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [portfolio, copiedTrades, skippedTrades, status] = await Promise.all([
        loadJson<PortfolioPoint[]>("portfolio-history.json"),
        loadJson<CopiedTrade[]>("copied-trades.json"),
        loadJson<SkippedTrade[]>("skipped-trades.json"),
        loadJson<BotStatus>("bot-status.json"),
      ]);
      setData({ portfolio, copiedTrades, skippedTrades, status });
    } catch {
      setError("Dashboard data could not be loaded. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const metrics = useMemo(() => {
    if (!data?.portfolio.length) {
      return null;
    }

    const first = data.portfolio[0].equity;
    const latest = data.portfolio[data.portfolio.length - 1].equity;
    const returnPct = ((latest - first) / first) * 100;

    return {
      latest: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
      }).format(latest),
      returnPct: `${returnPct >= 0 ? "+" : ""}${returnPct.toFixed(1)}%`,
    };
  }, [data]);

  return (
    <main className="page-stack ct-dashboard">
      <section className="ct-hero">
        <div className="ct-hero-copy">
          <div className="ct-badge-row">
            <StatusBadge tone="positive">● {data?.status.botStatus ?? "Loading"}</StatusBadge>
            <StatusBadge>Paper Trading</StatusBadge>
            <StatusBadge tone="warning">
              Safe Mode {data ? (data.status.safeMode ? "Enabled" : "Disabled") : "Loading"}
            </StatusBadge>
          </div>
          <span className="eyebrow">* READ-ONLY PROJECT DASHBOARD</span>
          <h1>Capitol Trades Bot</h1>
          <p className="ct-hero-subtitle">
            Automated paper-trading dashboard based on official political trade disclosures.
          </p>
          <p className="ct-hero-description">
            The bot checks newly reported trades, filters them through fixed risk rules and
            mirrors only valid signals in an Alpaca paper-trading portfolio.
          </p>
          <div className="hero-actions">
            <Link className="button button-ghost group" href="/projects">
              Back to Projects <span aria-hidden="true" className="button-arrow">←</span>
            </Link>
            <button className="button button-dark group" type="button" onClick={() => void loadDashboard()} disabled={loading}>
              {loading ? "Refreshing…" : "Refresh Data"} <span aria-hidden="true" className="button-arrow">↻</span>
            </button>
          </div>
        </div>
        <div className="ct-hero-visual" aria-hidden="true">
          <div className="ct-terminal-top"><span>Rule Engine</span><b>Paper only</b></div>
          <div className="ct-terminal-line"><i className="is-positive" /> <span>NVDA</span><small>Signal accepted</small><b>COPIED</b></div>
          <div className="ct-terminal-line"><i /> <span>TSLA</span><small>Disclosure too old</small><b>SKIPPED</b></div>
          <div className="ct-terminal-line"><i className="is-positive" /> <span>MSFT</span><small>Risk checks passed</small><b>COPIED</b></div>
          <div className="ct-terminal-footer">
            <span>Last scan</span>
            <strong>{data?.status.lastScan.split(" ").at(-1) ?? "--:--"}</strong>
          </div>
        </div>
      </section>

      {error ? (
        <section className="ct-message-card" role="alert">
          <strong>Data unavailable</strong>
          <p>{error}</p>
          <button className="button button-dark" type="button" onClick={() => void loadDashboard()}>Try again</button>
        </section>
      ) : null}

      {loading && !data ? (
        <section className="ct-loading-grid" aria-label="Loading dashboard data">
          {Array.from({ length: 4 }, (_, index) => <div className="ct-skeleton" key={index} />)}
        </section>
      ) : data && metrics ? (
        <>
          <section className="ct-metrics" aria-label="Portfolio metrics">
            <MetricCard label="Portfolio Value" value={metrics.latest} detail="+2.2% this week" tone="positive" />
            <MetricCard label="Total Return" value={metrics.returnPct} detail="Since simulation start" tone="positive" />
            <MetricCard label="Open Positions" value="6" detail="Within allocation limits" />
            <MetricCard label="Copied Trades" value={String(data.copiedTrades.length)} detail="Shown in current dataset" />
          </section>

          <section className="ct-panel ct-chart-panel">
            <div className="ct-panel-heading">
              <div>
                <span className="eyebrow">Portfolio Equity</span>
                <h2>Paper account value over time</h2>
              </div>
              <StatusBadge tone="positive">+{metrics.returnPct.replace("+", "")}</StatusBadge>
            </div>
            <PortfolioChart data={data.portfolio} />
          </section>

          <section className="ct-panel">
            <div className="ct-panel-heading">
              <div>
                <span className="eyebrow">Decision log</span>
                <h2>Recent Copied Trades</h2>
              </div>
              <span className="section-count">{data.copiedTrades.length} entries</span>
            </div>
            <TradesTable kind="copied" rows={data.copiedTrades} />
          </section>

          <section className="ct-panel">
            <div className="ct-panel-heading">
              <div>
                <span className="eyebrow">Risk filters</span>
                <h2>Skipped Trades / Rule Decisions</h2>
              </div>
              <span className="section-count">{data.skippedTrades.length} entries</span>
            </div>
            <TradesTable kind="skipped" rows={data.skippedTrades} />
          </section>

          <section className="ct-status-layout">
            <article className="ct-panel ct-status-panel">
              <div className="ct-panel-heading">
                <div>
                  <span className="eyebrow">System overview</span>
                  <h2>Bot Status</h2>
                </div>
                <StatusBadge tone="positive">{data.status.botStatus}</StatusBadge>
              </div>
              <dl className="ct-status-list">
                <div><dt>Last Scan</dt><dd>{data.status.lastScan}</dd></div>
                <div><dt>Data Source</dt><dd>{data.status.dataSource}</dd></div>
                <div><dt>Broker</dt><dd>{data.status.broker}</dd></div>
                <div><dt>Safe Mode</dt><dd>{data.status.safeMode ? "Enabled" : "Disabled"}</dd></div>
                <div><dt>Cron</dt><dd>{data.status.cron}</dd></div>
                <div><dt>Last Error</dt><dd>{data.status.lastError}</dd></div>
              </dl>
            </article>
            <article className="ct-readonly-card">
              <span className="eyebrow">Security boundary</span>
              <h2>Read-only by design.</h2>
              <p>
                This dashboard displays exported project data only. It contains no broker
                credentials, account identifiers or trading controls.
              </p>
              <div className="ct-lock-mark" aria-hidden="true">⌁</div>
            </article>
          </section>
        </>
      ) : null}

      <section className="ct-explainer">
        <div className="ct-section-intro">
          <span className="eyebrow">Process</span>
          <h2>How it works</h2>
          <p>Every signal passes through the same visible, rule-based workflow.</p>
        </div>
        <div className="ct-steps">
          {[
            ["01", "Check filings", "The bot checks official political disclosure filings."],
            ["02", "Extract trades", "Newly reported transactions are normalised into trade signals."],
            ["03", "Apply rules", "Freshness, tradability, duplicates and risk limits are evaluated."],
            ["04", "Mirror safely", "Valid signals are copied into an Alpaca paper-trading portfolio."],
          ].map(([number, title, text]) => (
            <article className="ct-step-card" key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ct-rules-section">
        <div className="ct-section-intro">
          <span className="eyebrow">Guardrails</span>
          <h2>Trading Rules</h2>
          <p>Conservative constraints keep the experiment transparent and repeatable.</p>
        </div>
        <div className="ct-rules-grid">
          {[
            "Only copy trades with a transaction date within the last 7 days.",
            "Use paper trading only; the website cannot execute orders.",
            "Skip duplicate trades and positions that already exist.",
            "Respect maximum position size and portfolio allocation limits.",
            "Store copied trade IDs locally to prevent duplicate purchases.",
            "Never expose API keys, broker credentials or private logs.",
          ].map((rule) => (
            <article className="ct-rule-card" key={rule}>
              <span aria-hidden="true">✓</span>
              <p>{rule}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
