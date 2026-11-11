import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#0A0A0A",
          color: "#F4EFE6",
          padding: 80,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 18 }}>DILAGOK</div>
        <div style={{ fontSize: 48, marginTop: 24, fontFamily: "Georgia" }}>
          Knotted in Turkey.
        </div>
        <div style={{ fontSize: 22, marginTop: 16, color: "#C4A574" }}>
          Handmade cord couture
        </div>
      </div>
    ),
    size,
  );
}
