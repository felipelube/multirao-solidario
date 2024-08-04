import { Outlet, useLoaderData } from "react-router-dom";
import { Map } from "../Map";
import { Event } from "../../services/EventsService";

type PageWithMapProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function PageWithMap({ ...props }: PageWithMapProps) {
  const events = ((useLoaderData() ?? []) as Event[]) ?? [];

  return (
    <div
      {...props}
      className={`${props.className} relative flex flex-col h-full justify-end`}
    >
      <div className="absolute inset-0 z-0">
        <Map events={events} />
      </div>
      <div className="z-10 w-full">
        <Outlet />
      </div>
    </div>
  );
}
