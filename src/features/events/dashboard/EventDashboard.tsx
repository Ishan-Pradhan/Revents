import { useEffect, useState } from "react";
import { events } from "../../../lib/data/sampleData";
import EventForm from "../form/EventForm";
import EventCard from "./EventCard";
import type { AppEvent } from "../../../lib/types";
import { AnimatePresence, motion } from "motion/react";
import Counter from "../../counter/Counter";

type Props = {
  formOpen: boolean;
  setFormOpen: (isOpen: boolean) => void;
  formToggle: (event: AppEvent | null) => void;
  selectedEvent: AppEvent | null;
};

const EventDashboard = ({
  formOpen,
  setFormOpen,
  formToggle,
  selectedEvent,
}: Props) => {
  const [appeEvents, setAppEvents] = useState<AppEvent[]>([]);

  const handleCreateEvent = (event: AppEvent) => {
    setAppEvents((prevState) => [...prevState, event]);
  };

  const handleUpdateEvent = (updatedEvent: AppEvent) => {
    setAppEvents((prevState) => {
      return prevState.map((e) =>
        e.id === updatedEvent.id ? updatedEvent : e
      );
    });
  };

  const handleDeleteEvent = (eventId: string) => {
    setAppEvents((prevState) => prevState.filter((e) => e.id !== eventId));
  };

  useEffect(() => {
    setAppEvents(events);
    return () => {
      setAppEvents([]);
    };
  }, []);

  return (
    <div className="flex gap-6 w-full">
      <div className="w-3/5 flex flex-col gap-4 ">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-4">
              {appeEvents.map((event) => (
                <EventCard
                  deleteEvent={handleDeleteEvent}
                  key={event.id}
                  event={event}
                  formToggle={formToggle}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-2/5 overflow-hidden">
        <AnimatePresence mode="wait">
          {formOpen ? (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <EventForm
                updateEvent={handleUpdateEvent}
                key={selectedEvent?.id || "new"}
                setFormOpen={setFormOpen}
                createEvent={handleCreateEvent}
                selectedEvent={selectedEvent}
              />
            </motion.div>
          ) : (
            <motion.div
              key="counter"
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Counter />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventDashboard;
