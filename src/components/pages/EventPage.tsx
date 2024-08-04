import { useLoaderData } from "react-router-dom";
import { Event } from "../../services/EventsService";
import { PageContent } from "../PageContainer";

type HomePageProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function EventPage({ ...props }: HomePageProps) {
  const event = (useLoaderData() as Event) ?? {};

  const eventDate = new Date(event.date);

  return (
    <PageContent>
      <h1 className="text-lg font-medium font-titles">{event.title}</h1>
      {!isNaN(+eventDate) && (
        <p className="text-xs text-gray-500">
          {eventDate.toLocaleDateString()}
        </p>
      )}
      <p>{event.description}</p>
    </PageContent>
  );
}
