import { z } from "zod";

const requiredString = (fieldName: string) =>
  z
    .string({
      error: (err) =>
        err.input === undefined || err.input === null
          ? `${fieldName} is required`
          : undefined,
    })
    .min(1, {
      error: `${fieldName} must be at least 1 character`,
    });

const venueSchema = z.object({
  venue: requiredString("Venue"),
  latitude: z.number({
    error: "Latitude is required",
  }),
  longitude: z.number({
    error: "Longitude is required",
  }),
});

export const eventFormSchema = z.object({
  title: requiredString("Title"),
  category: requiredString("Category"),
  description: requiredString("Description").min(5, {
    error: "Description must be at least 5 characters",
  }),
  date: requiredString("Date"),
  city: z.string().optional(),
  venue: venueSchema,
});

export type EventFormSchema = z.infer<typeof eventFormSchema>;
