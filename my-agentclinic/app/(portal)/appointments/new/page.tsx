import { agents, therapies } from "@/lib/data";
import BookingForm from "@/components/portal/BookingForm";

export default function NewAppointmentPage() {
  return (
    <div className="max-w-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">
          Book a Session
        </h1>
        <p className="text-neutral-600">
          Choose an agent, a therapy, and a date. Getting help is the hardest
          step — the booking form is the easy part.
        </p>
      </div>
      <BookingForm agents={agents} therapies={therapies} />
    </div>
  );
}
