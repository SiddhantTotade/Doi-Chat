import React from "react";
import { Text } from "react-native";

export default function Title({ text, color, fontFamily }) {
  return (
    <Text
      style={{
        color: color,
        textAlign: "center",
        fontSize: 40,
        fontFamily: fontFamily,
      }}
    >
      {text}
    </Text>
  );
}
