export const BASE_PS5_DAILY = 700;
export const EXTRA_CONTROLLER_DAILY = 200;

export function rentalDays(input: string | number) {
  const n = Number(input);
  if (![1, 2, 5, 30].includes(n)) throw new Error("Choose a supported rental duration.");
  return n;
}

export function estimateRental(days: number, extraControllers: number) {
  if (extraControllers < 0 || extraControllers > 4) throw new Error("Invalid controller quantity.");
  return days * (BASE_PS5_DAILY + extraControllers * EXTRA_CONTROLLER_DAILY);
}
