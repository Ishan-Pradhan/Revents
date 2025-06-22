import type { Attendee } from "../../../lib/types";

type Props = {
  attendees: Attendee[];
};

const EventAttendees = ({ attendees }: Props) => {
  return (
    <div className="avatar-group -space-x-5">
      {attendees.map((attendee) => (
        <div className="avatar" key={attendee.id}>
          <div className="w-12">
            <img src={attendee.photoURL || "/user.png"} alt="attendee avatar" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventAttendees;
