import React from "react";
import { Event } from "../services/EventsService";
import { Link } from "react-router-dom";
import { ROUTES } from "../config/routes";
import { EventItem } from "./EventItem";

type EventListingProps = {
  events?: Event[];
} & React.HTMLAttributes<HTMLDivElement | HTMLUListElement>;

export function EventListing({ events, ...props }: EventListingProps) {
  return Array.isArray(events) && events.length ? (
    <ul {...props} className="flex flex-col gap-4">
      {events.map((event) => (
        <li key={event.id}>
          <Link
            to={ROUTES.event.replace(":id", event.id.toString())}
            key={event.id}
          >
            <EventItem key={event.id} event={event} />
          </Link>
        </li>
      ))}
    </ul>
  ) : (
    <div {...props} className={`${props.className}`}>
      <p>Nenhum evento encontrado</p>
    </div>
  );
}
