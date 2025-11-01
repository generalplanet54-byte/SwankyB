import { useEffect, useState, useContext } from 'react';
import abTesting, { ExperimentDefinition } from '../lib/abTesting';
import { createContext } from 'react';

// Re-import the context directly to avoid the throwing hook
const AbTestContext = createContext<{ 
  getVariant: (experimentId: string) => string | null;
  assignAndTrack: (def: ExperimentDefinition) => string;
} | null>(null);

/**
 * Hook to get the variant for an experiment and optionally auto-register and track exposure.
 * @param def Experiment definition (id, variants, weights, defaultVariant)
 * @param options.trackExposure default true - track exposure on first assignment
 */
export function useAbTest(def: ExperimentDefinition, options?: { trackExposure?: boolean }) {
  const { trackExposure = true } = options ?? {};
  
  // Use context directly without throwing, allowing graceful fallback
  const ctx = useContext(AbTestContext);

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
