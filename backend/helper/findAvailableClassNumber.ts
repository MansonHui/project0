export default function findAvailableClassNumber(
  existingNumbers: (number | null)[]
) {
  const maxCapacity = 40;

  const allNumbers = Array.from({ length: maxCapacity }, (_, i) => i + 1);

  const availableNumbers = allNumbers.filter(
    (number) => !existingNumbers.includes(number)
  );

  return availableNumbers.length > 0 ? availableNumbers[0] : null;
}
