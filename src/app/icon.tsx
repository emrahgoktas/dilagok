import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0A0A0A",
          color: "#F4EFE6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          letterSpacing: 1,
        }}
      >
        DG
      </div>
    ),
    size,
  );
}
