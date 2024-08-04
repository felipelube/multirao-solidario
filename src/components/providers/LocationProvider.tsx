import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { useMapContext } from "./MapProvider";

interface LocationContextType {
  latitude: number | null;
  longitude: number | null;
  updateLocation: (lat: number, long: number) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined
);

interface LocationProviderProps {
  children: ReactNode;
}

const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const { setCenter } = useMapContext();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          // TODO: display modal to select city
        }
      );
    }
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      setCenter([latitude, longitude]);
    }
  }, [latitude, longitude, setCenter]);

  const updateLocation = (lat: number, long: number) => {
    setLatitude(lat);
    setLongitude(long);
  };

  return (
    <LocationContext.Provider value={{ latitude, longitude, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
};

export { LocationProvider, useLocation };
