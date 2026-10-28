// Formulas for how caffeine moves through the body. The page models caffeine
// only through this file, so changing a formula here changes the whole plot.
//
// Basic model: after a drink, caffeine enters the body at a steady rate until
// all of it is absorbed. Each bit of caffeine starts to decay, with a fixed
// half-life, as soon as it is absorbed.

// Blood levels typically peak 30 to 60 minutes after drinking.
export const ABSORPTION_HOURS = 0.75;

// Mean serum half-life measured in healthy subjects by Statland BE, Demas TJ. Serum caffeine
// half-lives. Healthy subjects vs. patients having alcoholic hepatic disease. Am J Clin Pathol.
// 1980 Mar;73(3):390-3. doi: 10.1093/ajcp/73.3.390. PMID: 7361718.
// Only 3 healthy subjects were measured, and half-lives vary widely between people.
export const HALF_LIFE_HOURS = 5.7;

// Gradual increase: total milligrams absorbed `hoursSinceIntake` hours after
// drinking `doseMg`, not counting decay.
export function caffeineAbsorbed(doseMg, hoursSinceIntake) {
  return doseMg * Math.min(hoursSinceIntake / ABSORPTION_HOURS, 1);
}

// Decay: milligrams left of `amountMg` `hoursSinceAbsorbed` hours after it was absorbed.
export function caffeineRemaining(amountMg, hoursSinceAbsorbed) {
  return amountMg * 0.5 ** (hoursSinceAbsorbed / HALF_LIFE_HOURS);
}

// Milligrams in the body `hoursSinceIntake` hours after drinking `doseMg`, with
// absorption and decay running together: the time since intake is cut into
// one-minute slices, and what is absorbed in each slice decays from then on.
const SLICES_PER_HOUR = 60;

export function caffeineInBody(doseMg, hoursSinceIntake) {
  const slices = Math.ceil(hoursSinceIntake * SLICES_PER_HOUR);
  let total = 0;
  for (let i = 0; i < slices; i++) {
    const start = i / SLICES_PER_HOUR;
    const end = Math.min((i + 1) / SLICES_PER_HOUR, hoursSinceIntake);
    const absorbed = caffeineAbsorbed(doseMg, end) - caffeineAbsorbed(doseMg, start);
    total += caffeineRemaining(absorbed, hoursSinceIntake - (start + end) / 2);
  }
  return total;
}
