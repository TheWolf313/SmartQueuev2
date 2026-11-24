import Service from "../models/Service.js";

const defaultServices = [
  {
    name: "General Consultation",
    description: "Standard consultation for routine health concerns",
    durationMinutes: 30,
    isActive: true
  },
  {
    name: "Emergency Consultation",
    description: "Urgent same-day consultation",
    durationMinutes: 20,
    isActive: true
  },
  {
    name: "Specialist Consultation",
    description: "Consultation with a specialist doctor",
    durationMinutes: 45,
    isActive: true
  },
  {
    name: "Follow-up Consultation",
    description: "Follow-up visit after a previous appointment",
    durationMinutes: 20,
    isActive: true
  }
];

/** Ensure a new deployment has the standard consultation types without
 * overwriting existing names, durations, descriptions, or active states. */
export const ensureDefaultServices = async () => {
  await Promise.all(
    defaultServices.map((service) =>
      Service.updateOne(
        { name: service.name },
        { $setOnInsert: service },
        { upsert: true }
      )
    )
  );
};
