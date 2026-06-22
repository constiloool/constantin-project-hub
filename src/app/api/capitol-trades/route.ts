import { NextResponse } from "next/server";
import fallbackStatus from "../../../../public/data/capitol-trades/bot-status.json";
import fallbackCopiedTrades from "../../../../public/data/capitol-trades/copied-trades.json";
import fallbackPortfolio from "../../../../public/data/capitol-trades/portfolio-history.json";
import fallbackSkippedTrades from "../../../../public/data/capitol-trades/skipped-trades.json";

const dataRoot =
  "https://raw.githubusercontent.com/constiloool/Capitoltradesbot/dashboard-data/dashboard-data";

async function loadPublishedData<T>(filename: string): Promise<T> {
  const response = await fetch(`${dataRoot}/${filename}`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(`Dashboard data request failed for ${filename}`);
  }

  return response.json() as Promise<T>;
}

export async function GET() {
  try {
    const [portfolio, copiedTrades, skippedTrades, status] = await Promise.all([
      loadPublishedData<typeof fallbackPortfolio>("portfolio-history.json"),
      loadPublishedData<typeof fallbackCopiedTrades>("copied-trades.json"),
      loadPublishedData<typeof fallbackSkippedTrades>("skipped-trades.json"),
      loadPublishedData<typeof fallbackStatus>("bot-status.json"),
    ]);

    return NextResponse.json({
      portfolio,
      copiedTrades,
      skippedTrades,
      status,
      source: "live",
    });
  } catch {
    return NextResponse.json({
      portfolio: fallbackPortfolio,
      copiedTrades: fallbackCopiedTrades,
      skippedTrades: fallbackSkippedTrades,
      status: fallbackStatus,
      source: "fallback",
    });
  }
}
