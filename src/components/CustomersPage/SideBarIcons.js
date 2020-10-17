import React from "react";
import { AiFillHome, AiFillDatabase } from "react-icons/ai";

export default function SideBarIcons({ iconType, size, color }) {
  switch (iconType) {
    case "home":
      return <AiFillHome size={size} color={color} />;
    case "customersList":
      return <AiFillDatabase size={size} color={color} />;
    default:
      return <AiFillHome size={size} color={color} />;
  }
}
