import {
  MapContainer,
  TileLayer,
  Marker,
  MapContainerProps,
  ZoomControl,
} from "react-leaflet";
import { Event } from "../services/EventsService";
import { useMapContext } from "./providers/MapProvider";
import { Icon } from "leaflet";

type MapProps = {
  events: Event[];
  mapProps?: MapContainerProps;
} & React.HTMLAttributes<HTMLDivElement>;

const eventIcon = new Icon({
  iconUrl: "/marker.png",
  iconSize: [185, 185],
  iconAnchor: [92.5, 92.5],
  popupAnchor: [0, 0],
});

export function Map({ events, mapProps, ...props }: MapProps) {
  const { center } = useMapContext();

  return (
    <div {...props} className={`${props.className} h-screen w-screen`} id="map">
      <MapContainer
        {...mapProps}
        key={center?.join(",")}
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="topright" />

        {Array.isArray(events) &&
          events.map(({ latitude, longitude, id }) => {
            return (
              <Marker
                icon={eventIcon}
                position={[latitude, longitude]}
                key={id}
              ></Marker>
            );
          })}
      </MapContainer>
    </div>
  );
}
