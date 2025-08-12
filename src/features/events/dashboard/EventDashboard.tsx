import EventCard from "./EventCard";

import Counter from "../../counter/Counter";
import type { AppEvent } from "../../../lib/types";
import { useCollection } from "../../../lib/hooks/useCollection";

const EventDashboard = () => {
  const { data: appEvents, loading } = useCollection<AppEvent>({
    path: "events",
  });
  return (
    <div className="flex gap-6 w-full">
      <div className="w-3/5 flex flex-col gap-4 ">
        <div className="flex flex-col gap-4">
          {appEvents?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      <div className="w-2/5 overflow-hidden">
        <Counter />
      </div>
    </div>
  );
};

export default EventDashboard;
