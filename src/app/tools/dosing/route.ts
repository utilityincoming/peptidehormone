import { NextResponse, type NextRequest } from "next/server";
import { PEPTIDES } from "@/lib/cycle-planner";

// There is no standalone dosing page: the documented ranges live in the cycle
// planner. Older DocumentedRange blocks linked /tools/dosing?q=<name>, and those
// URLs were crawled, so permanently redirect them to the planner seeded with the
// named molecule (or the planner's default view when the name is unknown).
export function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";
  const match = Object.values(PEPTIDES).find(
    (p) => p.name.toLowerCase() === q || p.id === q,
  );
  const target = new URL("/tools/cycle-planner", req.nextUrl.origin);
  if (match) target.searchParams.set("p", match.id);
  return NextResponse.redirect(target, 308);
}
