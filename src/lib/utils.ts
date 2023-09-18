export function renderPlayerPosition(position: string) {
  if (!position) {
    return "";
  } else if (position.includes("WR")) {
    return "WR";
  } else {
    return position;
  }
}

export function toReadableTime(seconds: number) {
  return new Date(seconds);
}
