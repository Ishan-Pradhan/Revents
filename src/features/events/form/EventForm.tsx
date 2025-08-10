import { useNavigate, useParams } from "react-router";
import { users } from "../../../lib/data/sampleData";
import { useAppDispatch, useAppSelector } from "../../../lib/stores/store";
import type { AppEvent } from "../../../lib/types";
import { createEvent, selectEvent, updateEvent } from "../eventSlice";
import { useEffect } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import UncontrolledInput from "../../../app/shared/components/UncontrolledInput";

const EventForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const selectedEvent = useAppSelector((state) => state.event.selectedEvent);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      title: "",
      category: "",
      description: "",
      date: "",
      city: "",
      venue: "",
    },
  });

  useEffect(() => {
    if (id) {
      dispatch(selectEvent(id));
      if (selectedEvent) {
        reset({
          ...selectedEvent,
          date: new Date(selectedEvent.date).toISOString().slice(0, 16),
        });
      }
    } else {
      dispatch(selectEvent(null));
    }
  }, [dispatch, id, reset, selectedEvent]);

  const onSubmit = (data: FieldValues) => {
    if (selectedEvent) {
      dispatch(updateEvent({ ...selectedEvent, ...data }));
      navigate(`/events/${selectedEvent.id}`);
      return;
    } else {
      const id = crypto.randomUUID();
      const newEvent = {
        ...data,
        id: crypto.randomUUID(),
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
        className="flex flex-col gap-3 w-full"
      >
        <UncontrolledInput
          register={register}
          name="title"
          errors={errors}
          options={{ required: "Title is required" }}
          label="Title"
        />
        <input
          {...register("category")}
          type="text"
          className="input input-lg w-full "
          placeholder="Category"
        />
        <textarea
          {...register("description")}
          className="textarea textarea-lg w-full "
          placeholder="Description"
        />
        <input
          {...register("date")}
          type="datetime-local"
          className="input input-lg w-full "
          placeholder="Date"
        />
        <input
          {...register("city")}
          type="text"
          className="input input-lg w-full "
          placeholder="City"
        />
        <input
          {...register("venue")}
          type="text"
          className="input input-lg w-full "
          placeholder="Venue"
        />
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
