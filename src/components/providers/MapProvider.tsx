import React, { createContext, useContext, useState, ReactNode } from "react";

interface MapContextProps {
  center: [number, number] | undefined;
  setCenter: (center: [number, number] | undefined) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [center, setCenter] = useState<[number, number] | undefined>(undefined);

  return (
    <MapContext.Provider value={{ center, setCenter }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = (): MapContextProps => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};
