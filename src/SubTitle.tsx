import React from "react";
import { interpolate, useCurrentFrame } from "remotion";

const subtitle: React.CSSProperties = {
  fontFamily: "SF Pro Text, Helvetica, Arial, sans-serif",
  fontSize: 40,
  textAlign: "center",
  position: "absolute",
  bottom: 140,
  width: "100%",
};

const codeStyle: React.CSSProperties = {
  color: "#86A8E7",
};

export const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  return (
    <div style={{ ...subtitle, opacity }}>
      Edit <code style={codeStyle}>src/Root.tsx</code> and save to reload.
    </div>
  );
};
