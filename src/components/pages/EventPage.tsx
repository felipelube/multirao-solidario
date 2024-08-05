import { useLoaderData } from "react-router-dom";
import { Event } from "../../services/EventsService";
import { PageContent } from "../PageContainer";
import { useMapContext } from "../providers/MapProvider";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import {
  Registration,
  RegistrationService,
} from "../../services/RegistrationService";
import { useAuth } from "../providers/AuthProvider";
import { Helmet } from "react-helmet";

type HomePageProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function EventPage({ ...props }: HomePageProps) {
  const { setCenter } = useMapContext();
  const { userInfo } = useAuth();
  const [isMutating, setIsMutating] = useState(false);

  const { event, registrations } = useLoaderData() as {
    event: Event;
    registrations: Registration[];
  };

  const eventDate = new Date(event.date);
  const existingRegistration = registrations.find(
    (registration: Registration) =>
      registration.userId === userInfo!.id && registration.eventId === event.id
  );

  useEffect(() => {
    if (event?.latitude && event?.longitude) {
      setCenter([event.latitude, event.longitude]);
    }
  }, [event, setCenter]);

  const registerOnEvent = async () => {
    setIsMutating(true);
    try {
      await RegistrationService.createRegistration({
        userId: userInfo!.id!,
        eventId: event.id,
      });
    } finally {
      setIsMutating(false);
    }
  };

  const cancelParticipation = async () => {
    if (!existingRegistration) {
      return;
    }

    setIsMutating(true);
    try {
      // FIXME: cors error
      //await RegistrationService.deleteRegistration(existingRegistration.id);
    } finally {
      setIsMutating(false);
    }
  };

  return (
    <PageContent>
      <Helmet>
        <title>Mutirão solidário - {event.title}</title>
      </Helmet>
      <h1 className="text-lg font-medium font-titles">{event.title}</h1>
      {!isNaN(+eventDate) && (
        <p className="text-xs text-gray-500">
          {eventDate.toLocaleDateString()}
        </p>
      )}
      <p>{event.description}</p>
      {existingRegistration ? (
        <Button
          disabled={isMutating}
          className="mt-4"
          onClick={cancelParticipation}
        >
          Cancelar participação
        </Button>
      ) : (
        <Button
          disabled={isMutating}
          className="mt-4"
          onClick={registerOnEvent}
        >
          Participar
        </Button>
      )}
    </PageContent>
  );
}
