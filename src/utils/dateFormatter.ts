const long: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const short: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};
export const dateFormatter = (date: string, format: string = "short") =>
  new Date(date).toLocaleDateString("en-Us", format === "long" ? long : short);
