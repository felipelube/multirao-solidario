import {
  MapContainer,
  TileLayer,
  Marker,
  MapContainerProps,
} from "react-leaflet";
import { Event } from "../services/EventsService";
import { useMapContext } from "./providers/MapProvider";
import { LONDON } from "../config/map";

type MapProps = {
  events: Event[];
  mapProps?: MapContainerProps;
} & React.HTMLAttributes<HTMLDivElement>;

export function Map({ events, mapProps, ...props }: MapProps) {
  const { center } = useMapContext();

  return (
    <div {...props} className={`${props.className} h-screen w-screen`} id="map">
      <MapContainer
        {...mapProps}
        key={center?.join(",")}
        center={center ?? LONDON}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.isArray(events) &&
          events.map(({ latitude, longitude, id }) => {
            return <Marker position={[latitude, longitude]} key={id}></Marker>;
          })}
      </MapContainer>
    </div>
  );
}
