import { NextResponse } from "next/server";
import fallbackStatus from "../../../../public/data/capitol-trades/bot-status.json";
import fallbackCopiedTrades from "../../../../public/data/capitol-trades/copied-trades.json";
import fallbackPortfolio from "../../../../public/data/capitol-trades/portfolio-history.json";
import fallbackSkippedTrades from "../../../../public/data/capitol-trades/skipped-trades.json";

const repository = "constiloool/Capitoltradesbot";

async function loadPublishedData<T>(
  filename: string,
  revision: string,
): Promise<T> {
  const response = await fetch(
    `https://raw.githubusercontent.com/${repository}/${revision}/dashboard-data/${filename}`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error(`Dashboard data request failed for ${filename}`);
  }

  return response.json() as Promise<T>;
}

export async function GET() {
  try {
    const revisionResponse = await fetch(
      `https://api.github.com/repos/${repository}/commits/dashboard-data`,
      {
        cache: "no-store",
        headers: { Accept: "application/vnd.github+json" },
      },
    );
    if (!revisionResponse.ok) {
      throw new Error("Could not resolve dashboard data revision");
    }
    const { sha: revision } = (await revisionResponse.json()) as {
      sha: string;
    };
    const [portfolio, copiedTrades, skippedTrades, status] = await Promise.all([
      loadPublishedData<typeof fallbackPortfolio>(
        "portfolio-history.json",
        revision,
      ),
      loadPublishedData<typeof fallbackCopiedTrades>(
        "copied-trades.json",
        revision,
      ),
      loadPublishedData<typeof fallbackSkippedTrades>(
        "skipped-trades.json",
        revision,
      ),
      loadPublishedData<typeof fallbackStatus>("bot-status.json", revision),
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
