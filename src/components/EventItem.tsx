import { Event } from "../services/EventsService";

type EventItemProps = {
  event: Event;
} & React.HTMLAttributes<HTMLDivElement>;

export function EventItem({ event, ...props }: EventItemProps) {
  return (
    <div
      className={`flex gap-2 p-3 border shadow-lg rounded-xl ${
        props.className ?? ""
      }`}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-lg ">{event.title}</h3>
        <p className="text-ellipsis text-xs line-clamp-2">
          {event.description}
        </p>
      </div>
      <div className="flex ml-auto flex-col text-center my-auto">
        <p className="text-lg">
          <span className="text-lg font-medium">
            {Number.isFinite(event.distance) ? event.distance?.toFixed(0) : "?"}
          </span>
          <span className="text-xs">&nbsp;km</span>
        </p>
        <p className="text-xs">
          <span className="font-medium">
            {event.currentVolunteers}/
            {event.currentVolunteers >= event.minVolunteers
              ? event.maxVolunteers
              : event.minVolunteers}
          </span>
          <br />
          <span className="text-xxs">volun.</span>
        </p>
      </div>
    </div>
  );
}
