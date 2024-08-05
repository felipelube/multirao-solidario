import React from "react";
import { Event } from "../services/EventsService";
import { Link } from "react-router-dom";
import { ROUTES } from "../config/routes";
import { EventItem } from "./EventItem";
import { useAuth } from "./providers/AuthProvider";
import { Button } from "./Button";

type EventListingProps = {
  events?: Event[];
} & React.HTMLAttributes<HTMLDivElement | HTMLUListElement>;

export function EventListing({ events, ...props }: EventListingProps) {
  const { isSignedIn } = useAuth();

  return (
    <>
      {Array.isArray(events) && events.length ? (
        <ul {...props} className="flex flex-col gap-4">
          {(isSignedIn ? events : events.slice(0, 3)).map((event) => (
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
      )}
      {!isSignedIn && (
        <div className="relative flex flex-col items-center gap-2 pt-16 -mt-12 text-center bg-gradient-to-b from-white to-transparent -top-12">
          <h3 className="text-lg">
            Mutirão Solidário é um app para organizar esforços de voluntários
          </h3>
          <Button
            onClick={() => {
              window.location.href = ROUTES.signUp;
            }}
            className="inline-block mx-auto"
          >
            Crie sua conta
          </Button>
          <p className="font-medium">Já tem uma conta?</p>
          <Button
            onClick={() => {
              window.location.href = ROUTES.signIn;
            }}
            className="inline-block mx-auto"
          >
            Entre
          </Button>
        </div>
      )}
    </>
  );
}
