// How caffeine leaves the body. The page uses only this file to model decay,
// so changing the formula here changes the whole plot.
//
// Basic model: exponential elimination with a fixed half-life, and the
// caffeine of a drink is counted as fully absorbed the moment it is drunk.
// About 5 hours is a typical half-life for a healthy adult (roughly 3 to 7).

export const HALF_LIFE_HOURS = 5;

// Milligrams still in the body `hoursSinceIntake` hours after drinking `doseMg`.
export function caffeineRemaining(doseMg, hoursSinceIntake) {
  return doseMg * 0.5 ** (hoursSinceIntake / HALF_LIFE_HOURS);
}
