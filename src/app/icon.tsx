import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

// Simple monogram matching siteConfig.shortName ("Ora"), swap for a real
// mark during the content-fill / brand pass if one gets designed.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#fafafa",
          fontSize: 20,
          fontWeight: 700,
          borderRadius: 6,
        }}
      >
        O
      </div>
    ),
    { ...size }
  );
}
