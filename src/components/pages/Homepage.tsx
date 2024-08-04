import { useLoaderData } from "react-router-dom";
import { EventService } from "../../services/EventsService";
import { EventListing } from "../EventListing";
import { Event } from "../../services/EventsService";
import { PageContent } from "../PageContainer";

type HomePageProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function HomePage({ ...props }: HomePageProps) {
  const events = ((useLoaderData() ?? []) as Event[]) ?? undefined;

  return (
    <PageContent>
      <h2 className="text-lg font-medium font-titles">Eventos próximos</h2>
      <EventListing events={events} />
    </PageContent>
  );
}
