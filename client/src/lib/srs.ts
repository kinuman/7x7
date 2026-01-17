export type Rating = "again" | "hard" | "good" | "easy";

export type CardState = {
  id: string;
  ease: number;
  interval: number;
  repetitions: number;
  due: number;
};

const STORAGE_KEY = "srs-state-v1";

export function loadSrsState(): Record<string, CardState> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, CardState>;
  } catch {
    return {};
  }
}

export function saveSrsState(state: Record<string, CardState>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function initCard(id: string): CardState {
  return {
    id,
    ease: 2.5,
    interval: 0,
    repetitions: 0,
    due: Date.now(),
  };
}

export function schedule(card: CardState, rating: Rating): CardState {
  const now = Date.now();
  let ease = card.ease;
  let reps = card.repetitions;
  let interval = card.interval;

  if (rating === "again") {
    reps = 0;
    interval = 0.5; // 30 minutes
    ease = Math.max(1.3, ease - 0.2);
  } else {
    if (rating === "hard") {
      ease = Math.max(1.3, ease - 0.15);
    } else if (rating === "good") {
      ease = ease;
    } else if (rating === "easy") {
      ease = ease + 0.15;
    }
    reps += 1;
    if (reps === 1) interval = rating === "easy" ? 3 : 1; // days
    else if (reps === 2) interval = rating === "easy" ? 6 : 4;
    else interval = Math.max(1, Math.round(interval * ease));
  }

  const due = now + interval * 24 * 60 * 60 * 1000;

  return { id: card.id, ease, interval, repetitions: reps, due };
}

export function getDueCards(state: Record<string, CardState>, limit = 100): string[] {
  const now = Date.now();
  return Object.values(state)
    .filter(c => c.due <= now)
    .sort((a, b) => a.due - b.due)
    .slice(0, limit)
    .map(c => c.id);
}
