export const truncate = (text: string, limit: number, dots: boolean = true) => {
  if (typeof text !== "string") return "";
  if (text.length <= limit) return text;
  return text.slice(0, limit).trim() + (dots ? "..." : "");
};
