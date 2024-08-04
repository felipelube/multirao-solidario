import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

type MapProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function Map({ ...props }: MapProps) {
  return (
    <div {...props} className={`${props.className} h-full w-full`} id="map">
      <MapContainer
        center={[-22.794574, -43.109953]}
        zoom={10.5}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[-22.70722, -43.001393]}></Marker>
      </MapContainer>
    </div>
  );
}
