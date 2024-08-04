import { useLoaderData } from "react-router-dom";
import { EventListing } from "../EventListing";
import { Event } from "../../services/EventsService";
import { PageContent } from "../PageContainer";
import { useEffect } from "react";
import { useMapContext } from "../providers/MapProvider";

type HomePageProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function HomePage({ ...props }: HomePageProps) {
  const events = ((useLoaderData() ?? []) as Event[]) ?? undefined;
  const [firstEvent] = events ?? [];
  const { setCenter } = useMapContext();

  useEffect(() => {
    if (firstEvent.latitude && firstEvent.longitude) {
      setCenter([firstEvent.latitude, firstEvent.longitude]);
    }
  }, [firstEvent, setCenter]);

  return (
    <PageContent>
      <h1 className="text-lg font-medium font-titles">Eventos próximos</h1>
      <EventListing events={events} />
    </PageContent>
  );
}
