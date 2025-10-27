# Task 8 — A/B Testing Framework

Summary
-------
This document describes the lightweight A/B testing framework added to the codebase. It includes the core utilities, a React provider, a consumer hook, and recommended QA steps.

Files added
-----------
- `src/lib/abTesting.ts` — Core experiment registration, deterministic assignment (localStorage), weighted allocation, exposure/conversion tracking (gtag), reset helper.
- `src/context/AbTestProvider.tsx` — React context provider that registers experiments and exposes assignAndTrack/getVariant helpers.
- `src/hooks/useAbTest.ts` — Hook that registers/assigns and returns the variant for use in components.

Key features
------------
- Deterministic assignment using localStorage so a user sees the same variant across sessions
- Support for URL query overrides: `?abtest_{experimentId}={variant}` for QA
- Optional weighted allocations per variant
- Exposure and conversion events sent to `gtag` if available (`ab_test_exposure`, `ab_test_conversion`)
- API-friendly design to support server-side registration if needed later

How to register and use an experiment
------------------------------------
1. Define an experiment somewhere early in app startup (e.g., in the page or a bootstrap file):

```ts
import abTesting from './src/lib/abTesting';

abTesting.registerExperiment({
  id: 'cta_variant_test',
  variants: ['control', 'variantA'],
  weights: [50, 50],
  defaultVariant: 'control',
});
```

2. In a component, use the hook:

```tsx
import { useAbTest } from '../src/hooks/useAbTest';

const def = { id: 'cta_variant_test', variants: ['control','variantA'], weights: [50,50] };
const { variant } = useAbTest(def);

return variant === 'variantA' ? <VariantA /> : <Control />;
```

3. For manual QA, append `?abtest_cta_variant_test=variantA` to the URL to force the user into a variant.

Tracking
--------
- Exposure events: `ab_test_exposure` with params `{ experiment_id, variant }`.
- Conversion events: `ab_test_conversion` with params `{ experiment_id, variant, label?, value? }`.

These events will be emitted via `gtag` if `window.gtag` is available. If you use another analytics layer, create a small adapter that listens for these events or extend `abTesting.trackExposure`.

QA checklist
------------
- [ ] Register experiment and confirm `localStorage` contains `abtest.{experimentId}` after first load
- [ ] Confirm exposure event is sent to analytics (network tab or analytics debug view)
- [ ] Confirm `?abtest_{id}={variant}` forces variant and does not persist unless intended
- [ ] Confirm conversions call `abTesting.trackConversion` where appropriate (e.g., on purchase or CTA click)
- [ ] Run Lighthouse/a11y checks for variant UI to ensure no regressions

Next steps & improvements
-------------------------
- Add a server-side variant assignment endpoint for deterministic per-user results when required
- Add a dashboard or lightweight reporting output (CSV export) from D1 to track raw exposures/conversions
- Integrate with the existing experimentation tools or an MVT system if experiments become large scale

Status
------
Initial implementation added to the repo and marked in the todo list as in-progress. Build verification will be performed after the files are created.
