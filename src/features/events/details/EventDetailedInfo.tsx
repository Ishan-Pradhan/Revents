import {
  CalendarIcon,
  InformationCircleIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { useAppSelector } from "../../../lib/stores/store";
import { useState } from "react";
import MapComponent from "../../../app/shared/components/MapComponent";

const EventDetailedInfo = () => {
  const event = useAppSelector((state) => state.event.selectedEvent);
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <div className="card bg-base-100">
      <div className="flex flex-col align-middle">
        <div className="flex items-center gap-x-3 border-b border-neutral-300 py-3 pl-3">
          <InformationCircleIcon className="size-8" />
          <span>{event?.description}</span>
        </div>
        <div className="flex items-center gap-x-3 border-b border-neutral-300 py-3 pl-3">
          <CalendarIcon className="size-8" />
          <span>{event?.date}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-3 border-b border-neutral-300 py-3 pl-3">
            <MapPinIcon className="size-8" />
            <span>{event?.venue}</span>
          </div>
          <button
            className="btn btn-info btn-outline mr-2"
            onClick={() => setMapOpen(!mapOpen)}
          >
            {mapOpen ? "Hide Map" : "Show Map"}
          </button>
        </div>
      </div>
      {mapOpen && event && (
        <div className="h-64">
          <MapComponent
            position={[event.latitude, event.longitude]}
            venue={event?.venue}
          />
        </div>
      )}
    </div>
  );
};

export default EventDetailedInfo;
