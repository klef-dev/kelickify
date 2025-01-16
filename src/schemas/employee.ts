import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { employees } from "@/db/schema";

export const selectEmployeeSchema = createSelectSchema(employees);

export const createEmployeeSchema = createInsertSchema(employees, {
  name: z.string().min(2).max(100),
  nric: z.string().regex(/^[STFG]\d{7}[A-Z]$/, "Invalid NRIC format"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  residencyStatus: z.enum(["CITIZEN", "PR_FIRST_YEAR", "PR_SECOND_YEAR"]),
  basicSalary: z.string().regex(/^\d+(\.\d{1,2})?$/, "Salary must be a valid number with up to 2 decimal places"),
  allowances: z
    .string()
    .regex(/^\d+(\.\d{1,2})?$/, "Allowance must be a valid number with up to 2 decimal places")
    .optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  status: z.enum(["Active", "Inactive"]).default("Active"),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
