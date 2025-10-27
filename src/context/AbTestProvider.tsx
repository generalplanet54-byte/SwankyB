import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import abTesting, { ExperimentDefinition, assignVariant, registerExperiment, trackExposure } from '../lib/abTesting';

type AbTestContextShape = {
  getVariant: (experimentId: string) => string | null;
  assignAndTrack: (def: ExperimentDefinition) => string;
};

const AbTestContext = createContext<AbTestContextShape | null>(null);

export const AbTestProvider = ({ children }: { children: ReactNode }) => {
  const [registry] = useState(() => new Map<string, ExperimentDefinition>());

  useEffect(() => {
    // optional: hydrate any experiments registered elsewhere on load
    // currently no-op; experiments should be registered via abTesting.registerExperiment
  }, []);

  const getVariant = (experimentId: string) => {
    return abTesting.getVariant(experimentId);
  };

  const assignAndTrack = (def: ExperimentDefinition) => {
    // register locally and globally
    registerExperiment(def);
    registry.set(def.id, def);
    const variant = assignVariant(def);
    // send exposure event once per assignment
    trackExposure(def.id, variant);
    return variant;
  };

  const value = useMemo(() => ({ getVariant, assignAndTrack }), [registry]);

  return <AbTestContext.Provider value={value}>{children}</AbTestContext.Provider>;
};

export function useAbTestContext() {
  const ctx = useContext(AbTestContext);
  if (!ctx) throw new Error('useAbTestContext must be used within AbTestProvider');
  return ctx;
}

export default AbTestProvider;
