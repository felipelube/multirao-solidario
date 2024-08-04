import { Outlet } from "react-router-dom";
import { Map } from "../Map";

type PageWithMapProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function PageWithMap({ ...props }: PageWithMapProps) {
  return (
    <div
      {...props}
      className={`${props.className} relative flex flex-col h-full justify-end`}
    >
      <div className="absolute inset-0">
        <Map />
      </div>

      <Outlet />
    </div>
  );
}
