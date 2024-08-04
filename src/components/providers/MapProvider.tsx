import React, { createContext, useContext, useState, ReactNode } from "react";

interface MapContextProps {
  center: [number, number];
  setCenter: (center: [number, number]) => void;
}

const MapContext = createContext<MapContextProps | undefined>(undefined);

interface MapProviderProps {
  children: ReactNode;
}

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [center, setCenter] = useState<[number, number]>([51.505, -0.09]); // Default center

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
