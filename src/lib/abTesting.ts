// Lightweight A/B testing core utilities
// Purpose: deterministic variant assignment, exposure/conversion tracking, gtag integration

export type ExperimentDefinition = {
  id: string;
  variants: string[];
  weights?: number[]; // optional weights per variant
  defaultVariant?: string;
};

const EXPERIMENT_STORAGE_PREFIX = 'abtest.';

const experiments = new Map<string, ExperimentDefinition>();

function getOverrideFromQuery(experimentId: string): string | null {
  try {
    const params = new URLSearchParams(globalThis.location?.search ?? '');
    const key = `abtest_${experimentId}`;
    const v = params.get(key);
    return v;
  } catch {
    return null;
  }
}

function storageKey(experimentId: string) {
  return `${EXPERIMENT_STORAGE_PREFIX}${experimentId}`;
}

export function registerExperiment(def: ExperimentDefinition) {
  experiments.set(def.id, def);
}

function getStoredVariant(experimentId: string): string | null {
  try {
    const raw = localStorage.getItem(storageKey(experimentId));
    return raw;
  } catch {
    return null;
  }
}

function setStoredVariant(experimentId: string, variant: string) {
  try {
    localStorage.setItem(storageKey(experimentId), variant);
  } catch {
    // noop
  }
}

function weightedRandomIndex(weights?: number[]) {
  if (!weights || weights.length === 0) return 0;
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < weights.length; i++) {
    r -= weights[i];
    if (r <= 0) return i;
  }
  return weights.length - 1;
}

export function assignVariant(def: ExperimentDefinition): string {
  // 1. Query override
  const q = getOverrideFromQuery(def.id);
  if (q && def.variants.includes(q)) return q;

  // 2. Stored value
  const stored = getStoredVariant(def.id);
  if (stored && def.variants.includes(stored)) return stored;

  // 3. Weighted random
  const idx = weightedRandomIndex(def.weights);
  const chosen = def.variants[idx] ?? def.defaultVariant ?? def.variants[0];
  setStoredVariant(def.id, chosen);
  return chosen;
}

export function getVariant(experimentId: string): string | null {
  const def = experiments.get(experimentId);
  if (!def) return null;
  const q = getOverrideFromQuery(experimentId);
  if (q && def.variants.includes(q)) return q;
  const stored = getStoredVariant(experimentId);
  if (stored && def.variants.includes(stored)) return stored;
  return def.defaultVariant ?? null;
}

// Tracking helpers (exposure & conversion) - integrates with gtag if available
export function trackExposure(experimentId: string, variant: string) {
  const eventName = 'ab_test_exposure';
  try {
    if (typeof (globalThis as any).gtag === 'function') {
      (globalThis as any).gtag('event', eventName, {
        experiment_id: experimentId,
        variant,
      });
    }
  } catch (_e) {
    // silent
  }
}

export function trackConversion(experimentId: string, variant: string, label?: string, value?: number) {
  const eventName = 'ab_test_conversion';
  try {
    if (typeof (globalThis as any).gtag === 'function') {
      (globalThis as any).gtag('event', eventName, {
        experiment_id: experimentId,
        variant,
        label: label ?? undefined,
        value: value ?? undefined,
      });
    }
  } catch (_e) {
    // silent
  }
}

export function resetExperiment(experimentId: string) {
  try {
    localStorage.removeItem(storageKey(experimentId));
  } catch {
    // noop
  }
}

export default {
  registerExperiment,
  assignVariant,
  getVariant,
  trackExposure,
  trackConversion,
  resetExperiment,
};
