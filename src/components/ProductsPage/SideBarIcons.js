import React from "react";
import {
  AiFillHome,
  AiFillInfoCircle,
  AiFillEye,
  AiFillDatabase,
} from "react-icons/ai";

export default function SideBarIcons({ iconType, size, color }) {
  switch (iconType) {
    case "home":
      return <AiFillHome size={size} color={color} />;
    case "about":
      return <AiFillInfoCircle size={size} color={color} />;
    case "preview products":
      return <AiFillEye size={size} color={color} />;
    case "products list":
      return <AiFillDatabase size={size} color={color} />;
    default:
      return <AiFillHome size={size} color={color} />;
  }
}
