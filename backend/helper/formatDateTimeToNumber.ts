export async function formatDateTimeToNumber(dateTimeString: string) {
  const dateTime = new Date(dateTimeString);
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = dateTime.getDate().toString().padStart(2, "0");
  const hours = dateTime.getHours().toString().padStart(2, "0");
  const minutes = dateTime.getMinutes().toString().padStart(2, "0");
  const seconds = dateTime.getSeconds().toString().padStart(2, "0");

  // Combine date and time into a single numeric format (e.g., YYYYMMDDHHMMSS)
  const numericFormat = `${year}${month}${day}${hours}${minutes}${seconds}`;
  return numericFormat;
}
