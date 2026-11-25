import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { ogFonts, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { TWO_RESIDUES_COVER } from "@/lib/home-reading";

export const alt = "Two residues apart. An editorial still life of two glass dishes, one with still water and the other with ripples.";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const [image, fonts] = await Promise.all([
    readFile(join(process.cwd(), "public", TWO_RESIDUES_COVER)),
    ogFonts(),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "#F8FAFC", color: "#182B37", fontFamily: "Space Grotesk" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 600, padding: 56, borderTop: "10px solid #605A79" }}>
          <div style={{ display: "flex", fontSize: 24, fontWeight: 600, color: "#605A79" }}>Peptide Hormone</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 600, lineHeight: 1, letterSpacing: "-3px" }}>
              Two residues apart
            </div>
            <div style={{ display: "flex", fontSize: 30, lineHeight: 1.25, color: "#4A5964" }}>
              Oxytocin, vasopressin, and the biology of water balance
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#586775" }}>peptidehormone.com</div>
        </div>
        <img
          src={`data:image/jpeg;base64,${image.toString("base64")}`}
          width={600}
          height={630}
          style={{ objectFit: "cover", objectPosition: "center" }}
          alt=""
        />
      </div>
    ),
    { ...size, fonts },
  );
}
