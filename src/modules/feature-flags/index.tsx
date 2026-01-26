import { createContext, useContext, type PropsWithChildren } from "react";

type featureFlagProps = {
  isNewProductsUIEnabled: boolean;
};

const FeatureFlagContext = createContext<featureFlagProps | null>(null);

export const FeatureFlagProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: featureFlagProps }>) => {
  return (
    <FeatureFlagContext.Provider value={value}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export function useFeatureFlag() {
  const context = useContext(FeatureFlagContext);

  if (!context) {
    throw new Error("useFeatureFlag must be used within a FeatureFlagProvider");
  }

  return context;
}
