import { useEffect, useState } from 'react';
import abTesting, { ExperimentDefinition } from '../lib/abTesting';
import { useAbTestContext } from '../context/AbTestProvider';

/**
 * Hook to get the variant for an experiment and optionally auto-register and track exposure.
 * @param def Experiment definition (id, variants, weights, defaultVariant)
 * @param options.trackExposure default true - track exposure on first assignment
 */
export function useAbTest(def: ExperimentDefinition, options?: { trackExposure?: boolean }) {
  const { trackExposure = true } = options ?? {};
  
  // Try to use context, but handle gracefully if not available
  let ctx = null;
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    ctx = useAbTestContext();
  } catch {
    // Context not available, will use fallback
    ctx = null;
  }

  const [variant, setVariant] = useState<string | null>(() => abTesting.getVariant(def.id));

  useEffect(() => {
    if (!variant) {
      // If provider/context is available, use assignAndTrack, else fallback to abTesting.assignVariant
      const v = ctx ? ctx.assignAndTrack(def) : abTesting.assignVariant(def);
      setVariant(v);
      if (trackExposure) {
        // exposure is tracked by assignAndTrack; when falling back, call trackExposure
        if (!ctx) {
          abTesting.trackExposure(def.id, v);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { variant };
}

export default useAbTest;
