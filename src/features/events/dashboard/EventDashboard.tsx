import { useEffect, useState } from "react";
import { events } from "../../../lib/data/sampleData";
import EventForm from "../form/EventForm";
import EventCard from "./EventCard";
import type { AppEvent } from "../../../lib/types";
import { AnimatePresence, motion } from "motion/react";

type Props = {
  formOpen: boolean;
  setFormOpen: (isOpen: boolean) => void;
};

const EventDashboard = ({ formOpen, setFormOpen }: Props) => {
  const [appeEvents, setAppEvents] = useState<AppEvent[]>([]);

  useEffect(() => {
    setAppEvents(events);
    return () => {
      setAppEvents([]);
    };
  }, []);

  return (
    <div className="flex gap-6 w-full">
      <div className="w-3/5 flex flex-col gap-4">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col gap-4">
              {appeEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="w-2/5">
        <AnimatePresence>
          {formOpen && (
            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <EventForm setFormOpen={setFormOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EventDashboard;
