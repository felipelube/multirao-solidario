import React, { createContext, useContext, useState, ReactNode } from "react";
import { LOCATIONS_IN_BRAZIL } from "../../config/map";

interface UIStateProps {
  mapCenter: [number, number];
  setMapCenter: (mapCenter: [number, number]) => void;
  collapsedContent: boolean;
  setCollapsedContent: (collapsedContent: boolean) => void;
}

const UIState = createContext<UIStateProps | undefined>(undefined);

interface UIStateProviderProps {
  children: ReactNode;
}

function pickRandom(items: any[]) {
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export const UIStateProvider: React.FC<UIStateProviderProps> = ({
  children,
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>(
    pickRandom(LOCATIONS_IN_BRAZIL)
  );
  const [collapsedContent, setCollapsedContent] = useState(false);

  return (
    <UIState.Provider
      value={{ mapCenter, setMapCenter, setCollapsedContent, collapsedContent }}
    >
      {children}
    </UIState.Provider>
  );
};

export const useUIState = (): UIStateProps => {
  const context = useContext(UIState);
  if (!context) {
    throw new Error("useUIState must be used within a UIStateProvider");
  }
  return context;
};
