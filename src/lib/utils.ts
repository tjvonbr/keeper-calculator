export function renderPlayerPosition(position: string) {
  if (!position) {
    return "";
  } else if (position.includes("WR")) {
    return "WR";
  } else {
    return position;
  }
}
