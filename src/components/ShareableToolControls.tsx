"use client";

import { useState } from "react";

/** Copy the current URL, copy a text snapshot, or rasterize an SVG chart. */
export function ShareableToolControls({
  dataText,
  chartId,
}: {
  dataText: string;
  chartId?: string;
}) {
  const [note, setNote] = useState<string | null>(null);

  async function copyLink() {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setNote("Link copied.");
  }

  async function copyData() {
    await navigator.clipboard.writeText(dataText);
    setNote("Data copied.");
  }

  async function exportPng() {
    const svg = chartId ? document.getElementById(chartId) : null;
    if (!(svg instanceof SVGSVGElement)) {
      setNote("Chart is not ready.");
      return;
    }
    const xml = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = Math.round(1200 * (image.height / image.width || 0.4));
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((png) => {
        if (!png) return;
        const a = document.createElement("a");
        a.href = URL.createObjectURL(png);
        a.download = "peptide-half-life.png";
        a.click();
      });
      URL.revokeObjectURL(url);
    };
    image.src = url;
    setNote("PNG download started.");
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={copyLink} className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70 hover:border-accent/50 hover:text-accent">
        Copy shareable link
      </button>
      <button type="button" onClick={copyData} className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70 hover:border-accent/50 hover:text-accent">
        Copy data
      </button>
      {chartId && (
        <button type="button" onClick={exportPng} className="rounded-full border border-ink/15 px-3 py-1.5 text-xs text-ink/70 hover:border-accent/50 hover:text-accent">
          Export chart as PNG
        </button>
      )}
      {note && <span className="text-xs text-ink/45">{note}</span>}
    </div>
  );
}
