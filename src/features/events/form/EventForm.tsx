import { useNavigate, useParams } from "react-router";
import { users } from "../../../lib/data/sampleData";
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import type { AppEvent } from "../../../lib/types";
import { createEvent, selectEvent, updateEvent } from "../eventSlice";
import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import TextInput from "../../../app/shared/components/TextInput";
import {
  eventFormSchema,
  type EventFormSchema,
} from "../../../lib/schemas/eventFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextArea from "../../../app/shared/components/TextArea";
import SelectInput from "../../../app/shared/components/SelectInput";
import { categoryOptions } from "./categoryOptions";
import PlaceInput from "../../../app/shared/components/PlaceInput";

const EventForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const selectedEvent = useAppSelector((state) => state.event.selectedEvent);
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<EventFormSchema>({
    mode: "onTouched",
    resolver: zodResolver(eventFormSchema),
  });

  useEffect(() => {
    if (id) {
      dispatch(selectEvent(id));
      if (selectedEvent) {
        reset({
          ...selectedEvent,
          date: new Date(selectedEvent.date).toISOString().slice(0, 16),
          venue: {
            venue: selectedEvent.venue,
            latitude: selectedEvent.latitude,
            longitude: selectedEvent.longitude,
          },
        });
      }
    } else {
      dispatch(selectEvent(null));
    }
  }, [dispatch, id, reset, selectedEvent]);

  const onSubmit = (data: FieldValues) => {
    if (selectedEvent) {
      dispatch(
        updateEvent({
          ...selectedEvent,
          ...data,
          venue: data.venue.venue,
          latitude: data.venue.latitude,
          longitude: data.venue.longitude,
        })
      );
      navigate(`/events/${selectedEvent.id}`);
      return;
    } else {
      const id = crypto.randomUUID();
      const newEvent = {
        ...data,
        id,
        venue: data.venue.venue,
        latitude: data.venue.latitude,
        longitude: data.venue.longitude,
        hostUid: users[0].uid,
        attendees: [
          {
            id: users[0].uid,
            displayName: users[0].displayName,
            photoURL: users[0].photoURL,
            isHost: true,
          },
        ],
      };
      dispatch(createEvent(newEvent as AppEvent));
      navigate(`/events/${id}`);
    }
  };

  return (
    <div className="card bg-base-100 p-4 flex flex-col gap-3 w-full">
      <h3 className="text-2xl font-semibold text-center text-primary">
        {selectedEvent ? "Edit Event" : "Create Event"}
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-full"
      >
        <TextInput control={control} name="title" label="Title" />
        <TextArea
          control={control}
          rows={3}
          name="description"
          label="Description"
        />
        <div className="flex gap-3 items-center w-full">
          <SelectInput
            control={control}
            name="category"
            label="Category"
            options={categoryOptions}
          />

          <TextInput
            control={control}
            name="date"
            type="datetime-local"
            label="Date"
            min={new Date()}
          />
        </div>
        <PlaceInput control={control} name="venue" label="Venue" />

        <div className="flex justify-end w-full gap-3">
          <button onClick={() => navigate(-1)} className="btn btn-neutral">
            Cancel
          </button>
          <button disabled={!isValid} type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
